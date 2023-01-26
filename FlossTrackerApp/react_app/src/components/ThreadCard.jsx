import { React, useState, useEffect } from 'react';
import $ from 'jquery';

import { getCsrfCookie } from '../utils/csrf-cookie'
import { makeValidSkeinsOwned, skeinNumToErrMsg } from '../utils/validators'

import './thread-card.css';

function ThreadCard(props) {
  const swatchHex = props.threadColor.hex_value;
  const swatchStyle = {
    backgroundColor: '#' + swatchHex
  };

  const [modalFormSkeins, setModalFormSkeins] = useState(props.threadColor.skeins_owned);
  const [deleted, setDeleted] = useState(false);
  const [skeinsValid, setSkeinsValid] = useState(true);
  const [skeinErrText, setSkeinErrText] = useState('');

  const displayName = props.threadColor.brand.name + ' ' + props.threadColor.brand_number + ': ' + props.threadColor.name;
  const modalID = props.threadColor.brand.name + '-' + props.threadColor.brand_number;

  // reset the text field in the modal when it closes with an event listener
  useEffect(() => {
    const id = 'detail-thread-view-' + modalID;

    const modal = document.getElementById(id);
    modal.addEventListener('hidden.bs.modal', event => {
      setModalFormSkeins(props.threadColor.skeins_owned);
      setSkeinsValid(true);
    });

  }, []);

  
  $(`#floating-input-${modalID}`).removeAttr('aria-describedby');

  let skeinsNumClasses = 'form-control';
  let feedback = null;

  if (!skeinsValid) {
    skeinsNumClasses += ' is-invalid';
    feedback = <div id='invalid-skeins' className='invalid-feedback'>{skeinErrText}</div>
    $(`#floating-input-${modalID}`).attr('aria-describedby', 'invalid-skeins');
  }

  return (
    <>
    <a href='#' data-bs-toggle='modal' data-bs-target={'#detail-thread-view-' + modalID} className='list-group-item list-group-item-action d-flex justify-content-between'>
      <h5 className='threadcard-header threadcard-header-responsive my-auto'>{displayName}</h5>
      <span className='position-relative swatch my-auto me-3' style={swatchStyle}>&nbsp;
        <span className='position-absolute top-0 start-100 translate-middle text-bg-light badge'>{props.threadColor.skeins_owned}</span>
      </span>
    </a>

    <div className='modal fade' id={'detail-thread-view-' + modalID} tabIndex='-1' aria-labelledby='detail-thread-view' aria-hidden='true'>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>

          <div className='modal-header'>
            <h1 className='modal-title fs-5'>{displayName}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className='modal-body'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12 col-lg-6'>
                  <div className='modal-swatch' style={swatchStyle}>&nbsp;</div>

                    <form onSubmit={(event) => {

                      if (!deleted) {

                      // validate skein number
                      const num = event.target.skeins.value;
                      const err = skeinNumToErrMsg(num);
                      setSkeinErrText(err);

                      if (err !== '') {
                        setSkeinsValid(false);
                        event.preventDefault();
                        return false;

                      } else setSkeinsValid(true);

                      const validatedSkeins = makeValidSkeinsOwned(event.target.skeins.value);

                      const csrfToken = getCsrfCookie();

                      $.ajax({
                        url: '/api/user-threads/' + props.threadColor.userthread_id,
                        type: 'PATCH',
                        headers: {
                          'Content-type': 'application/json',
                          'X-CSRFToken': csrfToken
                        },
                        data: JSON.stringify({
                          skeins_owned: validatedSkeins,
                          action: 'replace'
                        })
                      })
                      .fail((jqxhr, textStatus, requestError) => {
                        console.log(textStatus + ', ' + requestError);
                      });
                    }
                      
                    }}>
                      <div className='flex-row d-flex'>
                        <div className='col-10 d-flex'>
                          <div className='input-group my-2'>
                            <div className='form-floating'>
                              <input type='text' name='skeins' id={'floating-input-' + modalID} className={skeinsNumClasses} placeholder='1.00' value={modalFormSkeins} onChange={(event) => {
                                setModalFormSkeins(event.target.value);
                              }}>
                              </input>
                            
                              <label for={'floating-input-' + modalID}>Skeins Owned</label>
                            </div>
                            <button type='submit' className='btn btn-outline-secondary'>Update</button>
                          </div>
                        </div>

                        <div className='col-2 d-flex justify-content-end'>
                          <button className='d-flex justify-content-center align-items-center my-2 btn btn-outline-danger' aria-label={'Delete ' + modalID} onClick={() => {
                          
                            setDeleted(true);

                            const csrfToken = getCsrfCookie();

                            $.ajax({
                              url: '/api/user-threads/' + props.threadColor.userthread_id,
                              type: 'DELETE',
                              headers: {
                                'Content-type': 'application/json',
                                'X-CSRFToken': csrfToken
                              }
                            })
                            .fail((jqxhr, textStatus, requestError) => {
                              console.log(textStatus + ', ' + requestError);
                            });
                          }}>
                            <i class="trash bi-trash3"></i>
                          </button>
                        </div>
                    
                      </div>                  
                      {feedback}

                  </form>

                </div>
                <div className='col-12 col-lg-6'>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default ThreadCard;
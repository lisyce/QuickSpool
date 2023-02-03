import { React, useState, useEffect, useId, useRef } from 'react';
import $ from 'jquery';

import { getCsrfCookie } from '../utils/csrf-cookie'
import { makeValidSkeinsOwned, skeinNumToErrMsg } from '../utils/validators'

import './thread-card.css';

function ThreadCard({ threadColor, useModal=true }) {
  const swatchHex = threadColor.hex_value;
  const swatchStyle = {
    backgroundColor: '#' + swatchHex
  };

  const displayName = threadColor.brand.name + ' ' + threadColor.brand_number + ': ' + threadColor.name;

  // allows us to choose to wrap it with an anchor tag or not
  let content = <>
    <h5 className='threadcard-header threadcard-header-responsive my-auto'>{displayName}</h5>
    <span className='position-relative swatch my-auto me-3' style={swatchStyle}>&nbsp;
      <span className='position-absolute top-0 start-100 translate-middle text-bg-light badge'>{threadColor.skeins_owned}</span>
    </span>
  </>

  let modal;

  const [deleted, setDeleted] = useState(false);
  const [skeinsValid, setSkeinsValid] = useState(true);
  const [skeinErrText, setSkeinErrText] = useState('');
  const [modalFormSkeins, setModalFormSkeins] = useState(threadColor.skeins_owned);

  const id = useId();
  const floatingInputRef = useRef(null);
  const modalRef = useRef(null);

  // reset the text field in the modal when it closes with an event listener
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.addEventListener('hidden.bs.modal', event => {
        setModalFormSkeins(threadColor.skeins_owned);
        setSkeinsValid(true);
      });
    }
  }, []);


  let skeinsNumClasses = 'form-control';
  let feedback;

  if (useModal) {

    // validation-based styling
    if (floatingInputRef.current) { // will be null first render
      floatingInputRef.current.removeAttribute('aria-describedby');      
    
      if (!skeinsValid) {
        skeinsNumClasses += ' is-invalid';
        feedback = <div id={`invalid-skeins${id}`} className='invalid-feedback'>{skeinErrText}</div>
        floatingInputRef.current.setAttribute('aria-describedby', `invalid-skeins${id}`);
      }
    }

    modal = <>
    <div className='modal fade' id={`detail-thread-view${id}`} ref={modalRef} tabIndex='-1' aria-labelledby={`modal-title${id}`} aria-hidden='true'>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>

          <div className='modal-header'>
            <h1 id={`modal-title${id}`} className='modal-title fs-5'>{displayName}</h1>
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
                        url: '/api/user-threads/' + threadColor.userthread_id,
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
                              <input type='text' name='skeins' id={'floating-input' + id} ref={floatingInputRef} className={skeinsNumClasses} placeholder='1.00' value={modalFormSkeins} onChange={(event) => {
                                setModalFormSkeins(event.target.value);
                              }}>
                              </input>
                            
                              <label for={'floating-input' + id}>Skeins Owned</label>
                            </div>
                            <button type='submit' className='btn btn-outline-secondary'>Update</button>
                          </div>
                        </div>

                        <div className='col-2 d-flex justify-content-end'>
                          <button className='d-flex justify-content-center align-items-center my-2 btn btn-outline-danger' aria-label={'Delete ' + id} onClick={() => {
                          
                            setDeleted(true);

                            const csrfToken = getCsrfCookie();

                            $.ajax({
                              url: '/api/user-threads/' + threadColor.userthread_id,
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

    content = <>
      <a href='#' data-bs-toggle='modal' data-bs-target={'#detail-thread-view' + CSS.escape(id)} className='list-group-item list-group-item-action d-flex justify-content-between'>
        {content}
      </a>
    </>
    
  } else {
    content = <>
      <div className='list-group-item d-flex justify-content-between'>
        {content}
      </div>
    </>
  }

  return (
    <>
    {content}
    {modal}
    </>
  );
}

export default ThreadCard;
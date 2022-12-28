import { React, useState, useEffect } from 'react';
import $ from 'jquery';

import { getCsrfCookie } from '../utils/csrf-cookie'
import { makeValidSkeinsOwned } from '../utils/validators'

import './thread-card.css';

function ThreadCard(props) {
  const swatchHex = props.thread_data.hex_value;
  const swatchStyle = {
    backgroundColor: '#' + swatchHex
  };

  const [modalFormSkeins, setModalFormSkeins] = useState(props.skeins_owned);
  const [deleted, setDeleted] = useState(false);

  const displayName = props.thread_data.brand.name + ' ' + props.thread_data.brand_number + ': ' + props.thread_data.name;
  const modalID = props.thread_data.brand.name + '-' + props.thread_data.brand_number;

  // reset the text field in the modal when it closes with an event listener
  useEffect(() => {
    const id = 'floating-input-' + modalID;

    const modal = document.getElementById(id);
    modal.addEventListener('hidden.bs.modal', event => {
      setModalFormSkeins(props.skeins_owned);
    });

  }, []);

  return (
    <>
    <a href='#' data-bs-toggle='modal' data-bs-target={'#detail-thread-view-' + modalID} className='list-group-item list-group-item-action d-flex justify-content-between'>
      <h5 className='my-auto'>{displayName}</h5>
      <span className='position-relative btn swatch my-auto me-3' style={swatchStyle}>&nbsp;
        <span className='position-absolute top-0 start-100 translate-middle text-bg-light badge'>{props.skeins_owned}</span>
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

                    <form onSubmit={() => {

                      if (!deleted) {
                        const validatedSkeins = makeValidSkeinsOwned($('#floating-input-' + modalID).val());

                        const csrfToken = getCsrfCookie();
  
                        $.ajax({
                          url: '/api/user-threads/' + props.pk,
                          type: 'PATCH',
                          headers: {
                            'Content-type': 'application/json',
                            'X-CSRFToken': csrfToken
                          },
                          data: JSON.stringify({
                            skeins_owned: validatedSkeins,
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
                              <input type='text' id={'floating-input-' + modalID} className='form-control' placeholder='1.00' value={modalFormSkeins} pattern='(^\d{0,3}\.{0,1}$)|(^\d{0,3}\.\d*$)' onChange={(event) => {
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
                              url: '/api/user-threads/' + props.pk,
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
                            <i class="trash bi bi-trash3"></i>
                          </button>
                        </div>
                      </div>                  

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
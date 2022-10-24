import {React, useState} from 'react';
import $ from 'jquery';

import './thread-card.css';

// props will be a thread color model json data 
function ThreadCard(props) {
  const swatchHex = props.thread_data.hex_value;
  const swatchStyle = {
    backgroundColor: '#' + swatchHex
  };

  const [modalFormSkeins, setModalFormSkeins] = useState(props.skeins_owned);

  const displayName = props.thread_data.brand + ' ' + props.thread_data.brand_number + ': ' + props.thread_data.name;
  const modalID = props.thread_data.brand + '-' + props.thread_data.brand_number;

  function getCsrfCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i];
      c = c.trim();
      if (c.substring(0, 10) == 'csrftoken=') {
        return c.substring(10);
      }
    }
    return null;
  }

  function makeValidSkeinsOwned(text) {
    if (!text.includes('.')) text += '.';
    const halves = text.split('.');
    if (halves[1].length > 2) {
      halves[1] = halves[1].substring(0, 2);
    }
    const joined = halves[0] + '.' + halves[1];
    return joined;
  }

  return (
    <>
    <a href='#' data-bs-toggle='modal' data-bs-target={'#detail-thread-view-' + modalID} className='list-group-item list-group-item-action d-flex justify-content-between'>
      <h5 className='my-auto'>{displayName}</h5>
      <span className='position-relative btn swatch my-auto' style={swatchStyle}>&nbsp;
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
                <div className='col-4'>
                  <div className='modal-swatch' style={swatchStyle}>&nbsp;</div>

                    <form action='/collection' onSubmit={() => {
                      const validatedSkeins = makeValidSkeinsOwned($('#floating-input-' + modalID).val());

                      const csrfToken = getCsrfCookie();

                      $.ajax({
                        url: '/api/user-thread-update/' + props.pk, 
                        type: 'POST',
                        headers: {
                          'Content-type': 'application/json',
                          'X-CSRFToken': csrfToken
                        },
                        data: JSON.stringify({
                          id: props.pk,
                          owner: props.owner,
                          skeins_owned: validatedSkeins,
                          thread_data: props.thread_data
                        })
                      })
                      .done(() => console.log('success'))
                      .fail((jqxhr, textStatus, requestError) => {
                        console.log(textStatus + ', ' + requestError);
                      });
                    }}>
                      <div className='input-group my-2'>
                        <div className='form-floating'>
                          <input type='text' id={'floating-input-' + modalID} className='form-control' placeholder='1.00' value={modalFormSkeins} pattern='(^\d{0,3}\.{0,1}$)|(^\d{0,3}\.\d*$)' onChange={(event) => {
                            setModalFormSkeins(event.target.value);
                          }} aria-describedby='skeins-helper'>
                        </input>
                        <label for={'floating-input-' + modalID}>Skeins Owned</label>
                      </div>
                      <button type='submit' className='btn btn-outline-secondary' onClick={() => {
                        
                      }}>Update</button>
                      </div>
                      <div className='form-text ms-1'>Max 999.99 skeins</div>
                    </form>

                </div>
                <div className='col-8'>

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
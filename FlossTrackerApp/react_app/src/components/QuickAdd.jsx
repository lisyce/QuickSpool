import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import ThreadAutofillInput from './ThreadAutofillInput';

import { makeValidSkeinsOwned, autofilledThreadToID } from '../utils/validators';
import { getCsrfCookie } from '../utils/csrf-cookie'

// don't let them add threads that already exist in their collection

function QuickAdd(props) {

  // state
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [unownedColors, setUnownedColors] = useState([]);
  const [text, setText] = useState('');

  // hook
  useEffect(() => {
    $.getJSON(`../api/users/${props.user_id}/collection?owned=false`)
    .done((json) => {
      setUnownedColors(json);
      setLoaded(true);
    })
    .fail((jqxhr, textStatus, requestError) => {
      setLoaded(false);
      setError(textStatus + ', ' + requestError);
      console.log(error);
    });
  }, []);

  if (isLoaded) {

    return <>
      <form action='/collection' onSubmit={(event) => {

        // validate text
        const threadID = autofilledThreadToID(event.target.thread.value, unownedColors);
        const skeins = makeValidSkeinsOwned(event.target.skeins.value);

        const csrfToken = getCsrfCookie();

        $.ajax({
          url: '/api/user-threads/',
          type: 'POST',
          headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrfToken
          },
          data: JSON.stringify({
            owner: props.user_id,
            thread_data: threadID,
            skeins_owned: skeins
          })
        })
        .fail((jqxhr, textStatus, requestError) => {
          console.log(textStatus + ', ' + requestError);
        });

      }}>
        <div className='row g-1 align-items-end'>
          <div className='col-12'>
            <label for='search' className='form-label'>Thread Color</label>
            <ThreadAutofillInput data={unownedColors}/>
          </div>

          <div className='col-9 mt-2'>
            <label for='skeins-number' className='form-label'># Skeins</label>
            <input id='skeins-number' type='text' name='skeins' className='form-control' required placeholder='1.5' value={text} onChange={(event) => {
              setText(event.target.value);
            }}></input>
          </div>

          <div className='col-3'>
            <div className='container-fluid px-0'>
              <button type='submit' className='btn btn-outline-secondary' style={{width: "100%"}}>Add</button>
            </div>
          </div>
        </div>

      </form>
    </>
  }

  return <></>;

}

export default QuickAdd;
import React, { useState } from 'react';
import $ from 'jquery';
import ThreadAutofillInput from './ThreadAutofillInput';

import { makeValidSkeinsOwned, autofilledThreadToObj, skeinNumToErrMsg } from '../utils/validators';
import { getCsrfCookie } from '../utils/csrf-cookie'

// don't let them add threads that already exist in their collection
function QuickAdd(props) {

  // state

  const [skeinText, setSkeinText] = useState('');
  const [searchValid, setSearchValid] = useState(true);
  const [skeinsValid, setSkeinsValid] = useState(true);
  const [skeinErrText, setSkeinErrText] = useState('');

  if (props.isLoaded) {

    $('#skeins-number').removeAttr('aria-describedby');

    let skeinsNumClasses = 'form-control';
    let feedback = null;

    if (!skeinsValid) {
      skeinsNumClasses += ' is-invalid';
      feedback = <div id='invalid-skeins' className='invalid-feedback'>{skeinErrText}</div>
      $('#skeins-number').attr('aria-describedby', 'invalid-skeins');
    }

    return <>
      <form onSubmit={(event) => {
        // the state variables don't immediately update, so we must have this extra step
        let valid = true;
        setSkeinsValid(true);

        // validate text
        let thread;
        try {
          thread = autofilledThreadToObj(event.target.thread.value, props.allColors);
          setSearchValid(true);
        } catch (error) {
          setSearchValid(false);
          valid = false;
        }

        // validate skein number
        const num = event.target.skeins.value;
        const err = skeinNumToErrMsg(num);
        setSkeinErrText(err);

        // this is bad coding practice but don't tell anyone. state doesn't update until re-render and we need the answer now
        if (err !== '') {
          valid = false;
          setSkeinsValid(false);
        }

        // stop form from submitting if invalid
        if (!valid) {
          event.preventDefault();
          return false;
        }
        const skeins = makeValidSkeinsOwned(event.target.skeins.value);

        const csrfToken = getCsrfCookie();

        // determine which route to send to
        if (props.unownedColors.find(a => a.id === thread.id) != null) {
          $.ajax({
            url: '/api/user-threads/',
            type: 'POST',
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken': csrfToken
            },
            data: JSON.stringify({
              owner: props.user_id,
              thread_data: thread.id,
              skeins_owned: skeins
            })
          })
          .fail((jqxhr, textStatus, requestError) => {
            console.log(textStatus + ', ' + requestError);
          });
        } else {
          $.ajax({
            url: '/api/user-threads/' + thread.userthread_id,
            type: 'PATCH',
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken': csrfToken
            },
            data: JSON.stringify({
              skeins_owned: skeins,
              action: 'add'
            })
          })
          .fail((jqxhr, textStatus, requestError) => {
            console.log(textStatus + ', ' + requestError);
          });
        }

        // reset the form text on submit
        setSkeinText('');
        $('#search').val('');
      }}>
        <div className='row g-1 align-items-start'>
          <div className='col-12'>
            <label for='search' className='form-label'>Thread Color</label>
            <ThreadAutofillInput data={props.allColors} valid={searchValid}/>
          </div>

          <div className='col-12 col-sm-9 mt-2'>
            <label for='skeins-number' className='form-label'># Skeins</label>
            <input id='skeins-number' type='text' name='skeins' className={skeinsNumClasses}
            required autocomplete='off' placeholder='1.5' value={skeinText} onChange={(event) => {
              setSkeinText(event.target.value);
            }}></input>
            {feedback}
          </div>

          <div className='col-12 col-sm-3'>
            <label id='spacer-label' for='addBtn' className='form-label' aria-hidden='true'>&nbsp;</label>
            <button id='addBtn' type='submit' className='btn btn-outline-secondary mt-1' style={{width: "100%"}}>Add</button>
          </div>
        </div>

      </form>
    </>
  }

  return <></>;

}

export default QuickAdd;
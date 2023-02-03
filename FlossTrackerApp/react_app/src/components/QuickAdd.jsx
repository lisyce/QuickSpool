import React, { useState, useRef, useId } from 'react';
import $ from 'jquery';
import ThreadAutofillInput from './ThreadAutofillInput';

import { makeValidSkeinsOwned, autofilledThreadToObj, skeinNumToErrMsg } from '../utils/validators';
import { getCsrfCookie } from '../utils/csrf-cookie'

function postOnSubmit(event, userId, thread, allColors) {
  const skeins = makeValidSkeinsOwned(event.target.skeins.value);

  const csrfToken = getCsrfCookie();

  // determine which route to send to
  if (allColors.find(a => a.id === thread.id && !a.hasOwnProperty('userthread_id'))) {
    $.ajax({
      url: '/api/user-threads/',
      type: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      data: JSON.stringify({
        owner_id: userId,
        thread_color_id: thread.id,
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
}

function QuickAdd({ userId, allColors, onAdd=postOnSubmit }) {

  const id = useId();

  const searchRef = useRef(null);
  const skeinsRef = useRef(null);

  // state
  const [skeinText, setSkeinText] = useState('');
  const [skeinsValid, setSkeinsValid] = useState(true);
  const [skeinErrText, setSkeinErrText] = useState('');


  let skeinsNumClasses = 'form-control';
  let feedback = null;

  if (skeinsRef.current != null) {

    skeinsRef.current.removeAttribute('aria-describedby');

    if (!skeinsValid) {
      skeinsNumClasses += ' is-invalid';
      feedback = <div id={'invalid-skeins' + id} className='invalid-feedback'>{skeinErrText}</div>
      skeinsRef.current.setAttribute('aria-describedby', 'invalid-skeins' + id)
    }
  }

  return <>
    <form onSubmit={(event) => {
      // the state variables don't immediately update, so we must have this extra step
      let valid = true;
        
      // validate text
      let thread;
      try {
        thread = autofilledThreadToObj(event.target.thread.value, allColors);
      } catch (error) {
        valid = false;
      }

      if (!skeinsValid) valid = false;

      // stop form from submitting if invalid
      if (!valid) {
        event.preventDefault();
        return false;
      }

      if (onAdd == postOnSubmit) {
        postOnSubmit(event, userId, thread, allColors);
        return true;
      } else {
        onAdd(event);
      }

      // reset the form
      setSkeinText('');
      searchRef.current.value = '';
      searchRef.current.dispatchEvent(new Event('input', {'bubbles': true, 'cancelable': true}));
    }}>
      <div className='row g-1 align-items-start'>
        <div className='col-12'>
          <label for={'search' + id} className='form-label'>Thread Color</label>
          <ThreadAutofillInput data={allColors} id={id} ref={searchRef} />
        </div>

        <div className='col-12 col-sm-9 mt-2'>
          <label for={'skeins-number' + id} className='form-label'># Skeins</label>
          <input id={'skeins-number' + id} ref={skeinsRef} type='text' name='skeins' className={skeinsNumClasses}
          required autocomplete='off' placeholder='1.5' value={skeinText} onChange={(event) => {
            const text = event.target.value;
            setSkeinText(text);

            const err = skeinNumToErrMsg(text);
            setSkeinErrText(err);
    
            if (err && text) { // allow empty fields to be "valid". the form won't submit empty anyway
              setSkeinsValid(false);
            } else {
              setSkeinsValid(true);
            }
          }}></input>
          {feedback}
        </div>

        <div className='col-12 col-sm-3'>
          <label id={'spacer-label' + id} className='form-label' aria-hidden='true'>&nbsp;</label>
          <button id={'addBtn' + id} type='submit' className='btn btn-outline-secondary mt-1' style={{width: "100%"}}>Add</button>
        </div>
      </div>

    </form>
  </>

}

export default QuickAdd;
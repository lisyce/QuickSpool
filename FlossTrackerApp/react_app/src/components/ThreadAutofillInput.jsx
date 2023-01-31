import React, { useState, forwardRef } from 'react';
import $ from 'jquery';
import { searchThreads } from '../utils/search';
import { autofilledThreadToObj } from '../utils/validators';

import './thread-autofill-input.css';

// forwardref lets quickadd get to the search bar and such
const ThreadAutofillInput = forwardRef((props, ref) => {

  $('#search' + props.id).removeAttr('aria-describedby');

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const[selectedThread, setSelectedThread] = useState(null);
  const [valid, setValid] = useState(true);

  let classes = 'form-control';
  let feedback = null;

  if (!valid) {
    classes += ' is-invalid';
    feedback = <div id={'invalid-thread' + props.id} className='invalid-feedback'>Please select an option from the list.</div>
    $('#search' + props.id).attr('aria-describedby', 'invalid-thread' + props.id);

    $('#swatch' + props.id).css('background-color', 'white');
    $('#swatch' + props.id).addClass('invalid-border');
    $('#swatch' + props.id).html('<i class=\'bi-x-lg\'></i>');
  } else {
    $('#swatch' + props.id).html('&nbsp;');
    $('#swatch' + props.id).removeClass('invalid-border');

    if (selectedThread != null) {
      $('#swatch' + props.id).css('background-color', `#${selectedThread.hex_value}`);
    } else {
      $('#swatch' + props.id).css('background-color', 'white')
    }
  }

  return <>
    <div className='input-group'>
      <input id={'search' + props.id} ref={ref} name='thread' type='text' list={'datalist' + props.id} autocomplete='off' className={classes} placeholder='DMC 310: Black' required onInput={(event) => {
        console.log('change');
        const searchTerms = event.target.value;
        const availableThreads = searchThreads(searchTerms, props.data);
        setSearchSuggestions(availableThreads);

        try {
          let thread = autofilledThreadToObj(searchTerms, props.data);
          setSelectedThread(thread);
          setValid(true);
        } catch (error) {
          setSelectedThread(null);
          setValid(searchTerms ? false : true);  // allow empty fields to be "valid". the form won't submit empty anyway
        }
      }}></input>

      <span className='input-group-text d-flex justify-content-center input-group-swatch' id={'swatch' + props.id}></span>
    </div>

    {feedback}

  <datalist id={'datalist' + props.id}>
    {searchSuggestions.map((option) => <option value={`${option.brand.name} ${option.brand_number}: ${option.name}`}></option>)}
  </datalist>
  </>
});

export default ThreadAutofillInput;
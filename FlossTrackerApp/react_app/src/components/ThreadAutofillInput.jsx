import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { searchThreads } from '../utils/search';
import { autofilledThreadToObj } from '../utils/validators';

import './thread-autofill-input.css';

function ThreadAutofillInput(props) {

  $('#search').removeAttr('aria-describedby');

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const[selectedThread, setSelectedThread] = useState(null);
  const [valid, setValid] = useState(true);

  let classes = 'form-control';
  let feedback = null;

  if (!valid) {
    classes += ' is-invalid';
    feedback = <div id='invalid-thread' className='invalid-feedback'>Please select an option from the list.</div>
    $('#search').attr('aria-describedby', 'invalid-thread');

    $('#swatch').css('background-color', 'white');
    $('#swatch').addClass('invalid-border');
    $('#swatch').html('<i class=\'bi-x-lg\'></i>');
  } else {
    $('#swatch').html('&nbsp;');
    if (selectedThread != null) {
      $('#swatch').removeClass('invalid-border');
      $('#swatch').css('background-color', `#${selectedThread.hex_value}`);
    }
  }

  return <>
    <div className='input-group'>
      <input id='search' name='thread' type='text' list='datalist' autocomplete='off' className={classes} placeholder='DMC 310: Black' required onChange={(event) => {

        const searchTerms = event.target.value;
        const availableThreads = searchThreads(searchTerms, props.data);
        setSearchSuggestions(availableThreads);

        try {
          let thread = autofilledThreadToObj(searchTerms, props.data);
          setSelectedThread(thread);
          setValid(true);
        } catch (error) {
          setSelectedThread(null);
          setValid(false);
        }
      }}></input>

      <span className='input-group-text d-flex justify-content-center' id='swatch'></span>
    </div>

    {feedback}

  <datalist id='datalist'>
    {searchSuggestions.map((option) => <option value={`${option.brand.name} ${option.brand_number}: ${option.name}`}></option>)}
  </datalist>
  </>
}

export default ThreadAutofillInput;
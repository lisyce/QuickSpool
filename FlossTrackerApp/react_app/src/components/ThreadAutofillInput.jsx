import React, { useState } from 'react';
import $ from 'jquery';
import { searchThreads } from '../utils/search'

function ThreadAutofillInput(props) {

  $('#search').removeAttr('aria-describedby');
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  let classes = 'form-control';
  let feedback = null;
  if (!props.valid) {
    classes += ' is-invalid';
    feedback = <div id='invalid-thread' className='invalid-feedback'>Please select an option from the list.</div>
    $('#search').attr('aria-describedby', 'invalid-thread');
  }

  return <>
    <input id='search' name='thread' type='text' list='datalist' autocomplete='off' className={classes} placeholder='Search Threads' required onChange={(event) => {
      const searchTerms = event.target.value;
      const availableThreads = searchThreads(searchTerms, props.data);
      setSearchSuggestions(availableThreads);
    }}></input>
    {feedback}

  <datalist id='datalist'>
    {searchSuggestions.map((option) => <option value={`${option.brand.name} ${option.brand_number}: ${option.name}`}></option>)}
  </datalist>
  </>
}

export default ThreadAutofillInput;
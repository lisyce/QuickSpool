import React, { useState, forwardRef, useRef } from 'react';
import { searchThreads } from '../utils/search';
import { autofilledThreadToObj } from '../utils/validators';

import './thread-autofill-input.css';

// forwardref lets quickadd get to the search bar and such
const ThreadAutofillInput = forwardRef(({ id, data }, ref) => {

  const swatchRef = useRef(null);

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const[selectedThread, setSelectedThread] = useState(null);
  const [valid, setValid] = useState(true);

  let classes = 'form-control';
  let feedback = null;

  // first render will have null for this ref but that doesn't break any functionality
  if (swatchRef.current != null) {
    swatchRef.current.removeAttribute('aria-describedby');

    if (!valid) {
      classes += ' is-invalid';
      feedback = <div id={'invalid-thread' + id} className='invalid-feedback'>Please select an option from the list.</div>
      swatchRef.current.setAttribute('aria-describedby', 'invalid-thread' + id);

      swatchRef.current.style.backgroundColor = 'white';
      swatchRef.current.classList.add('invalid-border');
      swatchRef.current.innerHTML = '<i class=\'bi-x-lg\'></i>';

    } else {
      swatchRef.current.innerHTML = '&nbsp;';
      swatchRef.current.classList.remove('invalid-border');

      if (selectedThread) {
        swatchRef.current.style.backgroundColor = `#${selectedThread.hex_value}`;
      } else {
        swatchRef.current.style.backgroundColor = 'white';
      }
    } 
  }
  

  return <>
    <div className='input-group'>
      <input ref={ref} name='thread' type='text' list={'datalist' + id} autocomplete='off' className={classes} placeholder='DMC 310: Black' required onInput={(event) => {
        const searchTerms = event.target.value;
        const availableThreads = searchThreads(searchTerms, data);
        setSearchSuggestions(availableThreads);

        try {
          let thread = autofilledThreadToObj(searchTerms, data);
          setSelectedThread(thread);
          setValid(true);
        } catch (error) {
          setSelectedThread(null);
          setValid(searchTerms ? false : true);  // allow empty fields to be "valid". the form won't submit empty anyway
        }
      }}></input>

      <span className='input-group-text d-flex justify-content-center input-group-swatch' id={'swatch' + id} ref={swatchRef}></span>
    </div>

    {feedback}

  <datalist id={'datalist' + id}>
    {searchSuggestions.map((option) => <option value={`${option.brand.name} ${option.brand_number}: ${option.name}`}></option>)}
  </datalist>
  </>
});

export default ThreadAutofillInput;
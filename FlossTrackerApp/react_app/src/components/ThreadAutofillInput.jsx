import React, { useState } from 'react';
import { searchThreads } from '../utils/search'

function ThreadAutofillInput(props) {
    const [searchSuggestions, setSearchSuggestions] = useState([]);

    return <>
        <input id='search' type='text' list='datalist' className='form-control' placeholder='Search Threads' required onChange={(event) => {
            const searchTerms = event.target.value;
            const availableThreads = searchThreads(searchTerms, props.data);
            setSearchSuggestions(availableThreads);
        }}></input>

      <datalist id='datalist'>
        {searchSuggestions.map((option) => <option value={`${option.brand.name} ${option.brand_number}: ${option.name}`}></option>)}
      </datalist>
      </>
}

export default ThreadAutofillInput;
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import ThreadAutofillInput from './ThreadAutofillInput';


// don't let them add threads that already exist in their collection

function QuickAdd(props) {

  // state
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [unownedColors, setUnownedColors] = useState([]);

  // hook
  useEffect(() => {
    $.getJSON(`../api/users/${props.user_id}/collection?owned=false`)
    .done((json) => {
      setUnownedColors(json);
      setLoaded(true);
      console.log(json);
    })
    .fail((jqxhr, textStatus, requestError) => {
      setLoaded(false);
      setError(textStatus + ', ' + requestError);
      console.log(error);
    });
  }, []);

  if (isLoaded) {

    return <>
      <form action='/collection'>
        <div className='row g-1 align-items-end'>
          <div className='col-8'>
            <label for='search' className='form-label'>Thread Color</label>
            <ThreadAutofillInput data={unownedColors}/>
          </div>

          <div className='col'>
            <label for='skeins-number' className='form-label'># Skeins</label>
            <input id='skeins-number' type='text' className='form-control' required></input>
          </div>

          <div className='col'>
            <button type='submit' className='btn btn-outline-secondary'>Add</button>
          </div>
        </div>

      </form>
    </>
  }

  return <></>;

}

export default QuickAdd;
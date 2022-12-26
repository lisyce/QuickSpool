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
          <div className='col-12'>
            <label for='search' className='form-label'>Thread Color</label>
            <ThreadAutofillInput data={unownedColors}/>
          </div>

          <div className='col-9 mt-2'>
            <label for='skeins-number' className='form-label'># Skeins</label>
            <input id='skeins-number' type='text' className='form-control' required placeholder='1.5'></input>
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
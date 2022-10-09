import React from 'react';

function AddThreadsForm() {

  return (
    <>
    <button type='button' className='btn btn-outline-dark' dataToggle='modal' dataTarget='#addModal'>Add Threads to Collection</button>

    <div className='modal fade' id='addModal' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>

          <div className='modal-header'>
            <h5 className='modal-title'>Add Threads to Collection</h5>
            <button type='button' dataDismiss='modal'>
              <span>&times;</span>
            </button>
          </div>

          <div className='modal-body'>

          </div>

          <div className='modal-footer'>


          </div>
        </div>
      </div>

    </div>
    </>

  );
}

export default AddThreadsForm;
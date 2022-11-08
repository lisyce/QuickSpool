import React from 'react';
import Navbar from '../components/Navbar';

import ThreadCardList from '../components/ThreadCardList';
import QuickAdd from '../components/QuickAdd';

function Collection () {
    return ( 
      <>
        <Navbar />
        <main>
          <div className='row'>
            <div className='col-4'>

            </div>

            <div className='col-4'>
              <ThreadCardList user_id='1' /> 
            </div>

            <div className='col-4'>
              <div id='add-threads' className='d-flex align-items-center'>
                <h3>Quick Add</h3>
                <QuickAdd />
              </div>

            </div>
            
          </div>
        </main>
      </>
    );
}

export default Collection;


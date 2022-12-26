import React from 'react';
import Navbar from '../components/Navbar';

import ThreadCardList from '../components/ThreadCardList';
import QuickAdd from '../components/QuickAdd';

function Collection () {
    return ( 
      <>
        <Navbar />
        <main>
          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='col-12 col-lg-4 mb-3'>

              </div>

              <div className='col-12 col-lg-4 mb-3'>
                <ThreadCardList user_id='1' /> 
              </div>

              <div className='col-12 order-first order-lg-0 col-lg-4 mb-3'>
                <div className='container-fluid'>
                  <h3>Quick Add</h3>
                  <QuickAdd user_id='1'/>
                </div>
              </div>
              
            </div>
          </div>
        </main>
      </>
    );
}

export default Collection;


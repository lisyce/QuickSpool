import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import Navbar from '../components/Navbar';

import ThreadCardList from '../components/ThreadCardList';
import LoadingThreadCard from '../components/LoadingThreadCard';
import QuickAdd from '../components/QuickAdd';

function Collection (props) {

  const [unownedColors, setUnownedColors] = useState([]);
  const [ownedColors, setOwnedColors] = useState([]);
  const [allColors, setAllColors] = useState([]);

  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  // hook
  useEffect(() => {
    $.getJSON(`../api/users/${props.userId}/collection?owned=all`)
    .done((json) => {

      let owned = json.owned
      let unowned = json.unowned

      setOwnedColors(owned);
      setUnownedColors(unowned);

      setLoaded(true);
    })
    .fail((jqxhr, textStatus, requestError) => {
      setLoaded(false);
      setError(textStatus + ', ' + requestError);
      console.log(error);
    });
  }, []);

  useEffect(() => {
    setAllColors(unownedColors.concat(ownedColors));
  }, [ownedColors, unownedColors])

  // show placeholder thread cards if not yet loaded
  let threadCardList;
  if (isLoaded) {
    threadCardList = <ThreadCardList threadColors={ownedColors} />;
  } else {
    threadCardList = <>
      <LoadingThreadCard headingWidth='40%'/>
      <LoadingThreadCard headingWidth='60%'/>
      <LoadingThreadCard headingWidth='50%'/>
    </>
  }

  return ( 
    <>
      <Navbar />

      <main>
        <div className='container-fluid px-5'>
          <div className='row'>
            <div className='col-12 col-lg-4 mb-3'>

            </div>

            <div className='col-12 col-lg-4 mb-3'>
              {threadCardList}
            </div>

            <div className='col-12 order-first order-lg-0 col-lg-4 mb-3'>
              <div className='container-fluid'>

                <div style={{display: isLoaded ? 'block' : 'none'}}>
                  <h3>Quick Add</h3>
                  <QuickAdd userId={props.userId} allColors={allColors} />
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
}

export default Collection;


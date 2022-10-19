import React from 'react';
import Navbar from '../components/Navbar';
import ThreadCardList from '../components/ThreadCardList';
import AddThreadsForm from '../components/AddThreadsForm';

function Collection () {
    return ( 
      <>
        <Navbar />
        <main>
          <ThreadCardList username='admin' width_class='col-4' /> 
        </main>
      </>
    );
}

export default Collection;


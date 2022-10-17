import React from 'react';
import Navbar from '../components/Navbar';
import ThreadCardList from '../components/ThreadCardList';

function Root () {
    return ( 
      <>
        <Navbar />
        <ThreadCardList username='admin' /> 
      </>
    );
}

export default Root;


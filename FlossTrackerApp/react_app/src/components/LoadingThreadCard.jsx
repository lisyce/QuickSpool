import React from 'react';

import './thread-card.css';
import './loading-thread-card.css';

function LoadingThreadCard(props) {

  return <>
    <a href='#' tabIndex={-1} className='disabled placeholder-glow list-group-item list-group-item-action d-flex justify-content-between'>
      <span className='placeholder threadcard-header threadcard-header-responsive my-auto placeholder-threadname' style={{width: props.headingWidth}}></span>
      <span className='placeholder swatch my-auto me-3'></span>
    </a>
  </>
}

export default LoadingThreadCard;
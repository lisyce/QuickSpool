import React from 'react';
import './thread-card.css';

// props will be a thread color model json data 
function ThreadCard(props) {
  const swatchHex = props.thread_data.hex_value;
  const swatchStyle = {
    backgroundColor: '#' + swatchHex
  };


  return (
    <li className='list-group-item d-flex justify-content-between'>
      <h5 className='my-auto'>{props.thread_data.brand} {props.thread_data.brand_number}: {props.thread_data.name}</h5>
      <span className='position-relative btn swatch my-auto' style={swatchStyle}>&nbsp;
        <span className='position-absolute top-0 start-100 translate-middle text-bg-light badge'>{props.skeins_owned}</span>
      </span>
    </li>
  );
}

export default ThreadCard;
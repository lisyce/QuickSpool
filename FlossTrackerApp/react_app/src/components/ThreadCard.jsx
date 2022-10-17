import React from 'react';
import './thread-card.css';

// props will be a thread color model json data 
function ThreadCard(props) {
  const swatchHex = props.thread_data.hex_value;
  const swatchStyle = {
    backgroundColor: '#' + swatchHex,
    color: '#' + swatchHex
  };
  // todo show the skeins owned as a badge?

  return (
    <div className='card my-2'>
      <div className='card-body text-center'>
        <h5 className='card-title'>
          {props.thread_data.brand} {props.thread_data.brand_number}: {props.thread_data.name} ({props.skeins_owned} skeins) 
          <span className='badge' style={swatchStyle}> </span>
        </h5>
      </div>
    </div>
  );
}

export default ThreadCard;
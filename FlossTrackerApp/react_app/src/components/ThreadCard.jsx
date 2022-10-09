import React from 'react';
import './ThreadCard.css'

// props will be a thread color model json data 
function ThreadCard(props) {
  const swatchHex = props.thread_data.hex_value;
  const swatchStyle = {
    backgroundColor: '#' + swatchHex,
    color: '#' + swatchHex
  };

  return ( 
    <div className='card'>
      <div className='card-body row'>
        <h5 className='card-title my-auto'>
          {props.thread_data.brand} {props.thread_data.brand_number}: {props.thread_data.name} ({props.skeins_owned} skeins)
        </h5>
        <div className='color-swatch my-auto' style={swatchStyle}>#</div>
      </div>
    </div>
  );
}

export default ThreadCard;
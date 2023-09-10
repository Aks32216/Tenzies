import React from 'react';

export default function Die(props){

    const bgStyle={backgroundColor: props.isHeld? '#3AA6B9' : '#213555'}

    return(
        <div className='die' style={bgStyle} onClick={()=>{props.handleHeld(props.id)}}>
            <h2>{props.value}</h2>
        </div>
    )
}
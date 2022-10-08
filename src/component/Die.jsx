import React from 'react'
import './Die.css'

export default function Die(props) {
 
  return (
    <div className={props.isHeld?"dice green":"dice"} onClick={props.hold}>{props.value}</div>

  )
}



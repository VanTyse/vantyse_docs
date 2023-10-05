import React from 'react'

function Alerts({msg, type, show}) {
  return (
    <div style={{
        backgroundColor : '#121212',
        color : (type === 'warning') ? 'yellow' : (type === 'success') ?  'rgb(6, 180, 6)' : (type === "danger") ? 'red' : null,
        width : 'auto',
        maxWidth : '300px',
        padding : '10px 20px',
        border : '1px solid #282828',
        borderLeft : `7px solid #282828`,
        fontSize : '16px',
        opacity : '.8'
        
    }} className={`alert-container`}>
         {msg}
    </div>
  )
}

export default Alerts
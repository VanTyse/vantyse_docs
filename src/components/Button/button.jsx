import React from 'react'

function Button({value, type, htmlType, color}) {
  let button;
  if (type === 'roundedButton') {
    button = <div style={{display : 'flex'}}>
    <div className='btn-left' style={{ 
      borderBottomLeftRadius: "50%",
      borderTopLeftRadius: "50%",
      width: "40px",
      height: "40px",
      backgroundColor: "var(--main-color)",
      }}>
    </div>
    <button type={htmlType} style={{
      "display" : 'flex',
        "width": "fitContent",
        "height": "40px",
        "padding": "0",
        alignItems : 'center',
        "font-size": "18px",
        "border": "none",
        "borderRadius" : "0",
        "backgroundColor": "var(--main-color)",
        "color": "var(--text-color)"    
      }}className='btn'>{value}</button>
    <div className='btn-right' style={{ 
      borderBottomRightRadius: "50%",
      borderTopRightRadius: "50%",
      width: "40px",
      height: "40px",
      backgroundColor: "var(--main-color)",
      }}>
    </div>
  </div>
  }

  if (type === 'normalButton'){
    button =  <button className='normal-btn' type ={htmlType} style={{
      "border" : 'none', 
      "backgroundColor" : (color) ? color : '#282828', 
      "backgroundImage" : (color) ? 'none' : "linear-gradient(135deg, var(--sub-color), var(--main-color))",
      "opacity" : '0.9',
      "color" : 'hsl(200, 50%, 95%)', 
      "padding" : '12px 28px', 
      "borderRadius" : '4px', 
      "fontSize" : '16px',
      "transitionDuration" : '.1s'
    }}
  >
      {value}
  </button>
  }
  return (
    <>
       {button}
    </> 
  )
}

export default Button
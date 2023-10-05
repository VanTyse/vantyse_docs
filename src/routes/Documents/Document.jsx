import './Document.css'
import React, {useContext, useState, useEffect} from 'react'
import TextEditor from '../../components/TextEditor/TextEditor'
import { DocumentContext } from '../../context/context'
import useScrollDirection from '../../custom_hooks/useScrollDirection'

function Document() {
  return (
    <div>
      <DocumentOptions/>
      <TextEditor/>
    </div>
  )
}

function DocumentOptions(){
    const {name, canEdit} = useContext(DocumentContext)
    const {direction} = useScrollDirection()
    const [showThis, setShowThis] = useState(true)

    useEffect(() => {
      if (direction === 'down'){
        setShowThis(true)
      }
      else{
        setShowThis(false)
      }
    }, [direction])

    useEffect(() => {
      let s;
      if (showThis){
        s = setTimeout(() => {
          setShowThis(false)
        }, 3000);
      }
    }, [showThis])

    return(
        <div className={`document-options ${showThis && 'show-document-options'}`}>
        {
          canEdit ? <div className="document-name">editing {name}...</div> : 
          <div className="document-name">viewing {name}...</div>
        }
        </div>
    )
}

export default Document
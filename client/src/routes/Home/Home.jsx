import './Home.css'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import useScrollDirection from '../../custom_hooks/useScrollDirection';
import {v4 as uuidv4} from 'uuid'

function Home() {
    const [documents, setDocuments] = useState([])
    const navigate = useNavigate()


    return (
        <div className='home-container container'>
            <div className="documents">
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
            </div>
            <NewDocumentButton/>
        </div>
    )
}

function DocumentCard({title, date}){
    return(
        <div className="document-card">
            <div className="left">                
                <h2 className='title'>Title</h2>
                <div className="date">Jun 19, 2022</div>
            </div>
            <div className="right">
                <i className="far fa-handshake handshake-icon"></i>
                <p className={`show-collaborate`}>Collaborate</p>
            </div>
        </div>
    )
}

function NewDocumentButton(){
    // const [direction, setDirection] = useState(null)
    const {direction} = useScrollDirection()
    console.log(direction)
    return(
        <div className={`new-doc-btn ${direction === 'down' && 'hide-btn'}`}><span>+</span></div>
    )
}

export default Home
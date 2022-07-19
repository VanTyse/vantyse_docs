import React, {useState, useCallback, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {io} from 'socket.io-client'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

function TextEditor() {
    const {id : documentID} = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    const TOOLBAR_OPTIONS = [
        [{header : [1, 2, 3, 4, 5, 6, false]}],
        [{font : []}],
        [{list : 'ordered'}, {list: 'bullet'}],
        ['bold', 'italic', 'underline'],
        [{color : []}, {background: []}],
        [{script : 'sub'}, {script : 'super'}],
        [{align : []}],
        ['image', 'blockquote', 'code-block'],
        ['clean']
    ]

    const SAVE_INTERVAL = 2000;

    useEffect(() => {
        const s = io('http://localhost:3001');
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null)return
        wrapper.innerHTML = '';
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {theme : "snow", modules : {toolbar : TOOLBAR_OPTIONS}})
        q.disable()
        q.setText('Loading...')
        setQuill(q)
    }, [])

    useEffect(() => {
        if (socket == null || quill == null)return

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user')return
            socket.emit('send-changes', delta)
        }

        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null)return

        const handler = (delta) => {
            quill.updateContents(delta)
        }

        socket.on('receive-changes', handler)

        return () => {
            socket.off('receive-changes', handler)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null)return

        socket.once('load-document', document => {
            quill.setContents(document)
            quill.enable()
        })

        socket.emit('get-document', documentID)
    }, [socket, quill, documentID])

    useEffect(() => {
        if (socket == null || quill ==null)return
        const timeInterval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
        }, SAVE_INTERVAL)

        return () => {
            clearInterval(timeInterval)
        }
    }, [socket, quill])

  return (
    <div id='text-editor' ref={wrapperRef}></div>
  )
}

export default TextEditor
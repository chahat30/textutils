import React, { useState } from 'react';
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import {Modal} from 'react-bootstrap';
import Spinner from './Spinner';
import '../index.css';


export default function TextForm(props) {

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState({state: false})
  const[loading,setloading]=useState(false);

  const[audioform,setaudioform]=useState({audioFile: null})
  const [text, setText] = useState("");

    const handleformsubmit=async(event)=>{
      event.preventDefault();
      setloading(true);
      const audioformdata = new FormData()
      audioformdata.append('audioFile',audioform.audioFile)
      const response = await fetch("https://textutilserver.onrender.com/transcribe/converttotext", {
                method: "POST", 
                headers: {
                },
                body: audioformdata
            })
            const json = await response.json()
            setloading(false);
            setText(json.transcript.slice(5));
            setIsConfirmModalOpen({state:false})
    }

    const onchangehandler=(e)=>
    {
      setaudioform({audioFile:e.target.files[0]})
    }

    const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen({state: false})
    }

    const handleOpenConfirmModal = () => {
        setIsConfirmModalOpen({state: true})
    }

  const handleSentenceCaseClick = () => {
    let newText = text.split('. ').map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase() + ".").join(' ');
    newText = newText.slice(0, newText.length - 1)
    setText(newText);
}

const handleFindAndReplace = () =>{
  let find = document.getElementById("find").value;
  let replace = document.getElementById("replace").value;
  let newText = text.replaceAll(find,replace);
  setText(newText);
}

   const handleUpClick=()=>{
        let newtext=text.toUpperCase();
        setText(newtext)
    }

    const handleloClick=()=>{
      let newtext=text.toLowerCase();
      setText(newtext)
  }
  const clearText=()=>{
    let newtext='';
    setText(newtext)
}

const copyText=()=>{
  var newText=document.getElementById("my-box");
  newText.select();
   navigator.clipboard.writeText(newText.value);
}

    const handleOnChange=(event)=>
    {
        setText(event.target.value)
    }


  return (
    <>
    <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>
      <h1>{props.heading}</h1>

<Modal show={isConfirmModalOpen.state} onHide={handleCloseConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>

                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleformsubmit}>
                  <div className="form-group">
                    <div>
                      <h5 className="modal-class">Add audio file in formats: WAV(.wav), MP3(.mp3), FLAC(.flac), OGG(.ogg), M4A(.m4a), AAC(.aac), AIFF(.aiff), AMR (.amr),WMA (.wma)</h5>
                    </div>
                    <input type="file" className="form-control-file d-flex justify-content-center" onChange={onchangehandler} id="exampleFormControlFile1"/>
                  </div>
                  {loading&&<Spinner/>}
                  <div className="submit-btn-div">
                  <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>
                </Modal.Body>
            </Modal>

                 

      <div className="mb-3">
      <GrammarlyEditorPlugin clientId="client_W1Vh9yu5pUoFeoRR16RqrS">
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="my-box"
          rows="8"
        ></textarea>
         </GrammarlyEditorPlugin>
      </div>
      <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
      <button className="btn btn-primary mx-2" onClick={handleloClick}>Convert to Lowercase</button>
      <button className="btn btn-primary mx-2" onClick={clearText}>Clear Text</button>
      <button className="btn btn-primary mx-2" onClick={copyText}>Copy Text</button>
      <button className="btn btn-primary mx-2" onClick={handleSentenceCaseClick}>Convert to Sentence Case</button>
      <button className="btn btn-primary mx-2" onClick={handleOpenConfirmModal}>Convert audio to text</button>
      <div className="container my-3">
            <h4>Find and Replace the text</h4>
            <input type="text" className="form-control my-2" placeholder="Enter the text you want to change" id="find"/>
            <input type="text" className="form-control mb-2" placeholder="Enter the new text you want to add" id="replace"/>
            <button className="btn btn-primary mb-3 mx-1" onClick={handleFindAndReplace}>Replace</button>
        </div>
      </div>

    <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
      <h2>Text summary</h2>
      <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words {text.length} characters</p>
      <p>{0.008*text.split(/s+/).filter((element)=>{return element.length!==0}).length} minutes read</p>
      <h2>Preview</h2>
      <p>{text}</p>
    </div>
    </>
  );
}

import React, { useState } from 'react';

export default function TextForm(props) {
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
    const [text, setText] = useState("");

  return (
    <>
    <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>
      <h1>{props.heading}</h1>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="my-box"
          rows="8"
        ></textarea>
      </div>
      <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
      <button className="btn btn-primary mx-2" onClick={handleloClick}>Convert to Lowercase</button>
      <button className="btn btn-primary mx-2" onClick={clearText}>Clear Text</button>
      <button className="btn btn-primary mx-2" onClick={copyText}>Copy Text</button>

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

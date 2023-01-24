import { useState } from 'react';
import './App.css';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
//import About from './components/About';
import TextForm from './components/TextForm';
//import ReactDOM from "react-dom/client";
//import {
//  BrowserRouter,
//  Routes,
//  Route
//} from "react-router-dom";

function App() {
  const[mode,setMode]=useState('light');
  const[alert,setAlert]=useState(null);

  const showAlert=(message,type)=>{
    setAlert({
          msg:message,
          Type:type
  });
  setTimeout(
    ()=>{setAlert(null)},1500
  );
  }

  const toggleMode=()=>{
    if(mode==='light')
    {
      setMode('dark');
      document.body.style.backgroundColor='black';
      showAlert(" dark mode enabled","success");
    }
    else
    {
      setMode('light');
      document.body.style.backgroundColor='white';
      showAlert(" light mode enabled","success");
    }
  }

  return (
    <>
 {/*<BrowserRouter>*/ } 
   <Navbar title="Textutils" mode={mode} toggleMode={toggleMode}/>
   <Alert alert={alert}/>
   <div className="container my-3">
   <TextForm heading="Enter the text to analyse: " mode={mode} />
  {/*  <Routes>
        <Route exact path="/" element={<TextForm heading="Enter the text to analyse: " mode={mode} />} />
  <Route exact path="/About" element={<About />} />
    </Routes>*/}
   </div>
 {/* </BrowserRouter>*/}
   
  </>
  );
}

export default App;

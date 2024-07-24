import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Newcontainer from './components/Newcontainer';
import { Route, Routes } from 'react-router-dom';
function App() {
  const[mode,setMode]=useState('Dark');
  
  const handleMode=()=>{
    if (mode==='Light')
    {
        setMode('Dark');
    }
    else if (mode==='Dark')
    {
        setMode('Light');
    }
}
  return (
    <div>
      <div className="form-check form-switch flex items-center absolute my-3 right-5">
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleMode}/>
        <label className="form-check-label flex items-center mx-1 text-white" htmlFor="flexSwitchCheckDefault">{mode==='Light'?'Dark':'Light'}</label>
      </div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Newcontainer country='in' category='general' mode={mode}/>} />
        <Route exact path='/business' element={<Newcontainer country='in' category='business' mode={mode}/>}/>
        <Route exact path='/entertainment' element={<Newcontainer country='in' category='entertainment' mode={mode}/>} />
        <Route exact path='/health' element={<Newcontainer country='in' category='health' mode={mode}/>} />
        <Route exact path='/science' element={<Newcontainer country='in' category='science' mode={mode}/>} />
        <Route exact path='/sports' element={<Newcontainer country='in' category='sports' mode={mode}/>} />
        <Route exact path='/technology' element={<Newcontainer country='in' category='technology' mode={mode}/>} />
        <Route exact path='/other' element={<Newcontainer country='in' category='other' mode={mode}/>} />
        <Route path='*' element={<div><h1>404 Page Not Found</h1></div>} />
      </Routes>

    </div>

  );
}

export default App;

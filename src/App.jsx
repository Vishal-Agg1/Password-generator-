import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
function App() {
  const [length,setlength] = useState(8);
  const [num,setnum] = useState(false);
  const [char,setchar] = useState(false);
  const [password,setpass] = useState();
  const getpass = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(num) str+="1234567890";
    if(char) str+="@#$%^&*(){}";
    for(let i = 1;i<length;i++){
      let ind = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(ind);
    }
    setpass(pass);
  },[length,num,char,setpass]);
  const passref = useRef(null);
  const copy = ()=>{
      passref.current?.select();
      window.navigator.clipboard.writeText(password);
  }
  useEffect(()=>{getpass()},[length,num,char,getpass])
  return (
    <>
    <div className="w-screen h-dvh bg-black flex justify-center items-center flex-shrink">
      <div className="outer">
        <div className="upper">
          <input type="text" className="pass" value={password} placeholder='password' ref={passref} readOnly/>
          <button className="copy" onClick={copy} > Copy</button>
        </div>
        <div className="flex flex-row space-x-4 items-center">
        <label htmlFor="length">Length ({length}):</label>
        <input type="range" id="length"  min={8} max={20}  className='cursor-pointer' onClick={(e)=>{
               console.log(length);
               return setlength(e.target.value);
        }} />
        <input type="checkbox"  id="char" onClick={()=>{
          return setchar((prev)=>{return !prev});
        }} />
         <label htmlFor="char"> character</label>
        <input type="checkbox" id="num" onClick={()=>{
          setnum((prev)=>!prev)
        }} />
         <label htmlFor="num"> number</label>
    </div>
    </div>   
    </div>
    </>
  )
}

export default App

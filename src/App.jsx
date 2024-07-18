import { useCallback, useEffect, useRef, useState } from 'react'



function App() {
  

const [length,setlength]=useState(8);
const [numAllow,setnumAllow]=useState(false);
const [charAllow,setcharAllow]=useState(false);
const [password,setpassword]=useState("");


//Use Ref

const passRef=useRef(null);


const passGenerator = useCallback(()=>{

  let pass="";
  let str="ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz";

  if(numAllow)str+="1234567890"
  if(charAllow)str+="!@#$%^&*()"

  for (let i = 0; i < length; i++) {
      let char= Math.floor(Math.random()*str.length);

      pass+=str.charAt(char);
  }

  setpassword(pass);


},[numAllow,length,charAllow])


useEffect(()=>{
  passGenerator();
},[numAllow,length,charAllow,passGenerator])

const copyPassToClipboard = useCallback(()=>{
  window.navigator.clipboard.writeText(password)
  passRef.current?.select()
},[password])


  return (
    <>
    <div className='w-screen h-screen	bg-gray-400 flex flex-col justify-center items-center	'>
      <h1 className='mb-4 text-xl'>Pass Generator</h1>
      <div>
      <input type="text" name="" id="" value={password} readOnly className='border-2 h-12 w-18 text-lg mb-4' ref={passRef} />
      <button onClick={copyPassToClipboard} className='rounded-r-lg bg-blue-300 h-12 w-16' >Copy</button><br /></div>
      <div>
      <input type="range" name="range" id="" value={length} min={8} max={20} onChange={(e)=>{setlength(e.target.value)}}  /> <label htmlFor="range" className='mr-4'> length {length}</label>
      <input type="checkbox" name="number"  defaultChecked={numAllow} onChange={()=>setnumAllow((prev)=>!prev)} id="number" /><label htmlFor="number" className='mr-4'>Allow number</label>
      <input type="checkbox" name="" id="char" defaultChecked={charAllow} onChange={()=>setcharAllow((prev)=>!prev)} /><label htmlFor="char">Character</label>
      </div>
      </div>
    </>
  )
}

export default App

import './App.css'
import Side from './Side.jsx';
import Window from './Window.jsx';
import { MyContext } from './MyContext.jsx';
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";

function App() {
  const [prompt,setPrompt] = useState("");
  const [reply,setReply] = useState(null);
  const [currThreadId,setCurrThreadId] = useState(uuidv1());
  const [prevChats,setPrevChats] = useState([]);
  const [newChat ,setNewChat] = useState(true);
  const [allThreads,setAllThreads] = useState([]);
  
  const providerValues = {
     prompt,setPrompt,
     reply,setReply,
     currThreadId,setCurrThreadId,
     prevChats,setPrevChats,
     newChat,setNewChat,
     allThreads,setAllThreads
  };

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
        <Side></Side>
        <Window></Window>
        </MyContext.Provider>
    </div>
  )
}

export default App

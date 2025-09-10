import "./Side.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from "uuid";

function Side(){
    const{allThreads,setAllThreads,currThreadId,setNewChat,setPrevChats,setPrompt,setReply,setCurrThreadId} = useContext(MyContext);

    const getThreads =  async()=>{
        
        try{
           const response = await fetch("http://localhost:8080/api/thread");
           const res = await response.json();
           const filteredData = res.map(thread=> ({threadId: thread.threadId , title:thread.title}));
           setAllThreads(filteredData);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
         getThreads();
    },[currThreadId]);

    const createNewChat = ()=>{
           setNewChat(true);
           setPrompt("");
           setReply(null);
           setPrevChats([]);
           setCurrThreadId(uuidv1());

    }

    const changeThread = async(threadId)=>{
         setCurrThreadId(threadId);

         try{
           const response = await fetch(`http://localhost:8080/api/thread/${threadId}`);
           const res = await response.json();
           console.log(res);
           setPrevChats(res);
           setNewChat(false);
           setReply(null);
         }catch(err){
             console.log(err); 
         }
    }

    const deleteThread = async(threadId)=>{
           try{
              const response = await fetch(`http://localhost:8080/api/thread/${threadId}`,{method:"DELETE"});
              const res = await response.json();
              console.log(res);

             setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

             if(threadId === currThreadId){
                 createNewChat();
             }

           }catch(err){
             console.log(err);
           }
    }

     return(
         <section className="side">
             <button onClick={createNewChat}>
                 <img src="src/assets/blacklogo.png" alt="gtp-logo" className="logo"></img>
                 <span><i className="fa-solid fa-pen-to-square"></i></span>
             </button>
             <ul className="history">
                {
                     allThreads?.map((thread,idx)=>(
                        <li key={idx}
                          onClick={(e)=> changeThread(thread.threadId)}
                        >{thread.title}
                        <i className="fa-solid fa-trash" onClick={(e)=>{
                            e.stopPropagation();
                            deleteThread(thread.threadId);
                            }}
                        > </i>
                        </li>
                     ))
                }
             </ul>
             <div className="sign">
                 <p>Your AI assistant&hearts;</p>
             </div>
         </section>
     )
}

export default Side;
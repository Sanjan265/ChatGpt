import "./Window.css";
import Talking from "./Talking.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState,useEffect} from "react";
import {ScaleLoader} from "react-spinners";


function Window(){
    const {prompt,setPrompt,reply,setReply,currThreadId,prevchats,setPrevChat,setNewChat} = useContext(MyContext);
    const [loading,setLoading] = useState(false);
    const [isOpen ,setIsOpen] = useState(false);

    const getReply = async()=>{
        setNewChat(false);
        setLoading(true);
        const options = {
             method :"POST",
             headers :{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                message:prompt,
                threadId: currThreadId
             })
        };

        try{
          const response = await fetch("http://localhost:8080/api/chat",options);
          const res = response.json();
          console.log(res);
          setReply(res.reply)
          console.log(response);
        }catch(err){
             console.log(err);
        }
        setLoading(false);
    }

     useEffect(()=>{
         if(prompt && reply){
              setPrevChats(prevchats=> (
                 [...prevchats,{
                     role:"user",
                     content:prompt
                 },{
                     role:"assistant",
                     content:reply
                 }]
                
              ))
         }
         setPrompt("");
     },[reply])

     const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }


     return(
         <div className="window">
              <div className="navbar">
                 <span>ChatGPT <i className="fa-solid fa-angle-down"></i> </span>
                 <div className="userIconDiv " onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                 </div>
              </div>

              {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }
              <Talking></Talking>

              <ScaleLoader color="#fff" loading={loading}>

              </ScaleLoader>

              <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything" value={prompt} onChange={(e)=>setPrompt(e.target.value)} onKeyDown={(e)=>'Enter'?getReply():''}>
                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    ChatGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
              </div>
         </div>
     )
}

export default Window;
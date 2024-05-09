import React, { useEffect, useState } from 'react'
import styles from "./Chat.module.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function Chat() {
    const [chat, setchat] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [profile, setProfile] = useState("")
    const [scro, setScro] = useState(true);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [data, setData] = useState([{ name: "Bhudeo Krit", profile: "", chat: "Hi, This is the first message" ,time:time}])
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('inpData')===null){
            navigate('/')
        }
        else{
            setName(JSON.parse(localStorage.getItem('inpData')).name);
            setProfile(JSON.parse(localStorage.getItem('inpData')).profile);
            setEmail(JSON.parse(localStorage.getItem('inpData')).email);
        }
    },[])
    function handleChange(e) {
        e.preventDefault();
        setchat(e.target.value)
        
    }

    async function handleSend(e) {
        e.preventDefault();
        if (chat.trim() !== "") {
            try {
                setchat("")
                const res = await axios.post("https://chatapp-backend-pywd.onrender.com/createdata", { name,profile,chat,time,email }, { headers: { "Content-Type": "application/json" } });
                // const res = await axios.post("http://localhost:8000/createdata", { name,profile,chat,time,email }, { headers: { "Content-Type": "application/json" } });
                // console.log(res.data)
            }
            catch (err) {
                alert(err.message)
            }
        }
    }

    async function handleDelete(_id){
        try {
            const res = await axios.post("https://chatapp-backend-pywd.onrender.com/deletedata", { id:_id }, { headers: { "Content-Type": "application/json" } });
            // const res = await axios.post("http://localhost:8000/deletedata", { id:_id }, { headers: { "Content-Type": "application/json" } });
            // console.log(res.data)
        }
        catch (err) {
            alert(err.message)
        }
    }

    function scrollToBottom() {
        document.getElementById('box').scrollTop = document.getElementById('box').scrollHeight;
    }
    useEffect(() => {
        async function storeData() {
            try {
                const response = await axios.get("https://chatapp-backend-pywd.onrender.com/")
                // const response = await axios.get("http://localhost:8000")
                setData(response.data.message);
            }
            catch (err) {
                console.log(err);
            }
        }
        setTime(new Date().toLocaleTimeString())
        storeData();
        if(scro===true){
            scrollToBottom()
        }
    },[data])
    function handleTop(e){
        e.preventDefault();
        setScro(!scro)
    }
    return (
        <div className={styles.bigbox}>
            <div className={styles.box} id='box'>
                {data.map((ele, ind) =>
                    <div key={ind} className={styles.data}>
                        <div className={styles.icon}>
                            <img src={ele.profile} alt="pho" width="100%" />
                        </div>
                        <div className={styles.txt}>
                            <div className={styles.name}><span>{ele.name}</span> {ele.name===name && ele.email===email ?<button onClick={()=>handleDelete(ele._id)}><i class="fa-solid fa-trash"></i></button>:null}</div>
                            <div className={styles.time}>{ele.time}</div>
                            <div className={styles.chat}>{ele.chat}</div>
                        </div>
                    </div>)}
            </div>
            <div className={styles.scroll} id='scroll' ><button onClick={handleTop}>{scro===true?<span className={styles.up}>⬆</span>:<span className={styles.down}>⬇︎</span>}</button></div>
            <div>
            <form className={styles.inp} onSubmit={handleSend}>
                <input type="chat" value={chat} onChange={handleChange} placeholder='Enter Your Message'/>
                <button onClick={handleSend}>Send</button>
            </form>
            </div>
        </div>
    )
}

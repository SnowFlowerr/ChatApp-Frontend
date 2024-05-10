import React, { useEffect, useState } from 'react'
import styles from "./Chat.module.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import pic from "../asset/data"
import ReactPlayer from 'react-player'

export default function Chat() {
    const [chat, setchat] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [profile, setProfile] = useState("")
    const [pass, setPassword] = useState("")
    const [scro, setScro] = useState(true);
    const [video, setVideo] = useState("");
    const [isvid, setIsvid] = useState(false);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [inpData, setInpData] = useState({ name: "", email: "", pass: "", profile: "" })
    const [data, setData] = useState([{ name: "Bhudeo Krit", profile: profile, chat: "Hi, This is the first message", time: time }])
    const [logo, setLogo] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('inpData') === null) {
            navigate('/')
        }
        else {
            setName(JSON.parse(localStorage.getItem('inpData')).name);
            setProfile(JSON.parse(localStorage.getItem('inpData')).profile);
            setEmail(JSON.parse(localStorage.getItem('inpData')).email);
            setPassword(JSON.parse(localStorage.getItem('inpData')).pass);
            setInpData(JSON.parse(localStorage.getItem('inpData')));
            
        }
    }, [localStorage.getItem("inpData")])
    function handleChange(e) {
        e.preventDefault();
        setchat(e.target.value)

    }

    async function handleSend(e) {
        e.preventDefault();
        if (chat.trim() !== "" || video.trim()!=="") {
            try {
                setchat("")
                setVideo("")
                const res = await axios.post("https://chatapp-backend-pywd.onrender.com/createdata", { name, profile, chat, time, email, video }, { headers: { "Content-Type": "application/json" } });
                // const res = await axios.post("http://localhost:8000/createdata", { name,profile,chat,time,email }, { headers: { "Content-Type": "application/json" } });
                // console.log(res.data)
            }
            catch (err) {
                alert(err.message)
            }
        }
    }

    async function handleDelete(_id) {
        try {
            const res = await axios.post("https://chatapp-backend-pywd.onrender.com/deletedata", { id: _id }, { headers: { "Content-Type": "application/json" } });
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
        if (scro === true) {
            scrollToBottom()
        }
    }, [data])
    function logocol(){
        for(let i=0;i<pic.length;i++){
            document.getElementById(`opt${i}`).style.borderColor="white"
        }
    }
    function handleTop(e) {
        e.preventDefault();
        setScro(!scro)
    }
    function handleLo(ele,ind) {
        setInpData({ ...inpData, ['profile']: ele })
        logocol()
        document.getElementById(`opt${ind}`).style.borderColor="red"
    }
    function handleCha(e) {
        e.preventDefault()
        setInpData({ ...inpData, [e.target.id]: e.target.value })

    }
    function handleSubmit(e) {
        e.preventDefault()
        localStorage.setItem("inpData", JSON.stringify(inpData))
        setLogo(false)
    }
    function handleCancel(e) {
        e.preventDefault()
        setInpData(JSON.parse(localStorage.getItem('inpData')));
        setLogo(false)
    }
    function changeVideo(e){
        e.preventDefault()
        setVideo(e.target.value)
    }
    function handleVideo(e){
        e.preventDefault()
        setIsvid(!isvid);
        if(!isvid){
            document.getElementById('box').style.height="78.4vh"
        }
        else{
            document.getElementById('box').style.height="84.5vh"
        }
    }
    return (
        <div className={styles.bigbox}>
            <div className={styles.change}>
                <div className={styles.titleInfo}>
                    <div>
                        <span className={styles.infoName}>{name}</span>
                        <br />
                        <span className={styles.infoEmail}>{email}</span>
                    </div>
                </div>
                <div className={styles.titleImg}>
                    <img src={profile} alt="pho" onClick={() => setLogo(!logo)} />
                </div>
            </div>
            {logo && (
                <div className={styles.chooseLogo}>
                    {pic.map((ele, ind) =>
                        <div className={styles.choose} onClick={() => handleLo(ele,ind)} key={ind} id={`opt${ind}`}>
                            <img src={ele} alt="" />
                        </div>
                    )}
                    <form action="" onSubmit={handleSubmit}>
                        <div className={styles.inpt}><input type="text" placeholder='Enter Your Name' id='name' onChange={handleCha} value={inpData.name}/></div>
                        <div className={styles.inpt}><input type="email" placeholder='Enter Your Email' id='email' onChange={handleCha} value={inpData.email} /></div>
                        <div className={styles.inpt}><input type="password" placeholder='Enter Your Password' id='pass' onChange={handleCha} value={inpData.pass} /></div>
                        {/* <div className={styles.error}>{err && (err)}</div> */}
                        <div className={styles.inpt}>
                            <button onClick={handleCancel}>Cancel</button>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            )}
            <div className={styles.box} id='box'>
                {data.map((ele, ind) =>
                    // ind>data.length-20?<>
                    <div key={ind} className={styles.data}>
                        <div className={styles.icon}>
                            <img src={ele.profile} alt="pho" width="100%" />
                        </div>
                        <div className={styles.txt}>
                            <div className={styles.name}>
                                <span>{ele.name}</span>
                                {(ele.name === name && ele.email === email) || pass === "uzhizz996x" ? <button onClick={() => handleDelete(ele._id)}><i class="fa-solid fa-trash"></i></button> : null}
                            </div>
                            <div className={styles.time}>{ele.time}</div>
                            {ele.video &&
                            <div className={styles.video}>
                                <ReactPlayer url={ele.video} controls={true} className={styles.player} width="95%" height="13rem" />
                            </div>}
                            <div className={styles.chat}>{ele.chat}</div>
                        </div>
                    </div>
                    // </>:""
                )}
            </div>
            <div className={styles.scroll} id='scroll' ><button onClick={handleTop}>{scro === true ? <span className={styles.up}>⬆</span> : <span className={styles.down}>⬇︎</span>}</button></div>
            <div>
            
                {isvid &&
                    <form className={styles.inp}>
                        <input type="chat" value={video} onChange={changeVideo} placeholder='Enter Your Video Link' />
                    </form>}
                <form className={styles.inp} onSubmit={handleSend}>
                    <input type="chat" value={chat} onChange={handleChange} placeholder='Enter Your Message' />
                    <button onClick={handleVideo} type='reset'><i class="fa-solid fa-video"></i></button>
                    <button onClick={handleSend} type='submit'><i class="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import styles from "./Chat.module.css"
import axios from "axios"
import p1 from "./profile.png"

export default function Chat() {
    const [chat, setchat] = useState("")
    const [data, setData] = useState([{ name: "Bhudeo Krit", icon: "", chat: "Hi, This is the first message" }])
    function handleChange(e) {
        e.preventDefault();
        setchat(e.target.value)
    }
    async function handleSend(e) {
        e.preventDefault();
        if (chat.trim() !== "") {
            try {
                const res = await axios.post("https://chatapp-backend-pywd.onrender.com/createdata", { chat }, { headers: { "Content-Type": "application/json" } });
                setchat("")
                // console.log(res.data)
            }
            catch (err) {
                alert(err.message)
            }
        }
    }
    useEffect(() => {
        async function storeData() {
            try {
                const response = await axios.get("https://chatapp-backend-pywd.onrender.com/")
                setData(response.data.message);

            }
            catch (err) {
                console.log(err);
            }
        }
        storeData();
    },)
    return (
        <div className={styles.bigbox}>
            <div className={styles.box} id='box'>
                {data.map((ele, ind) =>
                    <div key={ind} className={styles.data}>
                        <div className={styles.icon}>
                            <img src={p1} alt="pho" width="100%" />
                        </div>
                        <div className={styles.txt}>
                            <div className={styles.name}>{"name"}</div>
                            <div className={styles.chat}>{ele.chat}</div>
                        </div>
                    </div>)}
                <div id='scr'></div>
            </div>
            <form className={styles.inp} onSubmit={handleSend}>
                <input type="chat" value={chat} onChange={handleChange} />
                <button onClick={handleSend}>Send</button>
            </form>
            <div className={styles.scroll} id='scroll' ><a href="#scr"><button>⬇</button></a></div>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import styles from "./Signin.module.css"
import data from "../asset/data"
import { useNavigate } from 'react-router-dom'

export default function Signin() {
    const [pic, setPic] = useState(data[0])
    const [logo, setLogo] = useState(false)
    const [err, setErr] = useState("")
    const [inpData, setInpData] = useState({ name: "", email: "", pass: "", profile: pic })
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('inpData') !== null) {
            navigate('/chat')
        }
    }, [])

    function handleLogo(e) {
        e.preventDefault()
        setLogo(!logo);
    }
    function handleChange(e) {
        e.preventDefault();
        setInpData({ ...inpData, [e.target.id]: e.target.value })
    }
    function handleLo(ele) {
        setPic(ele)
        setInpData({ ...inpData, ['profile']: ele })
        setLogo(false)
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (inpData.name.trim() === "") {
            setErr("Enter The Name");
            return;
        }
        if (inpData.email.trim() === "") {
            setErr("Enter The Email");
            return;
        }
        if (inpData.pass.trim() === "") {
            setErr("Enter The Password");
            return;
        }
        localStorage.setItem("inpData", JSON.stringify(inpData))
        navigate('/chat')
    }
    return (
        <div className={styles.bigBox}>
            <div className={styles.desig}>
                <div className={styles.logo} onClick={handleLogo}><div className={styles.logo1}>
                    <img src={pic} alt="pho" /></div></div>

                {logo && (
                    <div className={styles.chooseLogo}>
                        {data.map((ele, ind) =>
                            <div className={styles.choose} onClick={() => handleLo(ele)} key={ind}>
                                <img src={ele} alt="" />
                            </div>
                        )}
                    </div>
                )}

                <form action="" onSubmit={handleSubmit}>
                    <div className={styles.inp}><input type="text" placeholder='Enter Your Name' id='name' onChange={handleChange} /></div>
                    <div className={styles.inp}><input type="email" placeholder='Enter Your Email' id='email' onChange={handleChange} /></div>
                    <div className={styles.inp}><input type="password" placeholder='Enter Your Password' id='pass' onChange={handleChange} /></div>
                    <div className={styles.error}>{err && (err)}</div>
                    <div className={styles.inp}><button onClick={handleSubmit}>Submit</button></div>
                </form>
                <div className={styles.signup}>
                    Don't Have an Account ? <a href="/">Sign Up</a>
                </div>
            </div>
        </div>
    )
}

import axios from "axios"
import {useState} from "react"
import {useNavigate,Link} from "react-router-dom"

export default function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const nav = useNavigate()

const login = async()=>{
const res = await axios.post("http://3.110.195.134:5000/auth/login",{email,password})
localStorage.setItem("token",res.data.token)
nav("/")
}

return(
<div className="auth">

<h2>Login</h2>

<input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
<input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>

<button onClick={login}>Login</button>

<p>New user? <Link to="/signup">Signup</Link></p>

</div>
)
}
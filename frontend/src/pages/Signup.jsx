import axios from "axios"
import {useState} from "react"
import {useNavigate,Link} from "react-router-dom"

export default function Signup(){

const [username,setUsername]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const nav = useNavigate()

const signup = async()=>{
await axios.post("http://3.110.195.134:5000/auth/signup",{username,email,password})
nav("/login")
}

return(
<div className="auth">

<h2>Signup</h2>

<input placeholder="Username" onChange={e=>setUsername(e.target.value)}/>
<input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
<input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>

<button onClick={signup}>Signup</button>

<p>Already user? <Link to="/login">Login</Link></p>

</div>
)
}
import {Link,useNavigate} from "react-router-dom"

export default function Navbar(){

const nav = useNavigate()

const logout = ()=>{
localStorage.removeItem("token")
nav("/login")
}

return(
<div className="nav">

<h2>🎬 MovieRec</h2>

<div>
<Link to="/recommend">Recommend</Link>
<Link to="/">Home</Link>
<Link to="/mylist">My List</Link>
<button onClick={logout} style={{marginRight:"40px"}}>
Logout
</button>
</div>

</div>
)
}
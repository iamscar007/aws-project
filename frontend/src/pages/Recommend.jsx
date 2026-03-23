import axios from "axios"
import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"

export default function Recommend(){

const [movies,setMovies]=useState([])
const [loading,setLoading]=useState(true)
const nav = useNavigate()

useEffect(()=>{
loadMovies()
},[])

const loadMovies = async ()=>{
try{

const res = await axios.get(
"http://3.110.195.134:5000/user/recommend-genre",
{
headers:{ token: localStorage.getItem("token") }
}
)

console.log("API DATA:", res.data)

// ⭐ remove invalid movies
const clean = res.data.filter(m => m && m.Poster && m.imdbID)

// ⭐ remove duplicates
const unique = Array.from(
new Map(clean.map(m => [m.imdbID, m])).values()
)

setMovies(unique)

}catch(err){
console.log(err)
}

setLoading(false)
}

return(
<div style={{
background:"#111",
minHeight:"100vh",
color:"white",
paddingTop:"150px",
paddingLeft:"40px",
paddingRight:"40px"
}}>

<h1 style={{marginBottom:"20px"}}>
⭐ Recommended For You
</h1>

{loading ? (
<h2 style={{color:"gray"}}>Loading recommendations...</h2>
) : movies.length === 0 ? (
<h2 style={{color:"gray"}}>
No recommendations yet — add more movies to MyList
</h2>
) : (

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",
gap:"25px"
}}>

{movies.map((m)=>(
<div key={m.imdbID}
style={{
cursor:"pointer",
transition:"0.3s"
}}
onClick={()=>nav(`/detail/${m.imdbID}`)}
onMouseEnter={e=>e.currentTarget.style.transform="scale(1.08)"}
onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
>

<img
src={m.Poster}
style={{
width:"100%",
height:"260px",
objectFit:"cover",
borderRadius:"8px"
}}
/>

<p style={{marginTop:"8px"}}>
{m.Title}
</p>

</div>
))}

</div>

)}

</div>
)
}
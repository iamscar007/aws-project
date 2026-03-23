import axios from "axios"
import {useEffect,useState} from "react"
import {useParams} from "react-router-dom"

export default function Detail(){

const {id}=useParams()
const [movie,setMovie]=useState({})
const [showTrailer,setShowTrailer]=useState(false)
const addToList = async () => {
try{
await axios.post(
"http://3.110.195.134:5000/user/add",
{ movie },
{
headers:{
token: localStorage.getItem("token")
}
}
)
alert("Movie Added To My List ✅")
}catch(err){
alert("Error adding movie")
}
}

const openTrailer = () => {
const query = encodeURIComponent(movie.Title + " official trailer")
window.open(`https://www.youtube.com/results?search_query=${query}`)
}

useEffect(()=>{
axios.get(`http://3.110.195.134:5000/movies/movie/${id}`)
.then(res=>setMovie(res.data))
},[id])

return(
<div style={{
background:"#111",
minHeight:"100vh",
color:"white",
paddingTop:"140px",
paddingLeft:"40px",
paddingRight:"40px",
paddingBottom:"40px"
}}>

<div style={{
display:"flex",
gap:"50px",
maxWidth:"1200px",
margin:"auto",
alignItems:"flex-start"
}}>

<img 
src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
style={{
width:"320px",
borderRadius:"12px",
boxShadow:"0 0 20px rgba(0,0,0,0.8)"
}}
/>

<div style={{flex:1}}>

<h1 style={{fontSize:"42px"}}>{movie.Title}</h1>

<p style={{color:"#aaa"}}>
{movie.Year} • {movie.Genre} • ⭐ {movie.imdbRating}
</p>

<p style={{lineHeight:"1.7",fontSize:"17px"}}>
{movie.Plot}
</p>

<button 
onClick={openTrailer}
style={{
marginTop:"20px",
background:"#e50914",
border:"none",
padding:"12px 25px",
fontSize:"16px",
color:"white",
cursor:"pointer",
borderRadius:"6px"
}}
>
▶ Watch Trailer
</button>

<button
onClick={addToList}
style={{
marginTop:"10px",
marginLeft:"15px",
background:"#16a34a",
border:"none",
padding:"12px 25px",
fontSize:"16px",
color:"white",
cursor:"pointer",
borderRadius:"6px"
}}
>
＋ Add To My List
</button>

</div>

</div>

{/* ⭐ Trailer Modal */}
{showTrailer && (
<div style={{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.95)",
display:"flex",
alignItems:"center",
justifyContent:"center",
zIndex:9999
}}>

<div style={{position:"relative"}}>

<button 
onClick={()=>setShowTrailer(false)}
style={{
position:"absolute",
top:"-40px",
right:0,
background:"red",
border:"none",
color:"white",
padding:"8px 15px",
cursor:"pointer"
}}
>
✖
</button>

<iframe
width="900"
height="500"
src={`https://www.youtube.com/embed?autoplay=1&listType=search&list=${movie.Title} official trailer`}
title="Trailer"
allowFullScreen
/>

</div>

</div>
)}

</div>
)
}
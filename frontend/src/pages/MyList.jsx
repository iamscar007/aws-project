import axios from "axios"
import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"

export default function MyList(){

const [list,setList]=useState([])
const nav = useNavigate()

useEffect(()=>{
loadList()
},[])

const loadList = async ()=>{
try{
const res = await axios.get(
"http://3.110.195.134:5000/user/mylist",
{
headers:{ token: localStorage.getItem("token") }
}
)
setList(res.data)
}catch(err){
console.log(err)
}
}

const removeMovie = async (item)=>{
try{
await axios.post(
"http://3.110.195.134:5000/user/remove",
{
movie:{
imdbID: item.movie?.imdbID
}
},
{
headers:{ token: localStorage.getItem("token") }
}
)
loadList()
}catch(err){
console.log(err)
}
}

const updateStatus = async (item,status)=>{
try{
await axios.post(
"http://3.110.195.134:5000/user/status",
{
movie:{
imdbID: item.movie?.imdbID
},
status
},
{
headers:{ token: localStorage.getItem("token") }
}
)
loadList()
}catch(err){
console.log(err)
}
}

const renderSection = (title,status)=>(
<div className="my-section">

<h2>{title}</h2>

<div className="mylist-grid">

{list
.filter(item => (item.status || "plan") === status)
.map((item,i)=>(
<div className="mylist-card" key={i}>

<img
src={item.movie?.Poster}
onClick={()=>nav(`/detail/${item.movie?.imdbID}`)}
/>

<div className="mylist-info">

<h4>{item.movie?.Title}</h4>

<select
value={item.status || "plan"}
onChange={(e)=>updateStatus(item,e.target.value)}
>
<option value="plan">Plan</option>
<option value="watching">Watching</option>
<option value="watched">Watched</option>
<option value="dropped">Dropped</option>
</select>

<button onClick={()=>removeMovie(item)}>
Remove
</button>

</div>

</div>
))}

</div>

</div>
)

return(
<div className="mylist-page" style={{paddingTop:"160px"}}>

<h1>My Movie List</h1>

{list.length === 0 ? (
<div className="empty">
<p>No Movies Added Yet 🍿</p>
</div>
) : (
<>
{renderSection("📌 Plan to Watch","plan")}
{renderSection("👀 Watching","watching")}
{renderSection("✅ Watched","watched")}
{renderSection("❌ Dropped","dropped")}
</>
)}

</div>
)
}
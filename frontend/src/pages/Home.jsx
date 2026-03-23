import axios from "axios"
import {useEffect,useState} from "react"
import MovieCard from "../components/MovieCard"
import Navbar from "../components/Navbar"

export default function Home(){

const [trending,setTrending]=useState([])
const [scifi,setScifi]=useState([])
const [horror,setHorror]=useState([])
const [romance,setRomance]=useState([])
const [comedy,setComedy]=useState([])
const [name,setName]=useState("")
const [searchMovies,setSearchMovies]=useState([])

useEffect(()=>{
loadAllMovies()
},[])

const loadAllMovies = async()=>{
const t = await axios.get("http://3.110.195.134:5000/movies/search/avengers")
setTrending(t.data)

const s = await axios.get("http://3.110.195.134:5000/movies/search/star")
setScifi(s.data)

const h = await axios.get("http://3.110.195.134:5000/movies/search/conjuring")
setHorror(h.data)

const r = await axios.get("http://3.110.195.134:5000/movies/search/love")
setRomance(r.data)

const c = await axios.get("http://3.110.195.134:5000/movies/search/funny")
setComedy(c.data)
}

const search = async()=>{
const res = await axios.get(`http://3.110.195.134:5000/movies/search/${name}`)
setSearchMovies(res.data)
}

return(
<div>

{/* ⭐ NAVBAR */}
<Navbar/>

{/* ⭐ CONTENT BELOW NAVBAR */}
<div style={{marginTop:"80px"}}>

<div className="search">
<input placeholder="Search movies..." onChange={e=>setName(e.target.value)}/>
<button onClick={search}>Search</button>
</div>

{/* SEARCH RESULT ROW */}
{searchMovies.length>0 && (
<div className="row">
<h2>Search Results</h2>
<div className="row-posters">
{searchMovies.map(m=>(
<MovieCard key={m.imdbID} movie={m}/>
))}
</div>
</div>
)}

{/* TRENDING */}
<div className="row">
<h2>🔥 Trending</h2>
<div className="row-posters">
{trending.map(m=>(
<MovieCard key={m.imdbID} movie={m}/>
))}
</div>
</div>

{/* SCIFI */}
<div className="row">
<h2>🚀 Sci-Fi</h2>
<div className="row-posters">
{scifi.map(m=>(
<MovieCard key={m.imdbID} movie={m}/>
))}
</div>
</div>

{/* HORROR */}
<div className="row">
<h2>👻 Horror</h2>
<div className="row-posters">
{horror.map(m=>(
<MovieCard key={m.imdbID} movie={m}/>
))}
</div>
</div>

{/* ROMANCE */}
<div className="row">
<h2>❤️ Romance</h2>
<div className="row-posters">
{romance.map(m=>(
<MovieCard key={m.imdbID} movie={m}/>
))}
</div>
</div>

{/* COMEDY */}
<div className="row">
<h2>😂 Comedy</h2>
<div className="row-posters">
{comedy.map(m=>(
<MovieCard key={m.imdbID} movie={m}/>
))}
</div>
</div>

</div>
</div>
)
}
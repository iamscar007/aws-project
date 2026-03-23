import {useNavigate} from "react-router-dom"

export default function MovieCard({movie}){

const nav = useNavigate()

return(
<div className="card">

<img 
src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} 
onClick={()=>nav(`/detail/${movie.imdbID}`)}
/>

<div className="card-info">

<h4>{movie.Title}</h4>

<p>{movie.Year} • {movie.Type}</p>

<button onClick={()=>nav(`/detail/${movie.imdbID}`)}>
View Details
</button>

</div>

</div>
)
}
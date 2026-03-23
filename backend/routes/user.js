const router = require("express").Router()
const User = require("../models/User")
const auth = require("../middleware/authMiddleware")

router.post("/add", auth, async (req,res)=>{
const user = await User.findById(req.user)

user.myList.push({
movie:req.body.movie,
status:"plan"
})

await user.save()

res.json("Added")
})

router.get("/mylist",auth, async(req,res)=>{
const user = await User.findById(req.user)
res.json(user.myList)
})

router.post("/remove", auth, async (req,res)=>{
try{

const user = await User.findById(req.user)

const removeID = req.body.movie.imdbID

console.log("REMOVE ID:", removeID)

user.myList = user.myList.filter(item => {

const storedID =
item.movie?.imdbID ||
item.imdbID ||
item.movie?._id?.toString()

console.log("STORED:", storedID)

return String(storedID) !== String(removeID)

})

await user.save()

res.json("Removed")

}catch(err){
console.log(err)
res.status(500).json("Error")
}
})

router.post("/status", auth, async (req,res)=>{
const user = await User.findById(req.user)

user.myList = user.myList.map(item => {

const id = item.movie?.imdbID || item.imdbID

if(id === req.body.movie.imdbID){

// ⭐ convert old structure to new
if(!item.movie){
item = {
movie:item,
status:req.body.status
}
}else{
item.status = req.body.status
}

}

return item
})

await user.save()

res.json("Updated")
})

router.get("/recommend", auth, async (req,res)=>{
try{

const user = await User.findById(req.user)

let genreCount = {}

user.myList.forEach(item => {

const movie = item.movie || item

if(movie.Genre){
movie.Genre.split(",").forEach(g=>{
g = g.trim()
genreCount[g] = (genreCount[g] || 0) + 1
})
}

})

const topGenres = Object.keys(genreCount)
.sort((a,b)=>genreCount[b]-genreCount[a])
.slice(0,2)

res.json(topGenres)

}catch(err){
console.log(err)
res.status(500).json("Error")
}
})

const axios = require("axios")

router.get("/recommend-genre", auth, async (req,res)=>{
try{

const user = await User.findById(req.user)

let genres = new Set()

// ⭐ collect genres from user's list
user.myList.forEach(item=>{
const movie = item.movie || item

if(movie.Genre){
movie.Genre.split(",").forEach(g=>{
genres.add(g.trim())
})
}
})

const genreArray = [...genres]

// ⭐ seed popular movie titles to search from OMDB
const seeds = [
"Avengers","Batman","Matrix","Star","Mission",
"Fast","Love","War","King","Spider","Dark"
]

let recommendations = []

for(let seed of seeds){

const r = await axios.get(
`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${seed}`
)

if(r.data.Search){

for(let m of r.data.Search){

const detail = await axios.get(
`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${m.imdbID}`
)

if(detail.data.Genre){

const movieGenres = detail.data.Genre.split(",").map(g=>g.trim())

// ⭐ check if any genre matches user genres
const match = movieGenres.some(g=>genreArray.includes(g))

if(match){
recommendations.push(detail.data)
}

}

}

}

}


res.json(recommendations.slice(0,20))

}catch(err){
console.log(err)
res.status(500).json("Error")
}
}

)

module.exports = router
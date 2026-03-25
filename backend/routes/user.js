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

router.get("/recommend-genre", auth, async (req, res) => {
  try {

    const user = await User.findById(req.user)

    if (!user || user.myList.length === 0) {
      return res.json([])
    }

    let genreCount = {}

    // ⭐ count genres from user list
    user.myList.forEach(item => {

      const movie = item.movie || item

      if (movie.Genre) {
        movie.Genre.split(",").forEach(g => {
          g = g.trim()
          genreCount[g] = (genreCount[g] || 0) + 1
        })
      }

    })

    // ⭐ get top 4 genres
    const topGenres = Object.keys(genreCount)
      .sort((a, b) => genreCount[b] - genreCount[a])
      .slice(0, 4)

    if (topGenres.length === 0) {
      return res.json([])
    }

    console.log("TOP GENRES:", topGenres)

    // ⭐ PARALLEL CALLS (VERY FAST)
    const requests = topGenres.map(g =>
      axios.get(
        `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${g}&page=${Math.floor(Math.random()*3)+1}`
      )
    )

    const responses = await Promise.all(requests)

    let movies = responses.flatMap(
      r => r.data.Search || []
    )

    // ⭐ remove movies already in mylist
    const myIDs = new Set(
      user.myList.map(i =>
        (i.movie?.imdbID || i.imdbID)
      )
    )

    movies = movies.filter(
      m => m.Poster !== "N/A" && !myIDs.has(m.imdbID)
    )

    // ⭐ remove duplicates
    movies = Array.from(
      new Map(movies.map(m => [m.imdbID, m])).values()
    )

    // ⭐ RANDOMIZE RESULTS (important)
    movies = movies.sort(() => 0.5 - Math.random())

    // ⭐ limit results
    movies = movies.slice(0, 20)

    res.json(movies)

  } catch (err) {
    console.log(err)
    res.status(500).json("Recommendation error")
  }
})

module.exports = router
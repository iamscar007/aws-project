const router = require("express").Router()
const axios = require("axios")

// ⭐ SEARCH MOVIES
router.get("/search/:name", async (req,res)=>{
try{

console.log("OMDB KEY:", process.env.OMDB_KEY)

const r = await axios.get(
`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${req.params.name}`
)

if(r.data.Response === "False"){
return res.json([])
}

res.json(r.data.Search)

}catch(err){
console.log("SEARCH ERROR:", err.message)
res.status(500).json([])
}
})


// ⭐ MOVIE DETAIL
router.get("/movie/:id", async (req,res)=>{
try{

const r = await axios.get(
`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${req.params.id}`
)

res.json(r.data)

}catch(err){
console.log("DETAIL ERROR:", err.message)
res.status(500).json({})
}
})

module.exports = router
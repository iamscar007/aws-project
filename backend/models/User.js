const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    myList:[
{
movie:Object,
status:String   // watching | watched | dropped | plan
}
]
})



module.exports = mongoose.model("User",userSchema)
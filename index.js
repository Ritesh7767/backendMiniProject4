const express = require("express")
const User = require("./models/userSchema")
const Post = require("./models/postSchema")
const connectDB = require("./db/connectDB")

const app = express()

connectDB()

app.get('/',(req, res) => {
    res.send("home page")
})

app.get('/user', async (req, res) => {
    const user = {
        username : "nitesh7767",
        email : "nitesh7767@gmail.com",
    }

    const createdUser = await User.create(user)
    res.send(createdUser)
})

app.get('/read', async (req, res) => {
    let users = await User.find()
    res.send(users)
})

app.get('/product', async (req, res) => {

    let user = await User.findOne({username : "Ritesh77678"})
    if(user){
        let product = {
            title : "watch",
            user : user._id
        }

        let postProduct = await Post.create(product)
        user.post.push(postProduct._id)
        await user.save()
        res.send(postProduct)
    }
    else{
        res.send("Login first")
    }
})

app.get('/readProduct', async (req, res) => {
    let result = await Post.find()
    res.send(result)
})


app.listen(3000)
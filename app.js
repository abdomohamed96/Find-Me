const express=require("express")
const app= express()
const PORT=3000
app.use(express.json());



async function start(){
    try {
        app.listen(PORT,()=>console.log(`Hello, I'm Find Me server ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start();
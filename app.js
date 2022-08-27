const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
const Cors=require("cors")
const {courseModel}=require("./courseModel")
const path=require('path')
const app=Express()

app.use(Cors())
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use(express.static('./dist/course-app'))
Mongoose.connect("mongodb+srv://purna_mongo:saraspurna1@cluster0.rgyni.mongodb.net/coursedata?retryWrites=true&w=majority")

//app.get("/api/",(req,res)=>{res.send("Hello User")})
app.post("/api/addcourse",async(req,res)=>{
    const data=req.body
    const ob=new courseModel(data)
    ob.save(
        (error,data)=>{
            if(error){
                res.send("Error occured")
            }
            else{
                res.send(data)
            }
        }
    )
    })
app.get("/api/viewcourse",async(req,res)=>{
    courseModel.find(
        (error,data)=>{
            if(error){res.send(error)}
            else{res.send(data)}
        }
    )
   })
//app.get("/searchcourse",(req,res)=>{res.send("You can search for a course here")})
//app.get("/updatecourse",(req,res)=>(res.send("Update a course")))
//app.get("/deletecourse",(req,res)=>{res.send("Delete a course")})

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/course-app/index.html'))
})

app.listen(process.env.PORT||2000,()=>{console.log("Server running at port:2000")})
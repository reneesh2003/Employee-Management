const express = require("express")
const {SignUpModel,EmployeeModel} = require("./mongo.js")
const multer = require('multer')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.get('/',cors(),(req,res)=>{
})

app.post("/signin",async(req,res)=>{
    const{username,password}=req.body
    try{
        const check = await SignUpModel.findOne({username:username,password:password})
        console.log(check)
        if(check){
            console.log("Login Successful")
            res.json(check)
        }
        else{
            res.json("UserNotExist")
        }
    }
    catch(e){
        console.log(e)
    }
})

app.post("/signup",async(req,res)=>{
    const{username,email,password}=req.body
    const data= new SignUpModel({
        username:username,
        email:email,
        password:password
    })
    console.log(data)
    try{
        const check = await SignUpModel.findOne({email:email})
        if(check){
            console.log("Already Exists")
            res.json("UserExist")
        }
        else{
            console.log("User Added")
            SignUpModel.insertMany(data)
            res.json("UserAdded")
        }
    }
    catch(e){
        console.log(e)
    }
})

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post("/createemployee",upload.single('img'),async(req,res)=>{
    const{name,email,mobileNo,designation,gender,courses}=req.body
    const img = req.file;
    const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; // Month starts from 0
const year = today.getFullYear();

    const data= new EmployeeModel({
        name:name,
        email:email,
        mobileNo:mobileNo,
        designation:designation,
        gender:gender,
        course:courses,
        createDate:day+'/'+month+'/'+year,
        img: img.buffer
    })
    console.log(data)
    try{
        const check = await EmployeeModel.findOne({email:email})
        if(check){
            console.log("Already Exists")
            res.json("EmployeeExist")
        }
        else{
            console.log("Employee Added")
            EmployeeModel.insertMany(data)
            res.json("EmployeeAdded")
        }
    }
    catch(e){
        console.log(e)
    }
})

app.get("/employees",async(req,res)=>{
    try{
    const employees = await EmployeeModel.find({})
    console.log(employees)

    modifiedEmployees = employees.map(employee => {
        // Convert base64-encoded image to string
        try{
            const imgString = employee.img.toString('base64')
            return {
                ...employee.toObject(), 
                img: imgString
            };
        }
        catch(e){
            console.log(e.message)
        }

    });
       res.json(modifiedEmployees)
    }
    catch(e){
        res.json(e.message)
    }
})

app.put("/updateemployee", upload.single('img'), async (req, res) => {
    const { name, email, mobileNo, designation, gender, courses,createDate,image} = req.body;
    
    try {
        const existingEmployee = await EmployeeModel.findOne({ email: email });
        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        existingEmployee.name = name;
        existingEmployee.mobileNo = mobileNo;
        existingEmployee.designation = designation;
        existingEmployee.gender = gender;
        existingEmployee.course = courses;
        existingEmployee.createDate=createDate
        if (req.file) {
            const { buffer } = req.file;
            existingEmployee.img = buffer;
        }

        await existingEmployee.save();
        console.log("Employee Updated");
        res.json("EmployeeUpdated");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/deleteemployee", async (req, res) => {
    const {email} = req.body;
    try {
        const existingEmployee = await EmployeeModel.findOne({ email: email });
        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        await EmployeeModel.deleteOne({ email: email })
        
        console.log("Employee Deleted");
        res.json("EmployeeDeleted");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.listen(8000,()=>{
    console.log("port connected")
})
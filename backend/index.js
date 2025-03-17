/*const express = require("express")
const mongoose = require('mongoose')
const cors=require("cors")
const EmployeeModel=require('./models/Employee')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://dilip5050505:q7oC07Q8VQo6LCcn@cluster0.xnq5z.mongodb.net/votingsystem")

app.post("/login",(req,res)=>{
    const{email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(user =>{
        if(user){
        if(user.password === password){
            res.json("success")
         } else {
                res.json("the password is incorrect")
         }
         } else {
            res.json(" No record existed")
         }
    })
})

app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employee=>res.json(employee))
    .catch(err=>res.json(err))
})

app.post("/verify-face", async (req, res) => {
    const { email, faceData } = req.body;
    const user = await EmployeeModel.findOne({ email });
    
    if (!user) return res.status(404).json("User not found");
    
    const distance = calculateFaceDistance(user.faceData, faceData);
    const isMatch = distance < 0.6; // Threshold (adjust as needed)
    
    isMatch ? res.json("Success") : res.status(401).json("Face mismatch");
  });
  
  // Helper function to compare face descriptors
  function calculateFaceDistance(descriptor1, descriptor2) {
    return Math.sqrt(
      descriptor1.reduce((sum, val, i) => sum + Math.pow(val - descriptor2[i], 2), 0)
    );
  }

app.listen(3001,()=>{

    console.log("server is running")
})*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://dilip5050505:q7oC07Q8VQo6LCcn@cluster0.xnq5z.mongodb.net/votingsystem");

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("the password is incorrect");
        }
      } else {
        res.json("No record existed");
      }
    });
});

// Register route
app.post("/register", (req, res) => {
  const { name, email, password, image } = req.body;

  // Save the image to a temporary file
  const imagePath = `./temp/${Date.now()}.jpg`;
  const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
  fs.writeFileSync(imagePath, base64Data, "base64");

  // Call Python script to extract face data
  exec(`scripts/face_recognition.py ${imagePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json("Internal server error");
    }

    const faceData = JSON.parse(stdout);

    // Save user data to MongoDB
    EmployeeModel.create({ name, email, password, faceData })
      .then(employee => res.json(employee))
      .catch(err => res.json(err));
  });
});

// Verify face route
app.post("/verify-face", async (req, res) => {
  const { email, image } = req.body;

  // Save the image to a temporary file
  const imagePath = `./temp/${Date.now()}.jpg`;
  const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
  fs.writeFileSync(imagePath, base64Data, "base64");

  // Fetch user's face data from MongoDB
  const user = await EmployeeModel.findOne({ email });
  if (!user) return res.status(404).json("User not found");

  // Call Python script to compare faces
  exec(`python scripts/face_comparison.py ${imagePath} ${JSON.stringify(user.faceData)}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json("Internal server error");
    }

    const isMatch = stdout.trim() === "True";
    isMatch ? res.json("Success") : res.status(401).json("Face mismatch");
  });
});

app.listen(3001, () => {
  console.log("Server is running");
});*/
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const faceRoutes = require("./routes/faceRoute");

const app = express();
app.use(express.json({ limit: "10mb" })); // Handle large base64 payloads
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://dilip5050505:q7oC07Q8VQo6LCcn@cluster0.xnq5z.mongodb.net/votingsystem");

// Use routes
app.use("/auth", authRoutes); // Routes for login and registration
app.use("/face", faceRoutes); // Routes for face authentication

app.listen(3001, () => console.log("Server running on 3001"));
const express = require("express");
const mongoose=require("mongoose")
const Student = mongoose.model("Student");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signupAdmin", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    Student.findOne({ email: email }).then((savedStudent) => {
      if (savedStudent) {
        return res.status(422).json({ error: "Student already exist" });
      }
    });

    const student = new Student({
      email,
      password
    });
    // const token=await Student.generateAuthTokenStudent()

    // res.cookie("jwt",token,{
    //    expires:new Date(Date.now()+3000000),
    //    httpOnly:true
    // })
    await student.save();
  } catch (e) {
    console.log(e);
    res.status(400).send("Invalid Details");
  }
});

router.post("/signinAdmin",async(req,res)=>{
    try {
        const {
          email,
          password
        } = req.body;
        const id=await Student.findOne({email:email});
        const token=await id.generateAuthTokenStudent()
       res.cookie("jwt",token,{
        expires:new Date(Date.now()+3000000),
        httpOnly:true
     })
        const isMatch=await bcrypt.compare(password,id.password)
        if(isMatch){
            res.status(201).redirect("/index")
           }
           else{
            res.send("Invalid login details")
           }
      } catch (e) {
        res.status(400).send("Invalid Details");
      }
})
module.exports=router;

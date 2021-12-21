const express = require('express');
const router = express.Router();

const User = require('./../models/User');

const bcrypt = require('bcrypt');

//signup

router.post('/register',(req, res)=>{
    let {firstname, lastname, email, password}= req.body ;
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    password = password.trim();

        if(firstname == "" || lastname == "" || email == "" || password == ""){
            res.json({
                status:"FAILED",
                message: "Empty input fields!"
            })
        }else if(!/^[a-zA-Z ]*$/.test(firstname)){
            res.json({
                status:"FAILED",
                message: "Invalid firstname entered"
            })

        }else if(!/^[a-zA-Z ]*$/.test(lastname)){
            res.json({
                status:"FAILED",
                message: "Invalid lastname entered"
            })

        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            res.json({
                status:"FAILED",
                message: "Invalid email entered"
            })

        }else if(password.length < 8){
            res.json({
                status:"FAILED",
                message: "Password is too short!"
            })

        }else {
            User.find({email}).then(result=>{
                if(result.length){
                    res.json({
                        status:"FAILED",
                        message: "Email user exists"
                    })
                }else{
                    const saltRounds = 10 ;
                    bcrypt.hash(password, saltRounds).then(hashePassword =>{
                        const newUser = new User({
                            firstname,lastname,email,password: hashePassword
                        });

                        newUser.save().then(result=>{
                       
                            res.json({
                                status:"SUCCESS",
                                message: "Signup successful ",
                                data: result 
                            })
                        }).catch(err=>{
                            console.log(err);
                            res.json({
                                status:"FAILED",
                                message: "error  saving user account! "
                            })
                        })

                    }).catch(err=>{
                       
                        res.json({
                            status:"FAILED",
                            message: "error hashing password! "
                        })
                    })

                }
            }).catch(err=>{
                console.log(err);
                res.json({
                    status:"FAILED",
                    message: "error cheking for existing user! "
                })
            })
        }

})

//signin

router.post('/singin',(req, res)=>{
    let { email, password}= req.body ;
    email = email.trim();
    password = password.trim();
    if( email == "" || password == ""){
        res.json({
            status:"FAILED",
            message: "Empty input fields!"
        })
    }else {
        User.find({email})
        .then(data=>{
            if(data.length){
                const hashePassword = data[0].password;
                bcrypt.compare(password, hashePassword).then(result=>{
                    if(result){
                        res.json({
                            status:"SUCCESS",
                            message: "Signin successful ",
                            data: data
                        })
                    }else {
                        res.json({
                            status:"FAILED",
                            message: "Invalid password! "
                        })
                    }
                }).catch(err=>{
                    res.json({
                        status:"FAILED",
                        message: "error comparing passwords "
                    })
                })
            }else {
                res.json({
                    status:"FAILED",
                    message: "Invalid credentials "
                })
            }
        }).catch(err=>{
            res.json({
                status:"FAILED",
                message: "error for checking for exising user "
            })
        })
    }
})

module.exports = router ;

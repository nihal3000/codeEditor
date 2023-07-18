const express = require('express')
const app = express()
const bodyP = require('body-parser')
const compiler = require('compilex')
const options = {stats : true}
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.13", express.static("C:/Users/hp/Desktop/code_editor/codemirror-5.65.13"))
app.get("/", function(req,res){
    res.sendFile("C:/Users/hp/Desktop/code_editor/index.html")
})

app.post("/compile", function(req, res){
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    try{
        
        if(lang = "C++"){
            if(!input){


                //if windows  
                var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
                //else
                // var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
            res.send(data)
        }
        else{
            res.send({output : "error"})
        };
                    //data.error = error message 
                    //data.output = output value
                });

             }
             else{
                var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
                //else
                // var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
            res.send(data)
        }
        else{
            res.send({output : "error"})
        };
                });
             }
        
    
    //res is the response object
        }
        else if(lang = "Java"){
            if(!input){
                var envData = { OS : "windows"}; 
                //else
                // var envData = { OS : "linux" }; // (Support for Linux in Next version)
                compiler.compileJava( envData , code , function(data){
                    if(data.output){
            res.send(data)
        }
        else{
            res.send({output : "error"})
        };
                });    
            }
            else{
                var envData = { OS : "windows"}; 
                //else
                // var envData = { OS : "linux" }; // (Support for Linux in Next version)
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    if(data.output){
            res.send(data)
        }
        else{
            res.send({output : "error"})
        };
                });
            }
        }
        else{
            if(!input){
                var envData = { OS : "windows"}; 
                //else
                // var envData = { OS : "linux" }; 
                compiler.compilePython( envData , code , function(data){
                    if(data.output){
            res.send(data)
        }
        else{
            res.send({output : "error"})
        };
                });    
            }
            else{
                var envData = { OS : "windows"}; 
                //  var envData = { OS : "linux" }; 
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if(data.output){
            res.send(data)
        }
        else{
            res.send({output : "error"})
        };        
                });
            }

        }
    }
    catch(e){
        console.log("error")
    }

})

app.listen(6500)
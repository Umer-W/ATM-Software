const { json } = require("body-parser");
const express = require("express")
const hbs=require("hbs")
const path=require("path")
const port=5000;
require("./db/connection")
const Account=require("./model/ATM")
const app = new express();

const staticPath=path.join(__dirname,"../public")
app.use(express.static(staticPath))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const templatePath=path.join(__dirname,"../templates/views")
app.set("views",templatePath)

const partialsPath=path.join(__dirname,"../templates/partials")
app.set("view engine","hbs")
hbs.registerPartials(partialsPath)

app.get("/",(req,res)=>{

    res.render("index")

})
app.get("/Login",(req,res)=>{

    res.render("Login")
    
})
// ===================================================================================================================================
// ============================================================  Login Account  =====================================================
// ===================================================================================================================================

app.post("/Account",async(req,res)=>{
    try{
        const email=req.body.email;
        const accountnumber=req.body.accountnumber;

        const result=await Account.findOne({$and:[{email:email},{accountnumber:accountnumber}]})
        
        
        
        if(result!=null){
            res.render("Account",{
                name:result.name,
                email:result.email,
                phone:result.phone,
                password:result.password,
                balance:result.balance,
                naaam:result.name
            
            })

        }
        else{
            res.render("Login",{notee:"Your email or password is incorrect"})
        }
    }
    catch(err){
        console.log(err)
        res.status(404).render("404")
    }
    
})
// ===================================================================================================================================
// ============================================================  Deposit Money  =====================================================
// ===================================================================================================================================

app.post("/Deposit",async(req,res)=>{
    var AccountNumber;
    try{
        AccountNumber=req.body.accountNumber
        const newBalance=req.body.money;
        console.log(newBalance)
        console.log(AccountNumber)

      
        
       

        const UpdateAccount = async(accountnumber)=>{
            try{

                const updateAccount=await Account.updateOne({accountnumber},{
                    $inc:{
                        balance:newBalance
        
                    }
        
                });
                console.log(updateAccount)
            }
            catch(err){
                console.log(err)
            }
        }
        
        UpdateAccount(AccountNumber);
        
       
   

    }
    catch(err){
        console.log(err);
        res.status(404).render("404")
    }
    const result=await Account.findOne({accountnumber:AccountNumber})
       
            res.render("Account",{
            name:result.name,
            email:result.email,
            phone:result.phone,
            password:result.password,
            balance:result.balance,
            naaam:result.name
            })

})
// ===================================================================================================================================
// ============================================================  Transfer Money  =====================================================
// ===================================================================================================================================

app.post("/Transfer",async(req,res)=>{
    try{
        const AccountNumber=req.body.accountNumber
        const recipientNumber=req.body.recipientNumber
        const newBalance=req.body.money;
        console.log(newBalance)
        console.log(AccountNumber)
        console.log(recipientNumber)

      
        
       

        const UpdateAccount = async(accountnumber,recipientnumber)=>{
            try{

                const updateAccount=await Account.updateOne({accountnumber},{
                    $inc:{
                        balance:-newBalance
        
                    }
        
                });

                const updateRecipient=await Account.updateOne({accountnumber:recipientnumber},{
                    $inc:{
                        balance:newBalance
        
                    }
        
                });

                console.log(updateRecipient)
                console.log(updateAccount)
            }
            catch(err){
                console.log(err)
            }
        }
        
        UpdateAccount(AccountNumber,recipientNumber);
        
       if(UpdateAccount!=null){
        const result2=await Account.findOne({accountnumber:AccountNumber})
       
        res.render("Account",{
            name:result2.name,
            email:result2.email,
            phone:result2.phone,
            password:result2.password,
            balance:result2.balance,
            naaam:result2.name
        
        })
 
       }else{
        res.render("Account")
       }
       
     

    }
    catch(err){
        console.log(err);
        res.status(404).render("404")
    }

 
})
// ===================================================================================================================================
// ============================================================  Withdraw Money  =====================================================
// ===================================================================================================================================

app.post("/Withdraw",async(req,res)=>{
    var AccountNumber;
    try{
        AccountNumber=req.body.accountNumber
        const newBalance=req.body.money;
        console.log(newBalance)
        console.log(AccountNumber)

      
        
       

        const UpdateAccount = async(accountnumber)=>{
            try{

                const updateAccount=await Account.updateOne({accountnumber},{
                    $inc:{
                        balance:-newBalance
        
                    }
        
                });
                console.log(updateAccount)
            }
            catch(err){
                console.log(err)
            }
        }
        
        UpdateAccount(AccountNumber);
        
       


    }
    catch(err){
        console.log(err);
        res.status(404).render("404")
    }
    const result2=await Account.findOne({accountnumber:AccountNumber})
           
    res.render("Account",{
        name:result2.name,
        email:result2.email,
        phone:result2.phone,
        password:result2.password,
        balance:result2.balance,
        naaam:result2.name
        
     })
 
})
// ===================================================================================================================================
// ============================================================  Register Account  =====================================================
// ===================================================================================================================================

app.post("/Login",async(req,res)=>{
try{
    const accountnumber =req.body.accountnumber;
    const confirmnumber =req.body.confirmnumber;
   
    if(accountnumber===confirmnumber){
        
        
        const createAccount=new Account({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            accountnumber:accountnumber,
            confirmnumber:accountnumber
        })
        const saveAccount= await createAccount.save();
        res.render("Login",{note:"your account is Registered successfully"})
    }
    else{
        res.render("registeration",{note:"your account number and confirm account number are not same"})
    }
}
catch(err){
    console.log(err)
    res.status(404).render("404")
}
})
app.get("/registeration",(req,res)=>{

    res.render("registeration")

})

app.get("/*",(req,res)=>{

    res.status(404).render("404")

})



app.listen(port,()=>{
    console.log("han g bhai apka apna server ban chuka ha ")

})
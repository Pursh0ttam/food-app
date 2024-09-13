
let testMiddleware =(req,res)=>{
    try{
        res.status(200).send("test api executed successfully")
    }catch(error){
        res.send({error:true,message:error.message})
    }
}

module.exports = {testMiddleware}
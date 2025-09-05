const asynchandler = (requesthandler)=>{


    
    
    return(req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).catch((err)=>next(err))
    }
} 
export {asynchandler}


//This is an high order function
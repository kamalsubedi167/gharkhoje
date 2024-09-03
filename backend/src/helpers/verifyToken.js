import jwt from "jsonwebtoken";


const verifyToken = (req,res,next)=>{

    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token,process.env.JWT_SECRET_KEY,async (err,payload)=>{

        if(err) return res.status(400).json({message:"Token is not valid"});
        req.userId = payload.id;
        // console.log(payload.userId);
        next();

    });   
}


const generateToken = (payload)=>{
  const token =  jwt.sign(payload,process.env.JWT_SECRET_KEY);
  return token;
}

export {verifyToken,generateToken};


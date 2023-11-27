const jwt = require("jsonwebtoken");
const User = require('../model/userSchema');

const authenticate = async (req,res, next) => {
    try {
        const token = req.cookies.token;
        const verifyToken = jwt.verify(token, process.env.SECRET);
        
        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});
        
        if (!rootUser) {
            throw new Error('user not found');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
        
    } catch (err) {
        res.status(401).send("Unauthorized :  tokens not provided")
        console.log(err);
    }
}


module.exports = authenticate;
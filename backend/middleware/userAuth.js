const jwt = require("jsonwebtoken");

const { jwt_secret } = require("../routes/config");



const authMiddleware = (req, res, next) => {


    const authHeader = req.headers.authorization;



    if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
    ) {

        return res.status(403).json({

            message: "Authorization failed"

        });

    }



    const token = authHeader.split(" ")[1];



    try {


        const decoded = jwt.verify(
            token,
            jwt_secret
        );



        req.userId = decoded.userId;

        req.role = decoded.role;



        next();



    } catch (error) {


        return res.status(403).json({

            message: "Invalid token"

        });

    }

};



module.exports = {

    authMiddleware

};
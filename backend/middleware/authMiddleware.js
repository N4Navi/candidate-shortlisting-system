const jwt = require("jsonwebtoken");

const authMiddleware =
    (req, res, next) => {

    try {

        const token =
            req.header("Authorization");

        if (!token) {

            return res.status(401).json({
                error: "Access denied"
            });

        }

        const verified =
            jwt.verify(
                token,
                "secretkey"
            );

        req.user = verified;

        next();

    } catch (error) {

        res.status(400).json({
            error: "Invalid token"
        });

    }

};

module.exports =
    authMiddleware;
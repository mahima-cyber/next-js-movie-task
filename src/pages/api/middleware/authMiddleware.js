import jwt from 'jsonwebtoken'

function authMiddleware(handler) {

    return async (req, res) => {
        const { authorization } = req.headers;
        res.setHeader("Content-Type", "application/json");
        if (!authorization) {
            return res.status(401).json({
                message: 'unauthorized'
            });
        }
        try {
            const decodeAuthorization = jwt.verify(authorization, process.env.JWT_SECRET_KEY);
            req.user = decodeAuthorization;
            return handler(req, res);
        } catch (err) {
            return res.status(401).json({
                message: 'unauthorized'
            });
        }
    };
}

export default authMiddleware;
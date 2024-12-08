// middleware to check user role
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['role'];
        console.log("Role from headers:", userRole);

        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

module.exports = { checkRole };

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403);
            throw new Error('Access denied: You do not have the required role');
        }
        next();
    };
}

module.exports = authorizeRole;
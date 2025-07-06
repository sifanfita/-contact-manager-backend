const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode ? res.statusCode : 500;
    switch (statuscode) {
        case constants.BadRequest:
            res.json({
                title: "Bad Request",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constants.Unauthorized:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constants.NotFound:
            res.json({
                title: "Not Found",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constants.InternalServerError:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stack: err.stack,
            });
            break;
        default:
            console.log("No error, all good");
    }

};

module.exports = errorHandler;
const apiError = require('../utils/apiErrors')

const errorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}
const errorProd = (err, res) => {
    if (err.isOperationError) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        console.error('error 💥');
        res.status(500).json({
            status: 'error',
            message: 'something went wrong'
        })
    }

}
// const castErrorDB = (err) => {
//     const message = `invalid ${err.path} : ${err.value}`
//     return new apiError(message, 400)
// }



function globalErrorHandler(err, req, res, next) {
    // console.log(err.stack);
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        errorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        // let error = { ...err }
        // if (error.name === 'CastError') error = castErrorDB(error)
        errorProd(err, res)
    }
}

module.exports = globalErrorHandler


// function globalErrorHandler(err, req, res, next) {
//     // console.log(err.stack);
//     err.statusCode = err.statusCode || 500
//     err.status = err.status || 'error'
//     res.status(err.statusCode).json({
//         status: err.status,
//         message: err.message
//     })
// }
// module.exports = globalErrorHandler
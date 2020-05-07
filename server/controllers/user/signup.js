const addUser = require('./../../database/query/addUser')
const responsemessage = require('./../../helpers/responseMessage')
const signup = (req, res) => {
    console.log(req.body)
    const data = req.body
    addUser(data, (err, result) => {
        console.log("err" + err)
        console.log("result" + result)
        if (err) {
            return
            res
                .status(501)
                .json(
                    responsemessage.InternalErrorMessage(
                        null,
                        'internal error with the server'
                    )
                );
        }
        return
        res
            .status(200)
            .json(responsemessage.successMessage(null, ' You are registered successfully'));
    })


}
module.exports = signup;
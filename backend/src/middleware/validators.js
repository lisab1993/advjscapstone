const {check} = require('express-validator')


const loginValidator = [
    check('username').exists().isLength({min: 1, max: 20}),
    check('password').exists().isLength({min: 3, max: 50})
]

const signupValidator = [
    ...loginValidator,
    check("checkPassword").exists().isLength({min: 3, max: 50}),
    check('password').custom((password, {req}) => password === req.body.checkPassword)
]

module.exports = {
    loginValidator,
    signupValidator
}
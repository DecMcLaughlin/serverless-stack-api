const { createUser } = require('../data');
const { User } = require('../entities');

const handler = async event => {
    const user = new User({
        phone: '078619876543', //event.body.phone,
        email: 'dmclaughlin@mdl.com', //event.body.email,
        firstName: 'Declan',//event.body.firstName,
        lastName: 'McLaughlin' //event.body.lastName,
    })
    const { error } = await createUser(user)
    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ customer })
    return {
        statusCode,
        body
    }
}

module.exports = {
    handler
}
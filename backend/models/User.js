const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    id : {type : Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String},
    name: {type: String},
    surname: {type: String}
})

module.exports = model('User', schema, 'users')


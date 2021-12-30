const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    id: {type: String, required: true, unique: true},
    date: {type: String, required: true},
    userId: {type: String, required: true},
    category: {type: String, required: true},
    sum: {type: String, required: true}
})

module.exports = model('Transaction', schema, 'transaction')

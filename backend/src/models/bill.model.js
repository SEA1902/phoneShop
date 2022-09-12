const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [
        {
            product: {type:mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: Number,
        }
    ],
    total: Number,
    state: String,
    address: String,
},  {timestamps: true});

module.exports = mongoose.model("Bill", BillSchema);
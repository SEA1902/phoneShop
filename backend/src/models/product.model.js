const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ProductSchema = mongoose.Schema({
    name: String,
    price: String,
    image: String,
    company: String,
});

ProductSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Product", ProductSchema);


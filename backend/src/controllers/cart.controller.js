const Cart = require('../models/cart.model');
const Product = require('../models/product.model')

exports.get = (req, res) => {
    Cart.findOne()
        .populate({path: 'user', id: req.params.userId})
        .populate({path: 'items', populate: {path: 'product'}})
        .exec(function(err, result) {
            if(err){
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Cart"
                })
            }
            res.send(result)
            
        })
}

exports.addItem = (req, res) => {
    const item = {
        product: req.body.product,
        quantity: req.body.quantity
    }

    Cart
        .findOne()
        .populate({path: 'user', id: req.params.userId})
        .exec( function(err, cart) {
            if (err) return handleError(err);
            var items = [];
            if(cart.items) items = cart.items;

            var isItem = false;
            if(items){
                items.forEach(x => {
                    if(x.product._id == item.product._id){
                        x.quantity += item.quantity;
                        isItem = true;
                    };
                });
            } else items.push(item);
            if(!isItem) items.push(item);

            cart.items = items;

            cart
                .save()
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while add product to cart"
                    })
                })
        })

}

exports.deleteItem = (req, res) => {
    const itemId = req.params.itemId;
    Cart
        .findOne()
        .populate({path: 'user', id: req.params.userId})
        .exec(function(err, cart) {
            if(err) handleError(err);

            cart.items = cart.items.filter(item => item.id !== itemId);
            cart
                .save()
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while delete product to cart"
                    })
                })
        })
}
exports.deleteCart = (req, res) => {
    Cart
        .findOne()
        .populate({path: 'user', id: req.params.userId})
        .exec(function(err, cart) {
            if(err) handleError(err);

            cart.items = [];
            cart
                .save()
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while delete product to cart"
                    })
                })
        })
}
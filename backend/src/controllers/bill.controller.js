const Bill = require('../models/bill.model');

exports.create = (req, res) => {
    const bill = new Bill({
        user: req.body.user,
        items: req.body.items,
        total: req.body.total,
        state: req.body.state,
        address: req.body.address
    })

    bill
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Bill"
            })
        })
}
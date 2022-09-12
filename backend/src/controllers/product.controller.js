const Product = require("../models/product.model");

exports.create = (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        company: req.body.company,
    });

    product
        .save()
        .then((data) => {
        res.send(data);
         })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the User"
            })
        })
}

const getPagination = (page, size) => {
    const limit = size ? +size : 8;
    const offset = (page - 1) ? (page - 1) * limit : 0;
    return {limit, offset};
}

exports.getAll = (req, res) => {
    const {page, size, company} = req.query;
    var condition = company 
        ? { company: { $regex: new RegExp(company), $options: "i"} }
        : {};

    const {limit, offset} = getPagination(page, size);
    Product.paginate(condition, { offset, limit })
    .then((data) => {
        res.send({
            totalItems: data.totalDocs,
            products: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page,
          });
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving User"
        })
    })
}

exports.getById = (req, res) => {
    Product.findById(req.params.productId)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Product not found with id " + req.params.productId,
          });
        }
        res.send(data);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Product not found with id " + req.params.productId,
          });
        }
        return res.status(500).send({
          message: "Error retrieving product with id " + req.params.productId,
        });
      });
};

exports.delete = (req, res) => {
  Product.deleteOne({ _id: req.params.productId})
  .then((data) => {
    if (!data) {
      return res.status(404).send({
        message: "Product not found with id " + req.params.productId,
      });
    }
    res.send(data);
  })
  .catch((err) => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Product not found with id " + req.params.productId,
      });
    }
    return res.status(500).send({
      message: "Error delete product with id " + req.params.productId,
    });
  });
}
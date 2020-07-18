const connection = require('./src/database')
const Product = require('./src/models/Product')

module.exports.getProducts = async (event, context, callback) => {
  try {
    const products = await Product.find()

    const response = {
      statusCode: 200,
      body: {
        data: products,
      },
    }

    callback(null, response)
  } catch (err) {
    const response = {
      statusCode: 500,
      body: {
        error: "Couldn't list the products",
      },
    }

    callback(err, response)
  }
  return connection.close()
}

module.exports.getOneProduct = async (event, context, callback) => {
  try {
    const { id = null } = event.path
    const product = await Product.findById(id)

    const response = {
      statusCode: 200,
      body: {
        data: product,
      },
    }

    callback(null, response)
  } catch (err) {
    const response = {
      statusCode: 400,
      body: {
        error: "Couldn't list the product",
      },
    }

    callback(err, response)
  }
  return connection.close()
}

module.exports.storeProduct = async (event, context, callback) => {
  try {
    const { name, price, color, description } = event.body
    const product = await Product.create({ name, price, color, description })

    const response = {
      statusCode: 201,
      body: {
        data: product,
      },
    }

    callback(null, response)
  } catch (err) {
    const response = {
      statusCode: 400,
      body: {
        error: "Couldn't create the product",
      },
    }

    callback(err, response)
  }
  return connection.close()
}

module.exports.updateProduct = async (event, context, callback) => {
  try {
    const { id } = event.path
    const { name, price, color, description } = event.body
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        color,
        description,
      },
      { new: true }
    )

    const response = {
      statusCode: 200,
      body: {
        data: product,
      },
    }

    callback(null, response)
  } catch (err) {
    const response = {
      statusCode: 400,
      body: {
        error: "Couldn't update the product",
      },
    }

    callback(err, response)
  }
  return connection.close()
}

module.exports.destroyProduct = async (event, context, callback) => {
  try {
    const { id } = event.path
    await Product.findByIdAndDelete(id)

    const response = {
      statusCode: 204,
    }

    callback(null, response)
  } catch (err) {
    const response = {
      statusCode: 400,
      body: {
        error: "Couldn't delete the product",
      },
    }

    callback(err, response)
  }
  return connection.close()
}

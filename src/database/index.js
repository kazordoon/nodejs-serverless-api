require('dotenv/config')
const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB Error', err))

const connection = mongoose.connection

module.exports = connection

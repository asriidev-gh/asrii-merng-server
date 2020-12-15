const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose
      .connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        keepAlive: true,
      })
      .then(() => {
        console.log("MONGODB Connected!");
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

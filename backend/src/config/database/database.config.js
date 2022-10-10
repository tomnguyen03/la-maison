const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL, {
      bufferCommands: false,
      dbName: "la_maison",
      autoIndex: false,
      autoCreate: true,
    });
    console.log("connect successfully...");
  } catch (error) {
    console.log("connect failed...", error);
  }
}

module.exports = { connect };

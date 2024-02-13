const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dbUrl = process.env.MONGODB_URI;
console.log("connecting to ", dbUrl);
mongoose
  .connect(dbUrl)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) =>
    console.log("error connecting to MongoDB: ", err.message)
  );

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (value) {
        return /^\d{2,3}-\d+$/.test(value);
      },
    },
    required: true,
  },
});
personSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});
module.exports = mongoose.model("Person", personSchema);

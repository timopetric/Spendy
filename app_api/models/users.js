const mongoose = require('mongoose');


const userSettings = new mongoose.Schema({
  language: String, // sl, en
  currency: String  // eur, usd
});

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  name: String,
  surname: String,
  balance: Number,
  settings: userSettings
});


mongoose.model('User', userSchema, 'Users');
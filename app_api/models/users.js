const mongoose = require('mongoose');


const userBalance = new mongoose.Schema({
  balance: Number
});

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  name: String,
  surname: String,
  balance: [userBalance]
});

// mongoose.model('Lokacija', lokacijeShema, 'Lokacije');
mongoose.model('User', userSchema, 'Users');
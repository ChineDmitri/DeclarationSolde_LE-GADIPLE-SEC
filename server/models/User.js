const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  dateDeclaration: { type: Date, required: true, default: Date.now() },
  start: { type: Boolean, required: false, default: true },
  nom: { type: String, required: true },
  dateFDC_str: { type: String, required: true },
  dateFDC_utc: { type: Date, required: true },
  MonthSolde: { type: [Number], required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

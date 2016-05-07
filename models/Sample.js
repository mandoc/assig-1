var mongoose = require('mongoose');
var SampleSchema = new mongoose.Schema({
  _id: String,
  value: Number,
},
{
    collection: 'ppe_for_stack'
});


mongoose.model('Sample', SampleSchema);


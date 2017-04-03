var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TodoSchema = new Schema({
    user_id:{
      ref:"user",
      type:ObjectId
  },
    title: String,
    description:String,
    completed:Boolean,
    updated_at :{type: Date, default: Date.now }
});

var todo = mongoose.model( 'Todo', TodoSchema );

// function todo(){
//   EventEmitter.call(this);
//
//   util.inherits(todo,EventEmitter);
  //
  // Todo.prototype.create(req.body, function (err, post) {
  //   if (err) return next(err);
  //   res.json(post);
  // });





module.exports = todo ;

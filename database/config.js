const mongoose = require('mongoose');

mongoose.set('useCreateIndex',true)
mongoose.set('useFindAndModify',false)

console.log(process.env.NODE_ENV)
const connectAddress = process.env.NODE_ENV == 'development' ? 'mongodb://localhost:27017/myBlog' : 'mongodb://cpf:1@116.62.145.106:27017/myBlog';
mongoose.connect(
    connectAddress,
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('success');
});
module.exports = db;

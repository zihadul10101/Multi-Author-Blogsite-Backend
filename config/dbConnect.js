const mongoose = require('mongoose');


module.exports = dbConnect = async () => {
    try {
        const response = await mongoose.connect('mongodb://localhost:27017/mern_blog', { useNewUrlParser: true });
        console.log('database connected');
    } catch (error) {
        console.log(error);
    }
}

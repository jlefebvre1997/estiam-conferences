const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require('password-hash');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    isAdmin: {type: Boolean, default: false}
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = hash.generate(this.password);
    }

    next()
});

userSchema.methods.verify = function(password) {
    return hash.verify(password, this.password)
};

mongoose.model('User', userSchema);

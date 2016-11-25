const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function(userModel) {
  const getNewId = function() {
    return new ObjectId;
  };

  const findUser = function(query) {
    const user = userModel.findOne(query);
    return user.exec();
  }

  const createUser = function(user) {
    const newUser = new userModel(user);
    return newUser.save();
  };

  const getUser = function(userId) {
    const user = this.userModel.find({ '_id': userId });
    return user.exec();
  };

  const deleteUser = function(userId) {
    const deletedUser = this.userModel.findOneAndRemove({ '_id': userId });
    return deleteUser.exec();
  };

  // @TODO update existing user
  // var updateUser = function(userId, newUserData) {
  //  what should we update?
  // };

  return {
    createUser,
    getUser,
    findUser,
    deleteUser,
    getNewId,
  };
};
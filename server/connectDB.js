const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/';
const db = 'Calendar';
const collection = 'users';

module.exports.getUser = ({ name, password }) => 
  MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => 
      client.db(db)
      .collection(collection)
      .findOne({ name, password })
      .then(result => ({
          id: result._id,
          name: result.name,
          tasks: result.tasks
        }))
      .catch(err => err)
    )

module.exports.getUserTasks = ({ userId }) => 
  MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => 
      client.db(db)
      .collection(collection)
      .findOne({ _id: ObjectId(userId) })
      .then(result => ({ tasks: result.tasks }))
      .catch(err => err)
    )

module.exports.addTask = ({ id, task }) => 
  MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => 
      client.db(db)
      .collection(collection)
      .findOneAndUpdate(
        { _id: ObjectId(id) }, 
        { $push: { tasks: task } },
        { returnOriginal: false})
      .then(result => result)
      .catch(err => err)
    )

module.exports.deleteTask = ({ id, taskId }) => 
  MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => 
      client.db(db)
      .collection(collection)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $pull: { tasks: { id: taskId } } },
        { returnOriginal: false}
      )
      .then(result => result)
      .catch(err => err)
    )
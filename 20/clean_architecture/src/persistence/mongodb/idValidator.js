const { ObjectId } = require('mongodb');

function createMongoIdValidator() {
  function isValid(id) {
    return ObjectId.isValid(id);
  }

  return { isValid };
}

module.exports = createMongoIdValidator;

const mongoose = require('mongoose');
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useFindAndModify', false);

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        'mongodb+srv://gajiyasir_db_user:LBiOMnCSD9Uv2Xvu@tweeta0.u3w9zut.mongodb.net/?retryWrites=true&w=majority&appName=tweeta0'
      )
      .then(() => {
        console.log('the bluetooth (DB) device is connected all successfully');
      })
      .catch((error) => {
        console.log('the bluetooth (DB) device is not connected ' + error);
      });
  }
}


module.exports = new Database();
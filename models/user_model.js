const bcrypt = require("bcrypt");
const mongodb = require("mongodb");
const db = require("../data/database");

class User {
  constructor(email, password, fullName, street, code, city) {
    this.mail = email;
    this.password = password;
    this.name = fullName;
    this.address = {
      street: street,
      PostalCode: code,
      city: city,
    };
  }

  async signup() {

    const hashedPassword = await bcrypt.hash(this.password, 12);
    
    await db.getDb().collection("users").insertOne({
      email: this.mail,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }
  
  static findById(userId) {
    const uid = new mongodb.ObjectId(userId);

    return db
    .getDb()
    .collection("users")
    .findOne({ _id: uid }, {projection: {password: 0}});
  }
  getUserWithSameEmail(){
    return db.getDb().collection("users").findOne({email: this.mail});
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }


  isMatchPassword(hashedPassword){
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;

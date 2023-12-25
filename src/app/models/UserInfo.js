const { Schema, models, model } = require("mongoose");

const UserInfoSchema = new Schema({
  streetAddress: {type: String},
  postalCode: {type: String},
  city: {type: String},
  country: {type: String},
  phone:{type: String},

  admin: {type: Boolean, default: false}
})
export const userInfo = models?.userInfo || model('UserInfo', UserInfoSchema)
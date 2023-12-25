import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const ExtraPrices = new Schema({
  name:String,
  price: Number,
})

const MenuItemSchema = new Schema({
image: {type: String},
name: {type: String},
description: {type: String},
categories: {type: mongoose.Types.ObjectId},
basePrice: {type: Number},
sizes:{type:[ExtraPrices]},
extraIngridientPrices:{type:[ExtraPrices]}
},{timestamps: true})

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema)
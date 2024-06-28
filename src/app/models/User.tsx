
import {model, models, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { 
        type: String,  
        // validate: (pass: string) => {
        //     if (!pass?.length || pass.length < 5) {
        //         new Error('Pw must be 5 characters')
        //     }
        // } 
    },
    admin: { type: Boolean, default: false }
}, { timestamps: true})

// UserSchema.post('validate', function(user) {
//     const notHashedPW = user.password
//     const saltRounds = 10;
//     const salt = bcrypt.genSaltSync(saltRounds);
//     user.password  = bcrypt.hashSync(notHashedPW, salt); 
// })

export const User = models?.User || model('User', UserSchema) 
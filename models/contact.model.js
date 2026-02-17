import mongoose from 'mongoose';
// Pagination 
import mongoosePaginate from 'mongoose-paginate-v2';

export const contactSchema = new mongoose.Schema({
    first_name:{
        type: String,
    },
    last_name:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    address:{
        type:String,
    }
});

// Pagination plugin
contactSchema.plugin(mongoosePaginate);
const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
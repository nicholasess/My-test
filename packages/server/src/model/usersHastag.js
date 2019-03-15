import mongoose from 'mongoose'
const Schema = mongoose.Schema

const getUsersHastag = new Schema({
    nome: {
        type: String,
        required: "name is required"
    },
    comentario:{
        type: String,
        required: "comment is required"
    }
})

export default mongoose.model('hastags', getUsersHastag)
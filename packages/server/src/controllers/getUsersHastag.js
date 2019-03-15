import usersHastag from './../model/usersHastag'
import mongoose from 'mongoose'

async function getUsersHastag(ctx, next){
    const hastag = ctx.request.body.hastag;
    const users = await usersHastag.find({comentario: {$regex: hastag, $options: 'i'}})
    // console.log(users)
    try{
        if(users.length === 0){
            return ctx.body = {
                result: false,
                msg:'Nenhuma hastag foi encontrada'
            }
        }else{
            return ctx.body = {
                users,
                result: true,
                msg:'Hastag encontrada com sucesso'
            }
        }

    } catch(err){
        console.log('Error server screen getUserHastag: ' + err)
    }

}

export default getUsersHastag
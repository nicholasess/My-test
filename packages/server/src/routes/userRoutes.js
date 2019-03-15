import getUsersHastag from './../controllers/getUsersHastag'

export default function(router){
    router.post('/findHastag', getUsersHastag)
}

const bcrypt = require('bcryptjs');
const auth = require('../../../auth');
const error = require('../../../utils/errors')

const TABLA = 'auth';

module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummi');
    }

    async function login(username, password) {
        const data= await store.query(TABLA, {username: username});

        return bcrypt.compare(password, data.password) 
            .then( sonIguales => {
                    if (sonIguales === true) {
                    return auth.sign(JSON.parse(JSON.stringify(data)));
                } else {
                    throw error('Información invalida', 403)
                }
            })
        
    }

    async function upsert(data) {
        const authData = {
            id : data.id
        }
        if(data.username) {
            authData.username = data.username
        }
        if(data.password) {
            authData.password = await bcrypt.hash(data.password, 10)
            console.log(authData)
        }

        return store.upsert(TABLA, authData)
    }

    return {
        upsert, login,
    };
}
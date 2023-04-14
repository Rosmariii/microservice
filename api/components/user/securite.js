const auth = require('../../../auth')

module.exports = function CheckAuth(action) {

    function middleware(req, res, next){
        switch(action) {
            case 'update':
                let owner = req.body.id
                auth.check.own(req, owner);
                next();
                break;
            
            case 'follow':
                auth.check.logged(req);
                next();
                break;
            default:
                next()
        }
    }

    return middleware
}
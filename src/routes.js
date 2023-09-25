const user = require('./api/user');
const message = require('./api/message')
const routes = (app) => {
    app.use('/api/user', user)
    app.use('/api/message', message)
}

module.exports = routes
const { User } = require('./user');
const { Session } = require('./session');

Session.belongsTo(User);
User.hasMany(Session);

module.exports = {
    User,
    Session
}
"use strict";
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.js")[env];
var db = {};
var sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
}
else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
fs.readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js");
})
    .forEach(function (file) {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
var _a = sequelize.models, users = _a.users, review = _a.review, customCase = _a.customCase, phone = _a.phone, like = _a.like, source = _a.source, orderList = _a.orderList, orderNumber = _a.orderNumber, cartList = _a.cartList;
review.hasMany(source);
source.belongsTo(review);
// phone.belongsTo(customcase);
// customcase.hasMany(phone);
phone.hasOne(customCase);
customCase.belongsTo(phone);
customCase.hasMany(review, { foreignKey: "caseId" });
review.belongsTo(customCase, { foreignKey: "caseId" });
users.hasMany(customCase);
customCase.belongsTo(users);
// users.belongsToMany(review, { through: like });
// review.belongsToMany(users, { through: like });
users.hasMany(like);
like.belongsTo(users);
review.hasMany(like);
like.belongsTo(review);
users.hasMany(review);
review.belongsTo(users);
users.hasMany(orderNumber);
orderNumber.belongsTo(users);
orderNumber.hasMany(orderList);
orderList.belongsTo(orderNumber);
customCase.hasMany(orderList);
orderList.belongsTo(customCase);
users.hasOne(cartList);
cartList.belongsTo(users);
customCase.hasOne(cartList);
cartList.belongsTo(customCase);
module.exports = db;

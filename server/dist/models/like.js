"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Model = require("sequelize").Model;
module.exports = function (sequelize, DataTypes) {
    var like = /** @class */ (function (_super) {
        __extends(like, _super);
        function like() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        like.associate = function (models) {
            // define association here
        };
        return like;
    }(Model));
    like.init({
    // reviewId: DataTypes.INTEGER,
    // userId: DataTypes.INTEGER,
    }, {
        sequelize: sequelize,
        modelName: "like",
    });
    return like;
};

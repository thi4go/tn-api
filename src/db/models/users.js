import { DataTypes } from 'sequelize';
import { USER_MODEL, USER_TABLE } from '../../constants.js';
import bcrypt from 'bcryptjs';

export async function defineUserModel(sequelize) {
  sequelize.define(
    USER_MODEL,
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      status: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        validate: {
          isIn: [['active', 'inactive']],
        },
      },
      balance: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: USER_TABLE,
      sequelize,
    },
  );

  return sequelize;
}

export async function hashUserPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

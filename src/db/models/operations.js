import { DataTypes } from 'sequelize';
import {
  OPERATIONS,
  OPERATION_MODEL,
  OPERATION_TABLE,
} from '../../constants.js';

export function defineOperationModel(sequelize) {
  sequelize.define(
    OPERATION_MODEL,
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        validate: {
          isIn: [OPERATIONS],
        },
      },
      cost: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      first_num: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        default: 0,
      },
      second_num: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        default: 0,
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: OPERATION_TABLE,
      sequelize,
    },
  );

  return sequelize;
}

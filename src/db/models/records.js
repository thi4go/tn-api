import { DataTypes } from 'sequelize';
import {
  OPERATION_TABLE,
  RECORD_MODEL,
  RECORD_TABLE,
  USER_TABLE,
} from '../../constants.js';

export function defineRecordModel(sequelize) {
  sequelize.define(
    RECORD_MODEL,
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      operation_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: OPERATION_TABLE,
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: USER_TABLE,
          key: 'id',
        },
      },
      amount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      user_balance: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: RECORD_TABLE,
      sequelize,
    },
  );

  return sequelize;
}

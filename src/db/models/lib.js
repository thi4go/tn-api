export function defineModelRelations(sequelize) {
  const User = sequelize.models.User;
  const Record = sequelize.models.Record;
  const Operation = sequelize.models.Operation;

  User.hasMany(Record);
  Record.belongsTo(User, {
    foreignKey: 'user_id',
  });

  Operation.hasMany(Record);
  Record.belongsTo(Operation, {
    foreignKey: 'operation_id',
  });

  return sequelize;
}

export async function syncModels(sequelize) {
  const User = sequelize.models.User;
  const Record = sequelize.models.Record;
  const Operation = sequelize.models.Operation;

  User.sync();
  Record.sync();
  Operation.sync();

  return sequelize;
}

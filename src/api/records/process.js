export async function processRecordsGET(db, req) {
  const records = await db.models.Record.findAll({
    where: {
      user_id: req.userId,
    },
    include: [
      {
        model: db.models.Operation,
        required: true,
      },
    ],
  });
  return records;
}
  
import {
  OP_ADD,
  OP_DIV,
  OP_MUL,
  OP_SQRT,
  OP_SUB,
  OP_RANDOM_STRING,
  getOperationCost,
} from '../../constants.js';
import { getRandomString } from '../../external/random.js';
import { pipeAsync } from '../../fp.js';

export async function processOperationsGET(db, res) {
  const operations = await db.models.Operation.findAll();
  return operations;
}

export async function processOperationsPOST(db, req) {
  const { userId, type, firstNum, secondNum } = req.body;
  const cost = getOperationCost(type);
  const pipeContext = { db, userId, cost, type, firstNum, secondNum };
  return await pipeRunOperation(pipeContext);
}

const pipeRunOperation = pipeAsync(
  getUserBalance,
  hasEnoughBalance,
  cleanInputs,
  runOperation,
  saveUserUpdatedBalance,
  saveOperation,
  saveRecord,
  commitTransaction,
);

async function getUserBalance(context) {
  const { db, userId } = context;
  const user = await db.models.User.findByPk(userId);
  return { ...context, balance: user.balance };
}

function hasEnoughBalance(context) {
  const { balance, cost } = context;
  if (balance < cost) {
    throw new Error(`Not enough balance ${balance} to deduct ${cost}`);
  }
  return context;
}

function cleanInputs(context) {
  const { type, firstNum, secondNum } = context;
  if (type === OP_RANDOM_STRING) {
    delete context.firstNum;
    delete context.secondNum;
  } else if (type === OP_SQRT) {
    delete context.secondNum;
  }
  return context;
}

async function runOperation(context) {
  const { type, firstNum, secondNum } = context;
  const first = parseInt(firstNum, 10);
  const second = parseInt(secondNum, 10);
  let result = 0;
  switch (type) {
    case OP_ADD:
      result = (first + second).toString();
      break;
    case OP_SUB:
      result = (first - second).toString();
      break;
    case OP_DIV:
      result = (first / second).toString();
      break;
    case OP_MUL:
      result = (first * second).toString();
      break;
    case OP_SQRT:
      result = Math.sqrt(first).toString();
      break;
    case OP_RANDOM_STRING:
      result = await getRandomString();
      break;
    default:
      throw new Error(`Unknown operation type ${type}`);
  }

  return { ...context, result };
}
async function saveUserUpdatedBalance(context) {
  const { db, balance, userId, cost } = context;
  let transaction = await db.transaction();
  await db.models.User.update(
    { balance: balance - cost },
    {
      where: {
        id: userId,
      },
    },
    { transaction },
  );

  return { ...context, balance: balance - cost, transaction };
}

async function saveOperation(context) {
  const { db, cost, type, transaction, firstNum, secondNum, result } = context;
  const operation = await db.models.Operation.create(
    {
      type,
      cost,
      first_num: firstNum,
      second_num: secondNum,
      result: result,
    },
    { transaction },
  );
  return { ...context, operation };
}

async function saveRecord(context) {
  const { db, balance, userId, operation, transaction } = context;
  const record = await db.models.Record.create(
    {
      user_id: userId,
      operation_id: operation.id,
      amount: operation.cost,
      user_balance: balance,
    },
    { transaction },
  );
  return { ...context, record };
}

async function commitTransaction(context) {
  const { transaction, result } = context;
  await transaction.commit();
  const response = { result };
  return response;
}

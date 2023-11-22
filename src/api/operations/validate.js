import { OPERATIONS, OP_RANDOM_STRING } from '../../constants.js';

export function validateOperationsPOST(req) {
  const { type, firstNum, secondNum } = req.body;
  if (!OPERATIONS.includes(type)) {
    throw new Error('Invalid operation type');
  }
  const isRandomStringOperation = type === OP_RANDOM_STRING;
  const isMissingNumberInput = !firstNum || !secondNum;
  if (!isRandomStringOperation && isMissingNumberInput) {
    throw new Error('Invalid operation numbers');
  }
}

export const OP_ADD = 'addition';
export const OP_SUB = 'subtraction';
export const OP_MUL = 'multiplication';
export const OP_DIV = 'division';
export const OP_SQRT = 'square_root';
export const OP_RANDOM_STRING = 'random_string';

export const OPERATIONS = Object.freeze([
  OP_ADD,
  OP_SUB,
  OP_DIV,
  OP_MUL,
  OP_SQRT,
  OP_RANDOM_STRING,
]);

export const OPERATION_MODEL = 'Operation';
export const RECORD_MODEL = 'Record';
export const USER_MODEL = 'User';

export const OPERATION_TABLE = 'operations';
export const RECORD_TABLE = 'records';
export const USER_TABLE = 'users';

export const USER_STATUS_ACTIVE = 'active';
export const USER_STATUS_INACTIVE = 'inactive';
export const USER_INITIAL_BALANCE = 100;

export const TN_COOKIE = 'true_north_cookie';

export const TN_SALT = 10;

export function getOperationCost(type) {
  switch (type) {
    case OP_ADD:
    case OP_SUB:
    case OP_MUL:
    case OP_DIV:
    case OP_SQRT:
      return 1;
    case OP_RANDOM_STRING:
      return 5;
    default:
      throw new Error('Invalid operation type: ' + type);
  }
}

export const Either = {
  Right(value) {
    return {
      map: (f) => Either.Right(f(value)),
      fold: (f, g) => g(value),
      value: () => value,
    };
  },

  Left(value) {
    return {
      map: (f) => Either.Left(value),
      fold: (f, g) => f(value),
      value: () => value,
    };
  },
};

export const pipeAsync =
  (...fns) =>
  (x) =>
    fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x));

export const tryCatch = (f) => {
  try {
    return Either.Right(f());
  } catch (e) {
    return Either.Left(e);
  }
};

export const tryCatchAsync =
  (fn) =>
  async (...args) => {
    try {
      return Either.Right(await fn(...args));
    } catch (err) {
      return Either.Left(err);
    }
  };

// Handler helpers

export const withDatabase = (db, handler) => (req, res) =>
  handler(db, req, res);

export const withErrorHandling = (handler) => async (req, res) => {
  const asyncHandler = tryCatchAsync(handler);
  const either = await asyncHandler(req, res);
  either.fold(onFailure(res), onSuccess(res));
};

export const onSuccess = (res) => (data) => {
  res.status(200).json(data);
};
export const onFailure = (res) => (err) => {
  res.status(400).json({ error: parseErr(err) });
};

// TODO: improve error handling to account for custom messages for the frontend
const parseErr = (err) => {
  return err.toString();
};

// Patial apply function
export const partial = (fn, ...args) => fn.bind(null, ...args);

// pipe function helper
const _pipe = (f, g) => (...args) => g(f(...args));

//  pipe function
export const pipe = (...fns) => fns.reduce(_pipe);

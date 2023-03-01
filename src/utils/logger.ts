import Log from "./log";

const logger = {
  debug: (...params) => {
    Log.debug(...params);
  },

  info: (...params) => {
    Log.info(...params);
  },

  error: (...params) => {
    Log.error(...params);
  },

  warn: (...params) => {
    Log.warn(...params);
  },
};

export default logger;

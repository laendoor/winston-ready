/**
 * Transport for Logging based con level definition
 */
declare function logTransport(): winston.transports.FileTransportInstance;

/**
 * Transport for Logging error only
 */
declare function errorTransport(): winston.transports.FileTransportInstance;

/**
 * Transport for Logging based con level definition
 */
declare function dailyRotateTransport(): DailyRotateFile;

/**
 * Transport for Logging based con level definition
 */
declare function consoleTransport(): winston.transports.ConsoleTransportInstance;

declare const logger: Logger;

declare module 'winston-ready' {
  export default logger;
  export declare const container: winston.Container;
  export declare const transports: winston.transports.Transport[];
}
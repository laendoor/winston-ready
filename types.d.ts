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

declare const container: winston.Container;

declare const transports: winston.transports.Transport[];

declare const logger: Logger;


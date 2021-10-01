/**
 * Transport for Logging based con level definition
 */
export declare function logTransport(): winston.transports.FileTransportInstance;

/**
 * Transport for Logging error only
 */
export declare function errorTransport(): winston.transports.FileTransportInstance;

/**
 * Transport for Logging based con level definition
 */
export declare function dailyRotateTransport(): DailyRotateFile;

/**
 * Transport for Logging based con level definition
 */
export declare function consoleTransport(): winston.transports.ConsoleTransportInstance;

export declare const container: winston.Container;

export declare const transports: winston.transports.Transport[];

declare const logger: Logger;

export default logger;

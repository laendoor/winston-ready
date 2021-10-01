import { Container, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports";

/**
 * Transport for Logging based con level definition
 */
declare function logTransport(): FileTransportInstance;

/**
 * Transport for Logging error only
 */
declare function errorTransport(): FileTransportInstance;

/**
 * Transport for Logging based con level definition
 */
declare function dailyRotateTransport(): DailyRotateFile;

/**
 * Transport for Logging based con level definition
 */
declare function consoleTransport(): ConsoleTransportInstance;

declare const container: Container;

declare const transports: winston.transports.Transport[];

declare const logger: Logger;


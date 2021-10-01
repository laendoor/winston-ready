import { Container } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { ConsoleTransportInstance, FileTransportInstance, Transports } from "winston/lib/winston/transports";

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

declare const transports: Transports[];


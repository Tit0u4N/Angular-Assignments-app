import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";

type LogLevel = 'info' | 'warn' | 'error';
type LogType = 'fetch' | 'admin' | 'auth' | 'other';

interface Log {
  level: LogLevel,
  type: LogType,
  timestamp: Date,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private logs: Log[] = [];
  private verbalLogs: boolean = false;

  constructor(private AuthService: AuthService) { }

  log(message: string, options?: {level?: LogLevel, type?: LogType, verbal?: boolean}) {
    this.testIfAdmin();
    const level = options?.level || 'info';
    const type = options?.type || 'other';
    const log = {message, level, type, timestamp: new Date()};
    this.logs.push(log);
    if (this.verbalLogs || options?.verbal) {
      this.logVerbal(log);
    }
  }

  getLogs() {
    this.testIfAdmin();
    if (!this.AuthService.isAdmin) return;
    return this.logs;
  }

  clearLogs() {
    this.testIfAdmin()
    this.log('Logs cleared', {type: 'admin'});
    this.logs = [];
  }

  setVerbalLogs(value: boolean) {
    this.testIfAdmin();
    this.log(`Verbal logs are now ${value ? 'enabled' : 'disabled'}`, {type: 'admin'});
    this.verbalLogs = value;
  }

  private testIfAdmin() {
    if (!this.AuthService.isAdmin) {
      this.log('User is not an admin', {type: 'auth', level: 'error'});
      throw new Error('User is not an admin');
    }
  }

  private logVerbal(log: Log) {
    const message = `${log.timestamp.toISOString()} [${log.type}] ${log.message}`;
    console[log.level](message);
  }
}

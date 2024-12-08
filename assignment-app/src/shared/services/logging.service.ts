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
    if (!this.AuthService.isAdmin) return;
    const level = options?.level || 'info';
    const type = options?.type || 'other';
    const log = {message, level, type, timestamp: new Date()};
    this.logs.push(log);
    if (this.verbalLogs || options?.verbal) {
      this.logVerbal(log);
    }
  }

  getLogs() {
    if (!this.AuthService.isAdmin) return;
    if (!this.AuthService.isAdmin) return;
    return this.logs;
  }

  clearLogs() {
    if (!this.AuthService.isAdmin) return;
    this.log('Logs cleared', {type: 'admin'});
    this.logs = [];
  }

  setVerbalLogs(value: boolean) {
    if (!this.AuthService.isAdmin) return;
    this.log(`Verbal logs are now ${value ? 'enabled' : 'disabled'}`, {type: 'admin'});
    this.verbalLogs = value;
  }

  private logVerbal(log: Log) {
    const message = `${log.timestamp.toISOString()} [${log.type}] ${log.message}`;
    console[log.level](message);
  }
}

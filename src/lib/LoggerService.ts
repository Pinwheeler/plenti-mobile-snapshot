export class LoggerService {
  private static _instance: LoggerService;

  static instance() {
    if (!this._instance) {
      this._instance = new LoggerService();
    }
    return this._instance;
  }

  error(err: Error, logToConsole: boolean = false) {
    if (logToConsole) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}

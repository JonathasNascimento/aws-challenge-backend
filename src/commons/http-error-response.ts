import { HttpResponse } from './http-response';

export class HttpErrorResponse<T> extends HttpResponse<T> {
  message: string;
  status: string;
  data: T;

  constructor(message: string, data: T) {
    super(data);
    this.status = 'error';
    this.message = message;
    this.data = data;
  }
}

export class HttpResponse<T> {
  status: string;
  data: T;

  constructor(data: T) {
    this.status = 'success';
    this.data = data;
  }
}

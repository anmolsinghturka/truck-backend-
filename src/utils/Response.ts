class Response {
  status: string;
  statusCode: string | number;
  message: string;
  data: string | any;
  constructor() {
    this.status = '';
    this.statusCode = '';
    this.message = '';
    this.data = '';
  }

  setMessage(message) {
    this.message = message;
  }
  getMessage() {
    return this.message;
  }
  setStatus(status) {
    this.status = status;
  }
  getStatus() {
    return this.status;
  }
  setData(data) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
  setStatusCode(statusCode) {
    this.statusCode = statusCode;
  }
  getStatusCode() {
    return this.statusCode;
  }
}

export default Response;

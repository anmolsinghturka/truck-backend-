import Response from './Response';
import Constant from './enums/Constant.enum';
import { StatusCodes } from 'http-status-codes';
('use strict');

class Util {
  static getOkRequest(data, msg, res) {
    const response = new Response();
    response.setData(data);
    response.setMessage(msg);
    response.setStatus(Constant.SUCCESS);
    response.setStatusCode(StatusCodes.OK);
    return res.status(StatusCodes.OK).send(response);
  }
  static getSimpleOkRequest(msg, res) {
    const response = new Response();
    response.setMessage(msg);
    response.setStatus(Constant.SUCCESS);
    response.setStatusCode(StatusCodes.OK);
    return res.status(StatusCodes.OK).send(response);
  }
  static getBadRequest(msg, res) {
    const response = new Response();
    response.setMessage(msg);
    response.setStatus(Constant.FAIL);
    response.setStatusCode(StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).send(response);
  }
}
export default Util;

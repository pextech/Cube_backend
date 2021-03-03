import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import ResponseUtil from '../../utils/response.util';

function home(_req, res) {
  try {
    return ResponseUtil.handleSuccessResponse(
      OK,
      'Up and Running',
      '',
      res,
    );
  } catch (error) {
    return ResponseUtil.handleErrorResponse(
      INTERNAL_SERVER_ERROR,
      error.message,
      res,
    );
  }
}

export default home;

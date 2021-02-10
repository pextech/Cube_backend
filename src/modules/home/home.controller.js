import { INTERNAL_SERVER_ERROR, OK } from 'http-status';

function home(_req, res) {
  try {
    return res
      .status(OK)
      .json({ status: OK, message: 'Up and Running' });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: INTERNAL_SERVER_ERROR,
      message: 'Something went wrong',
    });
  }
}

export default home;

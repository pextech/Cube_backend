import Order from '../../database/model/order.model';

class orderController {
  static async orderPackage(req, res) {
    try {
      const { phone, _id: userId, fullname, email } = req.userData;
      const newOrder = {
        ...req.body,
        phone,
        userId,
        fullname,
        email,
      };
      const order = await Order.create(newOrder);

      res.status(201).json({
        message: 'package ordered successfully',
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        error: 'server error',
      });
    }
  }
}

export default orderController;

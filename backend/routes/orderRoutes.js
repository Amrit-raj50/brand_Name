import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (Can be protected later)
router.post('/', async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    try {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
  }
});

// @desc    Create Razorpay Order
// @route   POST /api/orders/create-razorpay-order
// @access  Public
router.post('/create-razorpay-order', async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder',
    });

    const options = {
      amount: req.body.amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occurred");
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create razorpay order', error: error.message });
  }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/orders/verify-payment
// @access  Public
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is successful, update order
      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: razorpay_payment_id,
          status: 'success',
          update_time: Date.now().toString(),
        };
        const updatedOrder = await order.save();
        return res.status(200).json({ message: "Payment verified successfully", order: updatedOrder });
      } else {
        return res.status(404).json({ message: "Order not found" });
      }
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;

const razorpayInstance = require("../utils/razorpayInstance");
const crypto = require("crypto");

// Create Order
const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = "order_rcptid_11" } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt,
    };

    console.log('options set going to hit the razorpay api')
    const order = await razorpayInstance.orders.create(options);
    console.log('got the response from razorpay api >>>', order)

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("Error in createOrder:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Verify Payment Signature
const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  console.log('Body:', body);
  console.log('Expected Signature:', expectedSignature);
  console.log('Received Signature:', razorpay_signature);
  console.log('isAuthentic:', isAuthentic);

  if (isAuthentic) {
    return res.status(200).json({ success: true, message: "Payment verified successfully" });
  } else {
    return res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};

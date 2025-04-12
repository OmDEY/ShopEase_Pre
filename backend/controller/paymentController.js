const razorpayInstance = require("../utils/razorpayInstance");
const crypto = require("crypto");
const Order = require("../models/order");
const generateInvoice = require("../utils/generateInvoice");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

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
const verifyPayment = async (req, res) => {
  try {
    const {
      data,
      userId,
      items,
      address,
      totalAmount,
    } = req.body;

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
    
    const isAuthentic = expectedSignature === razorpay_signature;
    
    console.log('isAuthentic', isAuthentic)
    console.log('userId', userId)
    console.log('items', items)
    console.log('address', address)
    console.log('totalAmount', totalAmount)
    console.log('razorpay_order_id', razorpay_order_id)
    console.log('razorpay_payment_id', razorpay_payment_id)
    console.log('razorpay_signature', razorpay_signature)
    
    console.log('expectedSignature', expectedSignature)


    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in the order." });
    }    
    
    if (!isAuthentic) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    const cleanedItems = items.map((item) => ({
      product: item.product._id || item.product, // in case it's already just an ID
      quantity: item.quantity,
      price: item.price,
    }));    

    // ✅ Step 1: Create Order
    const order = await Order.create({
      user: userId,
      items: cleanedItems,
      shippingAddress: address,
      totalAmount,
      paymentMethod: "Razorpay",
      paymentStatus: "Paid",
      orderStatus: "Processing",
    });    

    // Populate product info for invoice
    await order.populate("items.product");

    // ✅ Step 2: Generate PDF invoice
    const pdfBuffer = await generateInvoice(order);

    // ✅ Step 3: Upload to Cloudinary
    const streamUpload = (buffer, orderId) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "ecommerce_invoices",
            public_id: `invoice_${orderId}`,
            format: "pdf", // ✅ Ensures Cloudinary knows it's a PDF
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(pdfBuffer);

    // ✅ Step 4: Save invoice URL
    order.invoiceUrl = result.secure_url;
    await order.save();

    res.json({ success: true, order });

  } catch (error) {
    console.error("verifyPayment error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Create COD Order
const createCODOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress, totalAmount } = req.body;

    if (!userId || !items || !shippingAddress || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const order = await Order.create({
      user: userId,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      orderStatus: "Processing",
    });

    await order.populate("items.product");

    const pdfBuffer = await generateInvoice(order);

    const streamUpload = (buffer, orderId) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "ecommerce_invoices",
            public_id: `invoice_${orderId}`,
            format: "pdf", // ✅ Ensures Cloudinary knows it's a PDF
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(pdfBuffer);
    order.invoiceUrl = result.secure_url;
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error("createCODOrder error:", error);
    res.status(500).json({ success: false, message: "Failed to create COD order" });
  }
};


module.exports = {
  createOrder,
  verifyPayment,
  createCODOrder,
};

const PDFDocument = require('pdfkit');

async function generateInvoice(order) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const buffer = Buffer.concat(buffers);
      resolve(buffer);
    });

    doc.on('error', reject);

    // Invoice header
    doc.fontSize(20).text('INVOICE', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toDateString()}`);
    doc.text(`Customer: ${order.shippingAddress.fullName}`);
    doc.text(`Phone: ${order.shippingAddress.phone}`);
    doc.text(`Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.pincode}`);
    doc.moveDown();

    // Table headers
    doc.fontSize(14).text('Items', { underline: true });
    order.items.forEach((item, index) => {
      doc.moveDown(0.5);
      doc.fontSize(12).text(`${index + 1}. ${item.product.title || item.product.name} (${item.quantity} x ₹${item.price}) = ₹${item.quantity * item.price}`);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total: ₹${order.totalAmount}`);
    doc.text(`Payment Method: ${order.paymentMethod}`);
    doc.text(`Payment Status: ${order.paymentStatus}`);
    doc.text(`Order Status: ${order.orderStatus}`);

    doc.end();
  });
}

module.exports = generateInvoice;

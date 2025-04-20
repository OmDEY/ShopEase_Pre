const PDFDocument = require('pdfkit');
const fs = require('fs');

async function generateInvoice(order) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const buffer = Buffer.concat(buffers);
      resolve(buffer);
    });

    doc.on('error', reject);

    // Colors
    const primaryColor = '#6C63FF'; // Modern purple
    const secondaryColor = '#4A44F2'; // Darker purple
    const accentColor = '#FF6584'; // Pink accent
    const darkColor = '#2D3748'; // Dark text
    const lightColor = '#718096'; // Light text

    // Add ShopEase logo and header
    doc.fillColor(primaryColor)
       .fontSize(24)
       .font('Helvetica-Bold')
       .text('ShopEase', 50, 50, { align: 'left' });
    
    doc.fillColor(lightColor)
       .fontSize(10)
       .text('Your Favorite Shopping Destination', 50, 80);
    
    // Invoice title with background
    doc.fillColor(secondaryColor)
       .rect(0, 110, doc.page.width, 30)
       .fill();
    
    doc.fillColor('#FFFFFF')
       .fontSize(18)
       .font('Helvetica-Bold')
       .text('INVOICE', 0, 115, { align: 'center' });

    // Invoice details section
    const invoiceDetailsTop = 160;
    
    // Left column - Customer info
    doc.fillColor(darkColor)
       .fontSize(12)
       .font('Helvetica-Bold')
       .text('BILLED TO:', 50, invoiceDetailsTop);
    
    const fullName = order.user.fullName || order.user.name || `${order.user.firstName} ${order.user.lastName}`;
    doc.fillColor(darkColor)
       .fontSize(10)
       .font('Helvetica')
       .text(fullName, 50, invoiceDetailsTop + 20);
    doc.text(`${order.user.shippingAddress.addressLine1}`, 50, invoiceDetailsTop + 35);
    doc.text(`${order.user.shippingAddress.city}, ${order.user.shippingAddress.state}`, 50, invoiceDetailsTop + 50);
    doc.text(`${order.user.shippingAddress.postalCode}`, 50, invoiceDetailsTop + 65);
    doc.text(`Phone: ${order.user.phoneNumber}`, 50, invoiceDetailsTop + 80);

    // Right column - Invoice info
    doc.fillColor(darkColor)
       .fontSize(12)
       .font('Helvetica-Bold')
       .text('INVOICE DETAILS:', 350, invoiceDetailsTop);
    
    doc.fillColor(darkColor)
       .fontSize(10)
       .font('Helvetica')
       .text(`Invoice #: ${order._id.toString().slice(-8).toUpperCase()}`, 350, invoiceDetailsTop + 20);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 350, invoiceDetailsTop + 35);
    doc.text(`Payment Method: ${order.paymentMethod.toUpperCase()}`, 350, invoiceDetailsTop + 50);
    doc.text(`Status: ${order.orderStatus.toUpperCase()}`, 350, invoiceDetailsTop + 65);

    // Items table header
    const tableTop = invoiceDetailsTop + 120;
    
    doc.fillColor(primaryColor)
       .rect(50, tableTop, doc.page.width - 100, 20)
       .fill();
    
    doc.fillColor('#FFFFFF')
       .fontSize(10)
       .font('Helvetica-Bold')
       .text('NO.', 50, tableTop + 5);
    doc.text('ITEM', 90, tableTop + 5);
    doc.text('QTY', 350, tableTop + 5, { width: 50, align: 'right' });
    doc.text('PRICE', 400, tableTop + 5, { width: 70, align: 'right' });
    doc.text('TOTAL', 470, tableTop + 5, { width: 70, align: 'right' });

    // Items rows
    let itemPositionY = tableTop + 25;
    
    order.items.forEach((item, index) => {
      if (itemPositionY > doc.page.height - 100) {
        doc.addPage();
        itemPositionY = 50;
      }
      
      // Alternate row colors
      if (index % 2 === 0) {
        doc.fillColor('#F8FAFC')
           .rect(50, itemPositionY - 5, doc.page.width - 100, 20)
           .fill();
      }
      
      doc.fillColor(darkColor)
         .fontSize(10)
         .font('Helvetica')
         .text(`${index + 1}`, 50, itemPositionY);
      
      doc.text(item.product.title || item.product.name, 90, itemPositionY, { width: 250 });
      doc.text(item.quantity.toString(), 350, itemPositionY, { width: 50, align: 'right' });
      doc.text(`₹${item.price.toFixed(2)}`, 400, itemPositionY, { width: 70, align: 'right' });
      doc.text(`₹${(item.quantity * item.price).toFixed(2)}`, 470, itemPositionY, { width: 70, align: 'right' });
      
      itemPositionY += 20;
    });

    // Summary section
    const summaryTop = itemPositionY + 20;
    
    doc.fillColor(darkColor)
       .fontSize(12)
       .font('Helvetica-Bold')
       .text('PAYMENT SUMMARY', 350, summaryTop);
    
    doc.fillColor(darkColor)
       .fontSize(10)
       .font('Helvetica')
       .text('Subtotal:', 350, summaryTop + 25);
    doc.text(`₹${order.totalAmount.toFixed(2)}`, 470, summaryTop + 25, { width: 70, align: 'right' });
    
    doc.text('Shipping:', 350, summaryTop + 45);
    doc.text('₹0.00', 470, summaryTop + 45, { width: 70, align: 'right' });
    
    doc.text('Tax:', 350, summaryTop + 65);
    doc.text('₹0.00', 470, summaryTop + 65, { width: 70, align: 'right' });
    
    doc.fillColor(secondaryColor)
       .fontSize(12)
       .font('Helvetica-Bold')
       .text('Total Amount:', 350, summaryTop + 90);
    doc.text(`₹${order.totalAmount.toFixed(2)}`, 470, summaryTop + 90, { width: 70, align: 'right' });
    
    // Payment status with colored badge
    const statusTop = summaryTop + 120;
    const statusWidth = doc.widthOfString(order.paymentStatus.toUpperCase()) + 20;
    
    doc.fillColor(order.paymentStatus === 'paid' ? '#48BB78' : '#F56565')
       .roundedRect(350, statusTop, statusWidth, 20, 10)
       .fill();
    
    doc.fillColor('#FFFFFF')
       .fontSize(10)
       .font('Helvetica-Bold')
       .text(order.paymentStatus.toUpperCase(), 350 + (statusWidth - doc.widthOfString(order.paymentStatus.toUpperCase())) / 2, statusTop + 5);
    
    // Footer
    doc.fillColor(lightColor)
       .fontSize(8)
       .text('Thank you for shopping with ShopEase!', 50, doc.page.height - 50, { align: 'center' });
    doc.text('If you have any questions about this invoice, please contact support@shopease.com', 50, doc.page.height - 35, { align: 'center' });
    doc.text('© 2023 ShopEase. All rights reserved.', 50, doc.page.height - 20, { align: 'center' });

    doc.end();
  });
}

module.exports = generateInvoice;
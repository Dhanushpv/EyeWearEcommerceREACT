exports.orderplaced = function (userName, purchasedProducts, totalOrderPrice) {
    return new Promise(async (resolve, reject) => {
        try {
            // Create the product list HTML dynamically
            let productListHTML = '';
            purchasedProducts.forEach(product => {
                productListHTML += `
                    <p>
                        <strong>${product.name}</strong> (Quantity: ${product.quantity}) - Rs. ${product.price}
                    </p>
                `;
            });
            console.log("purchasedProducts",purchasedProducts)

            // Generate the email template
            let template = `
                <html>
                <head>
                <title>Order Confirmation</title>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; }
                    .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { display: flex; justify-content: space-between; align-items: center; }
                    .header img { height: 30px; }
                    .header a { color: #004B91; text-decoration: none; margin-left: 10px; }
                    .order-confirmation { font-size: 24px; font-weight: bold; margin-top: 20px; }
                    .order-number { font-size: 14px; color: #666666; }
                    .greeting { font-size: 18px; color: #E47911; margin-top: 20px; }
                    .message { font-size: 14px; margin-top: 10px; }
                    .delivery-info { border: 1px solid #CCCCCC; padding: 10px; margin-top: 20px; display: flex; justify-content: space-between; align-items: center; }
                    .delivery-info .left { font-size: 14px; }
                    .delivery-info .left .date { color: #008A00; font-weight: bold; }
                    .delivery-info .right { font-size: 14px; text-align: right; }
                    .button { display: block; width: 200px; margin: 20px auto; padding: 10px; background-color: #F0C14B; color: #111111; text-align: center; text-decoration: none; border: 1px solid #A88734; border-radius: 3px; font-size: 16px; }
                    .order-summary { margin-top: 20px; }
                    .order-summary h2 { font-size: 18px; color: #E47911; }
                    .order-summary p { font-size: 14px; margin: 5px 0; }
                    .order-summary .total { font-weight: bold; }
                    .footer { font-size: 12px; margin-top: 20px; }
                    .footer a { color: #004B91; text-decoration: none; }
                </style>
                </head>
                <body>
                <div class="container">
                    <div class="header">
                        <h1>NOAV</h1>
                        <div>
                            <a href="#">Your Orders</a>
                            <a href="#">Your Account</a>
                            <a href="#">NOAV</a>
                        </div>
                    </div>
                    <div class="order-confirmation">Order Confirmation</div>
                    <div class="order-number">Order #123-4567890-1234567</div>
                    <div class="greeting">Hi,${userName}</div>
                    <div class="message">
                        Thank you for your order. We'll send a confirmation when your order ships. Your estimated delivery date is indicated below. If you would like to view the status of your order or make any changes to it, please visit 
                        <a href="#">Your Orders</a> on NOAV.
                    </div>
                    <div class="delivery-info">
                        <div class="left">
                            Arriving: <span class="date">Thursday, August 29</span>
                            <br/>
                            Your shipping speed:
                            <br/>
                            <strong>One-Day Delivery at Rs. 99 per item. FREE with Prime</strong>
                        </div>
                        <div class="right">
                            Your order will be sent to:
                            <br/>
                            <strong>Sakthya <br/> BENGALURU, KARNATAKA <br/> India</strong>
                        </div>
                    </div>
                    <a class="button" href="#">View or manage order</a>
                    <div class="order-summary">
                        <h2>Order summary</h2>
                        <p>Order #123-4567890-1234567</p>
                        <p>Placed on ${new Date().toLocaleDateString()}</p>
                        ${productListHTML} <!-- Dynamically generated product list -->
                        <p class="total">Order Total: Rs.${totalOrderPrice}</p>
                    </div>
                    <div class="footer">
                        If you use a mobile device, you can receive notifications about the delivery of your package and track it from our free 
                        <a href="#">NOAV app</a>.
                        <br/>
                        To ensure your safety, the Delivery Agent will drop the package at your doorstep, ring the doorbell and then move back to maintain adequate distance while waiting for you to collect your package.
                        <br/>
                        We hope to see you again soon.
                        <br/>
                        <strong>NOAV</strong>
                    </div>
                </div>
                </body>
                </html>
            `;

            resolve(template);
        } catch (error) {
            reject(error);
        }
    });
};

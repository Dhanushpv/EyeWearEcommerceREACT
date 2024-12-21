exports.userblocked = function (Name,discription) {
    return new Promise(async (resolve, reject) => {
        try {
            // Create the product list HTML dynamically
           

            // Generate the email template
            let template = `
               <html>
                <head>
                    <title>Access Blocked</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #fff;
                        }
                        .container {
                            text-align: center;
                            border: 1px solid #ddd;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .container h1 {
                            font-size: 24px;
                            margin-bottom: 20px;
                        }
                        .container p {
                            font-size: 14px;
                            color: #333;
                            margin: 10px 0;
                        }
                        .container a {
                            color: #1a73e8;
                            text-decoration: none;
                            font-weight: bold;
                        }
                        .container a:hover {
                            text-decoration: underline;
                        }
                        .container .request-access {
                            border: 2px solid #fbbc05;
                            display: inline-block;
                            padding: 2px 4px;
                            margin-top: 10px;
                        }
                        .footer {
                            font-size: 12px;
                            color: #666;
                            margin-top: 20px;
                        }
                        .footer a {
                            color: #666;
                            text-decoration: none;
                            margin: 0 5px;
                        }
                        .footer a:hover {
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Access blocked: Your institution’s admin needs to review eLearning App</h1>
                        <p>You can't access this app until an admin at your institution reviews and configures access for it. If you need access to this app,</p>
                        <p class="request-access"><a href="#">Request Access</a></p>
                        <p>If you are a developer of eLearning App, see <a href="#">error details</a>.</p>
                        <p>Error 400: access_not_configured</p>
                    </div>
                    <div class="footer">
                        <a href="#">English (United States)</a>
                        <a href="#">Help</a>
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
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

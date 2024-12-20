let users = require('../db/models/user');
let Usertype = require('../db/models/usertypes');
let Categories = require('../db/models/Categories');
let Gender = require('../db/models/gender');
let AddData = require('../db/models/addProduct');
const { success_function, error_function } = require('../utli/ResponseHandler');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');




exports.registerUser = async function (req, res) {
    try {
        let body = req.body;
        console.log("body", body);
        let Password = req.body.password

        // Find user type by name
        let user_type = await Usertype.findOne({ usertype: body.usertype });
        if (!user_type) {
            return res.status(400).send({
                success: false,
                statuscode: 400,
                message: "Invalid user type"
            });
        }

        console.log("user type", user_type);
        let id = user_type._id;  // Get the ObjectId
        console.log("id", id);

        // Assign the ObjectId to the usertype field
        body.usertype = id;


        let salt = bcrypt.genSaltSync(10);
        let hashedpasword = bcrypt.hashSync(Password, salt);
        console.log("password : ", hashedpasword)

        let data = {
            name: body.name,
            email: body.email,
            phone_no: body.phone_no,
            password: hashedpasword,
            usertype: body.usertype

        }

        let existingUser = await users.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                statuscode: 400,
                message: "Email already exists"
            });
        }



        // Create the new user with the correct usertype ObjectId
        let userData = await users.create(data);
        console.log('userData', userData);

        let response = success_function({
            success: true,
            statuscode: 200,
            message: "User successfully added.",
            data: userData
        });
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        console.log("error: ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "Error adding user"
        });
        res.status(response.statuscode).send(response);
        return;
    }
}

exports.getUsertypes = async function (req, res) {
    try {

        let usertypes = await Usertype.find({ usertype: { $ne: 'Admin' } });
        console.log("usertypes :", usertypes);

        let response = success_function({
            success: true,
            statuscode: 200,
            data: usertypes,
            message: "User successfully added.",

        });
        res.status(response.statuscode).send(response);
        return;


    } catch (error) {

        console.log("error: ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "Error adding user"
        });
        res.status(response.statuscode).send(response);
        return;
    }


}

exports.soloUser = async function (req, res) {

    try {

        Singleid = req.params.id
        console.log("Singleid", Singleid);

        SingleData = await users.findOne({ _id: Singleid });
        console.log("SingleUser", SingleData);

        let response = success_function({
            success: true,
            statuscode: 200,
            data: SingleData,
            message: "successfully get the single data.."
        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,

            message: "error"
        })
        res.status(response.statuscode).send(response)
        return;
    }

}

exports.fetchingCategory = async function (req, res) {

    try {

        let categories = await Categories.find()
        console.log("categories", categories);

        let response = success_function({
            success: true,
            statuscode: 200,
            data: categories,
            message: "User successfully added.",

        });
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {

        console.log("error: ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "Error adding user"
        });
        res.status(response.statuscode).send(response);
        return;

    }

}

exports.fetchingGender = async function (req, res) {

    try {

        let gender = await Gender.find()
        console.log("categories", gender);

        let response = success_function({
            success: true,
            statuscode: 200,
            data: gender,
            message: "User successfully added.",

        });
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {

        console.log("error: ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "Error adding user"
        });
        res.status(response.statuscode).send(response);
        return;

    }

}

exports.addProducts = async (req, res) => {
    try {
        const body = req.body;
        let userId = req.params.id

        // Fetch related data
        const category = await Categories.findOne({ category: body.category });
        console.log("category", category)

        let category_id = category._id;
        console.log("category_id", category_id);
        body.category = category_id



        const gender = await Gender.findOne({ gender: body.gender });
        console.log("gender", gender)

        let gender_id = gender._id;
        console.log("gender_id", gender_id);
        body.gender = gender_id



        // Log the uploaded files to debug
        console.log("Uploaded Files:", req.files);  // Should show the files

        // Prepare images if files are uploaded
        const images = (req.files || []).map(file => ({
            url: file.path,  // Store the file path
            alt: req.body.altText || 'Product Image',  // Optional alt text
        }));
        body.images = images

        let data = {
            title: body.title,
            description: body.description,
            price: body.price,
            category: body.category,
            gender: body.gender,
            brand: body.brand,
            stock: body.stock,
            images: body.images,
            rating: body.rating,
            userId
        }


        const productData = await AddData.create(data);
        console.log(productData);
        res.status(200).send({ success: true, message: 'Product successfully added.', data: productData });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(400).send({ success: false, message: "Error adding product" });
    }
};

exports.allProducts = async (req, res) => {

    try {
        let productOverview = await AddData.find().populate('category').populate('gender');

        let response = success_function({
            success: true,
            statuscode: 200,
            data: productOverview,
            message: "User successfully added.",

        });
        res.status(response.statuscode).send(response);
        return;

    }

    catch (error) {

        console.log("error: ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "Error adding user"
        });
        res.status(response.statuscode).send(response);
        return;
    }
}

exports.viewAllProducts = async (req, res) => {
    try {
        // Assuming the seller's ID is available in req.user or req.seller (via middleware)
        const loggedInSellerId = req.params.id
        // Fetch products added by other sellers only
        let productOverview = await AddData.find({ userId: { $ne: loggedInSellerId } })
            .populate('category')
            .populate('gender');
        console.log("Logged-in seller ID:", loggedInSellerId);


        let response = success_function({
            success: true,
            statuscode: 200,
            data: productOverview,
            message: "Products fetched successfully.",
        });
        res.status(response.statuscode).send(response);
    } catch (error) {
        console.log("error: ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "Error fetching products",
        });
        res.status(response.statuscode).send(response);
    }
};

exports.SingleProductList = async (req, res) => {
    try {

        Singleid = req.params.id
        console.log("Singleid", Singleid);

        SingleData = await AddData.findOne({ _id: Singleid }).populate('category').populate('gender');
        console.log("SingleUser", SingleData);

        let response = success_function({
            success: true,
            statuscode: 200,
            data: SingleData,
            message: "successfully get the single data.."
        })
        res.status(response.statuscode).send(response)
        return;



    } catch (error) {
        console.log("error: ", error);
        let response = error_function({
            success: false,
            statuscode: 500,
            message: "Error fetching product"
        });
        res.status(response.statuscode).send(response);
        return;
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity, increment } = req.body;

        // Validate quantity
        if (!quantity || quantity < 1) {
            let response = error_function({
                success: false,
                statuscode: 400,
                message: "Quantity must be at least 1"
            });
            return res.status(response.statuscode).send(response);
        }

        // Fetch user
        const user = await users.findById(userId);
        if (!user) {
            let response = error_function({
                success: false,
                statuscode: 404,
                message: "User not found!"
            });
            return res.status(response.statuscode).send(response);
        }

        // Fetch product
        const product = await AddData.findById(productId);
        if (!product) {
            let response = error_function({
                success: false,
                statuscode: 404,
                message: "Product not found!"
            });
            return res.status(response.statuscode).send(response);
        }

        const price = product.price; // Get the price from the product

        // Check if the user already has a cart
        let cart = user.addCart[0]; // Assuming there's only one cart per user

        if (!cart) {
            // Create a new cart if none exists
            cart = { items: [], totalPrice: 0 };
            user.addCart.push(cart);
        }

        // Check if the product already exists in the cart
        const existingProductIndex = cart.items.findIndex(item => item.productId?.toString() === productId);

        if (existingProductIndex !== -1) {
            // Update quantity only if "increment" is true
            if (increment) {
                cart.items[existingProductIndex].quantity += quantity;
            }
        } else {
            // Add the new product to the cart
            cart.items.push({ productId, quantity, price });
        }

        // Recalculate the cart's total price
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        // Save updated user data
        await user.save();

        let response = success_function({
            success: true,
            statuscode: 200,
            data: user,
            message: "Item successfully added to the cart."
        });
        res.status(response.statuscode).send(response);
    } catch (error) {
        console.error("Error: ", error);
        let response = error_function({
            success: false,
            statuscode: 500,
            message: "Internal server error"
        });
        res.status(response.statuscode).send(response);
    }
};

exports.CartView = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch the user's cart, populate product details
        const user = await users.findById(userId).populate('cart.productId');

        if (!user) {
            let response = error_function({
                success: false,
                statuscode: 404,
                message: "User not found!",
            });
            return res.status(response.statuscode).send(response);
        }

        const cart = user.addCart[0]; // Assuming one cart per user
        if (!cart || cart.items.length === 0) {
            let response = success_function({
                success: true,
                statuscode: 200,
                data: [],
                message: "Cart is empty.",
            });
            return res.status(response.statuscode).send(response);
        }

        let response = success_function({
            success: true,
            statuscode: 200,
            data: cart,
            message: "Cart items fetched successfully.",
        });
        res.status(response.statuscode).send(response);
    } catch (error) {
        console.error("Error in cartView: ", error);
        let response = error_function({
            success: false,
            statuscode: 500,
            message: "Error fetching cart items.",
        });
        res.status(response.statuscode).send(response);
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { productId, newQuantity } = req.body;
        const userId  = req.params.id;  // Extract userId from params

        // Validate the quantity
        if (newQuantity <= 0) {
            return res.status(400).json({ success: false, message: "Quantity must be greater than zero." });
        }

        // Find the user by userId
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Assuming the cart is stored in user.addCart[0]
        const cart = user.addCart && user.addCart[0];
        if (!cart) {
            return res.status(400).json({ success: false, message: "Cart is empty!" });
        }

        // Find the product index in the cart
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart!" });
        }

        // Update the quantity of the product
        cart.items[productIndex].quantity = newQuantity;

        // Recalculate the total price (ensure the price is stored for each product)
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        // Save the updated cart back to the user's addCart array (ensure addCart is updated)
        await user.save();

        // Respond with the updated cart
        res.status(200).json({ success: true, message: "Cart updated successfully.", cart });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.SigleupdateCart = async (req, res) => {
    try {
        const { productId, newQuantity } = req.body;
        const userId  = req.params.id;  // Extract userId from params

        // Validate the quantity
        if (newQuantity <= 0) {
            return res.status(400).json({ success: false, message: "Quantity must be greater than zero." });
        }

        // Find the user by userId
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Assuming the cart is stored in user.addCart[0]
        const cart = user.addCart && user.addCart[0];
        if (!cart) {
            return res.status(400).json({ success: false, message: "Cart is empty!" });
        }

        // Find the product index in the cart
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart!" });
        }

        // Update the quantity of the product
        cart.items[productIndex].quantity = newQuantity;

        // Recalculate the total price (ensure the price is stored for each product)
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        // Save the updated cart back to the user's addCart array (ensure addCart is updated)
        await user.save();

        // Respond with the updated cart
        res.status(200).json({ success: true, message: "Cart updated successfully.", cart });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.CartView = async (req, res) => {
    try {
        // Fetch only the `addcart` field from all users
        let Cartview = await users.find();

        let response = success_function({
            success: true,
            statuscode: 200,
            data: Cartview,
            message: "Cart items fetched successfully.",
        });
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        console.log("error: ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "Error fetching cart items",
        });
        res.status(response.statuscode).send(response);
        return;
    }
};

exports.addWishList = async (req, res) => {
    try {
        const { userId, productId, action } = req.body;  // `action` will be either 'add' or 'remove'

        // Fetch the user
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        // Fetch the product
        const product = await AddData.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }

        // Handle add/remove logic
        if (action === 'add') {
            // Check if the product is already in the wishlist
            const existingWishlistItem = user.wishlist.find(item => item.productId === productId);
            if (existingWishlistItem) {
                return res.status(400).json({
                    success: false,
                    message: "Product already in wishlist!",
                });
            }

            // Add to wishlist
            user.wishlist.push({
                productId,
                title: product.title,
                price: product.price,
                isInWishlist: true, // Mark as added to wishlist
            });

            await user.save();
            return res.status(200).json({
                success: true,
                message: "Item successfully added to the wishlist.",
            });
        } else if (action === 'remove') {
            // Find and remove the product from the wishlist
            const wishlistIndex = user.wishlist.findIndex(item => item.productId === productId);
            if (wishlistIndex === -1) {
                return res.status(400).json({
                    success: false,
                    message: "Product not found in wishlist!",
                });
            }

            // Remove the item or mark it as not in wishlist
            user.wishlist[wishlistIndex].isInWishlist = false;  // Mark as removed
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Item successfully removed from the wishlist.",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid action!",
            });
        }

    } catch (error) {
        console.error("Error adding/removing from wishlist:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

exports.checkWishlistStatus = async (req, res) => {
    try {
        const { userId, productId } = req.query;

        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        const wishlistItem = user.wishlist.find(item => item.productId === productId);

        res.status(200).json({
            success: true,
            isInWishlist: wishlistItem?.isInWishlist || false,  // Return the `isInWishlist` flag
        });
    } catch (error) {
        console.error("Error checking wishlist status:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

exports.addAddress = async (req, res) => {
    try {
        const { firstName, pincode, flatDetails, streetDetails, landmark, city, state } = req.body;
        const userId = req.params.id;; // Assuming user ID from middleware

        if (!firstName || !pincode || !flatDetails || !streetDetails || !city || !state) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const newAddress = { firstName, pincode, flatDetails, streetDetails, landmark, city, state };

        const updatedUser = await users.findByIdAndUpdate(
            userId,
            { $push: { address: newAddress } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Address added successfully",
            address: newAddress,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.loadWishList = async (req, res) => {
    try {
        // Extract userId from request (e.g., query parameters, body, or headers)
        const userId = req.params.id; // Assuming userId is passed as a query parameter

        // Validate userId
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        // Fetch the user's wishlist
        const user = await users.findById(userId, 'wishlist'); // Fetch only the 'wishlist' field

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        console.log("Wishlist for user:", user.wishlist);

        // Send response with the user's wishlist
        res.status(200).json({
            success: true,
            message: "Wishlist retrieved successfully",
            data: user.wishlist, // Return only the wishlist
        });
    } catch (error) {
        console.error("Error loading wishlist:", error);
        res.status(500).json({
            success: false,
            message: "Failed to load wishlist",
            error: error.message,
        });
    }
};

exports.AddressLoad = async (req, res) => {

    try {
        // Extract userId from request (e.g., query parameters, body, or headers)
        const id = req.params.id; // Assuming userId is passed as a query parameter

        // Validate userId
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        // Fetch the user's wishlist
        const user = await users.findById(id, 'address'); // Fetch only the 'wishlist' field

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        console.log("address for user:", user.address);

        // Send response with the user's wishlist
        res.status(200).json({
            success: true,
            message: "address retrieved successfully",
            data: user.address, // Return only the wishlist
        });
    } catch (error) {
        console.error("Error loading wishlist:", error);
        res.status(500).json({
            success: false,
            message: "Failed to load wishlist",
            error: error.message,
        });
    }

}

exports.ProductMart = async (req, res) => {
    try {
        // Get the logged-in seller's ID from the request parameters
        const loggedInSellerId = req.params.id; // Or req.user.id if using middleware

        // Fetch products added by the logged-in seller only
        const productOverview = await AddData.find({ userId: loggedInSellerId })


        console.log("Logged-in seller ID:", loggedInSellerId);

        // Success response
        const response = success_function({
            success: true,
            statuscode: 200,
            data: productOverview,
            message: "Products fetched successfully.",
        });
        res.status(response.statuscode).send(response);
    } catch (error) {
        console.log("Error:", error);

        // Error response
        const response = error_function({
            success: false,
            statuscode: 400,
            message: "Error fetching products",
        });
        res.status(response.statuscode).send(response);
    }

}

exports.DeleteProduct = async (req, res) => {


    try {
        DeleteId = req.params.id
        console.log("DeleteId", DeleteId);

        deleteData = await AddData.deleteOne({ _id: DeleteId });
        console.log("deleteData", deleteData);

        let response = success_function({
            success: true,
            statuscode: 200,
            message: "successfully deleted.."
        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "error"
        })
        res.status(response.statuscode).send(response)
        return;

    }
}

exports.productupdation = async (req, res) => {
    try {
        let body = req.body;
        console.log("Request Body:", body);

        // Validate body data
        // if (!body.title || !body.price || !body.category || !body.gender) {
        //     throw new Error("Missing required fields: title, price, category, or gender.");
        // }

        // Find category by name
        const category = await Categories.findOne({ category: body.category });
        if (!category) throw new Error(`Category "${body.category}" not found.`);
        body.category = category._id;

        // Find gender by name
        const gender = await Gender.findOne({ gender: body.gender });
        if (!gender) throw new Error(`Gender "${body.gender}" not found.`);
        body.gender = gender._id;

        // Prepare the update object
        let data = {
            title: body.title,
            description: body.description,
            price: body.price,
            category: body.category,
            gender: body.gender,
            brand: body.brand,
            stock: body.stock
        };

        // Handle images update explicitly
        if (body.images && Array.isArray(body.images) && body.images.length > 0) {
            data.images = body.images;
        }

        // Get the update ID from request params
        let updateId = req.params.id;
        if (!updateId) throw new Error("Update ID is missing.");

        console.log("Update ID:", updateId);

        // Check if the document exists
        const existingDocument = await AddData.findById(updateId);
        if (!existingDocument) {
            throw new Error("Document not found with the provided ID.");
        }

        // Check for changes in the data
        if (JSON.stringify(existingDocument) === JSON.stringify(data)) {
            throw new Error("No changes detected in the provided data.");
        }

        // Perform the update
        let update_employee = await AddData.updateOne(
            { _id: updateId },
            { $set: data }
        );

        if (update_employee.matchedCount === 0) {
            throw new Error("No document found with the provided ID.");
        }

        if (update_employee.modifiedCount === 0) {
            throw new Error("No changes detected in the document.");
        }

        console.log("Update Result:", update_employee);

        // Send success response
        let response = success_function({
            success: true,
            statuscode: 200,
            data: update_employee,
            message: "Successfully updated."
        });
        res.status(response.statuscode).send(response);

    } catch (error) {
        console.error("Update Error:", error.message);

        // Send error response
        let response = error_function({
            success: false,
            statuscode: 400,
            message: error.message,
            data: null
        });
        res.status(response.statuscode).send(response);
    }
};

exports.buyNow = async (req, res) => {
    try {
        const { id: userId } = req.params;
        console.log("userId",userId)
        const products = req.body.products; // Array of products (productId, quantity)

        // Debugging logs
        console.log('Params:', req.params);
        console.log('Body:', req.body);

        // Validate inputs
        if (!userId || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'User ID and a list of products with quantities are required.' });
        }

        // Fetch the user
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Initialize variables for total order price and purchased products
        let totalOrderPrice = 0;
        let purchasedProducts = [];

        // Loop through each product in the order
        for (let productData of products) {
            const { productId, quantity } = productData;

            // Validate product data
            if (!productId || !quantity) {
                return res.status(400).json({ message: 'Each product must have a valid Product ID and Quantity.' });
            }

            // Fetch the product
            const product = await AddData.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productId} not found.` });
            }

            // Check if enough stock is available
            if (product.stock < quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}. Only ${product.stock} items available.` });
            }

            // Calculate total price for the product
            const productTotalPrice = product.price * quantity;
            totalOrderPrice += productTotalPrice;

            // Update stock
            product.stock -= quantity;
            await product.save();

            // Add product details to the purchased list
            purchasedProducts.push({
                productId: product._id,
                quantity,
                price: productTotalPrice,
                purchaseDate: new Date(),
            });
        }

        // Check if user already has a buyNow field, and update it
        if (user.buyNow) {
            // Append the new products to the existing array in buyNow
            user.buyNow.products.push(...purchasedProducts);
            user.buyNow.totalPrice += totalOrderPrice; // Update the total price
            user.buyNow.purchaseDate = new Date(); // Update the purchase date
        } else {
            // If the user doesn't have a buyNow field, create one
            user.buyNow = {
                products: purchasedProducts,
                totalPrice: totalOrderPrice,
                purchaseDate: new Date(),
            };
        }

        await user.save();

        // Respond with success
        res.status(200).json({
            message: 'Bulk purchase successful.',
            buyNow: user.buyNow,
            totalPrice: user.buyNow.totalPrice,
            purchasedProducts: purchasedProducts,
        });
    } catch (error) {
        console.error('Error in buyNow:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.fetchMensglass = async (req, res) => {
    try {
        // Find the ObjectId for 'Men' in the Gender collection
        const gender = await Gender.findOne({ gender: "Men" });
        if (!gender) {
            return res.status(404).json({
                success: false,
                message: "Gender 'Men' not found."
            });
        }

        // Find the ObjectId for 'Sunglasses' in the Category collection
        const category = await Categories.findOne({ category: "Sunglasses" });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category 'Sunglasses' not found."
            });
        }

        // Query the products with the ObjectId for gender and category
        const productOverview = await AddData.find({
            category: category._id, // Use the ObjectId from the Category collection
            gender: gender._id      // Use the ObjectId from the Gender collection
        })
        .populate('category')
        .populate('gender');

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: productOverview,
            message: "Men's sunglasses successfully fetched."
        });
        return;

    } catch (error) {
        console.error("Error:", error);

        res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Error fetching men's sunglasses",
            error: error.message
        });
        return;
    }
};

exports.searchProducts = async (req, res) => {
    const { q } = req.params; // Extract route parameter

    try {
        const products = await AddData.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.bestseller = async (req, res) => {

    try {
        const bestSeller = await users.aggregate([
          { $unwind: '$addCart' }, // Unwind the addCart array
          { $unwind: '$addCart.items' }, // Unwind the items array inside addCart
          {
            $group: {
              _id: '$addCart.items.productId', // Group by productId
              totalQuantity: { $sum: '$addCart.items.quantity' }, // Sum the quantities
            },
          },
          { $sort: { totalQuantity: -1 } }, // Sort by totalQuantity in descending order
          { $limit: 1 }, // Limit to the top product
        ]);
    
        if (bestSeller.length === 0) {
          return res.status(404).json({ message: 'No sales data available.' });
        }
    
        // Populate product details from the Products collection
        const productDetails = await AddData.findById(bestSeller[0]._id).select(
          'name price images description'
        );
    
        if (!productDetails) {
          return res.status(404).json({ message: 'Product not found.' });
        }
    
        res.status(200).json({
          productId: bestSeller[0]._id,
          totalQuantity: bestSeller[0].totalQuantity,
          productName: productDetails.name,
          price: productDetails.price,
          images: productDetails.images,
          description: productDetails.description,
        });
      } catch (error) {
        console.error('Error fetching best seller:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

exports.removeProductFromCart = async (req, res) => {
    const { userId } = req.params; // Assuming the user ID is in the params
    const { productId } = req.body; // Extract productId from the request body

    try {
        // Find and update the user's cart
        const updatedUser = await users.findByIdAndUpdate(
            userId,
            {
                $pull: { 'addCart.0.items': { productId } } // Pull the item with the matching productId from the first cart (index 0)
            },
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assuming addCart[0] is the cart you're working with
        const remainingItems = updatedUser.addCart[0].items;
        const updatedTotalPrice = remainingItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

        // Update the totalPrice field in the document
        updatedUser.addCart[0].totalPrice = updatedTotalPrice;
        await updatedUser.save();

        res.status(200).json({
            message: 'Product removed from cart successfully',
            cart: updatedUser.addCart[0], // Return the updated first cart
        });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error });
    }
};

exports.removeWishlist = async (req, res) => {
    const { userId } = req.params; // Assuming the user ID is in the params
    const { productId } = req.body; // Extract productId from the request body

    try {
        // Find and update the user's wishlist
        const updatedUser = await users.findByIdAndUpdate(
            userId,
            {
                $pull: { wishlist: { productId } } // Pull the item with the matching productId from the wishlist
            },
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Product removed from wishlist successfully',
            wishlist: updatedUser.wishlist, // Return the updated wishlist
        });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from wishlist', error });
    }
};



exports.totalBuyers = async (req, res) => {
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const buyerType = await Usertype.findOne({ usertype: 'Buyer' });
        console.log("buyerType :",buyerType)
        
        if (!buyerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const buyerCount = await users.countDocuments({ usertype: buyerType._id });
        console.log(buyerCount)
        
        res.json({ totalBuyers: buyerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
};

exports.totalseller = async (req, res) => {
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const sellerType = await Usertype.findOne({ usertype: 'Seller' });
        console.log("sellerType :",sellerType)
        
        if (!sellerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const sellerCount = await users.countDocuments({ usertype: sellerType._id });
        console.log(sellerCount)
        
        res.json({ totalSeller: sellerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
};

exports.totalorders = async (req, res) => {
    try {
      // Aggregate the total number of orders across all users
      const result = await users.aggregate([
        {
          $project: {
            // Ensure that "products" inside "buyNow" is treated as an empty array if it's missing or null
            orderCount: { $size: { $ifNull: ["$buyNow.products", []] } }, // Access the products array in buyNow
          },
        },
        {
          $group: {
            _id: null, // Group all users together
            totalOrders: { $sum: "$orderCount" }, // Sum up all the order counts
          },
        },
      ]);
  
      // Extract totalOrders from the result, default to 0 if no result
      const totalOrders = result.length > 0 ? result[0].totalOrders : 0;
  
      return res.status(200).json({ success: true, totalOrders });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
};
  
exports.totalRevenue = async (req, res) => {
    try {
      // Aggregate the total revenue across all users
      const result = await users.aggregate([
        {
          $project: {
            // Calculate the total price for each product in the 'buyNow.products' array
            totalPrice: {
              $sum: {
                $map: {
                  input: { $ifNull: ["$buyNow.products", []] }, // Ensure buyNow.products is not null
                  as: "product",
                  in: {
                    $multiply: ["$$product.price", "$$product.quantity"], // Multiply price by quantity
                  },
                },
              },
            },
          },
        },
        {
          $group: {
            _id: null, // Group all users together
            totalRevenue: { $sum: "$totalPrice" }, // Sum up all the totalPrice values
          },
        },
      ]);
  
      // Extract totalRevenue from the result, default to 0 if no result
      const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
  
      return res.status(200).json({ success: true, totalRevenue });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
};
  
exports.sellerDetails = async (req, res) =>{
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const sellerType = await Usertype.findOne({ usertype: 'Seller' });
        console.log("sellerType :",sellerType)
        
        if (!sellerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const sellerCount = await users.find({ usertype: sellerType._id });
        console.log(sellerCount)
        
        res.json({ totalSeller: sellerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
}
   
exports.BuyerDetails = async (req, res) =>{
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const BuyerType = await Usertype.findOne({ usertype: 'Buyer' });
        console.log("BuyerType :",BuyerType)
        
        if (!BuyerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const BuyerCount = await users.find({ usertype: BuyerType._id });
        console.log(BuyerCount)
        
        res.json({ totalBuyer: BuyerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
}

exports.SingleSellerproducts = async (req, res) => {

    try {
        // Assuming the userId is passed as a query parameter or part of the URL
        const { userId } = req.params; // Or use req.query.userId if passed as a query parameter
    
        // Validate userId
        if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
        }
    
        // Fetch products from AddData collection based on userId
        const products = await AddData.find({ userId });
    
        // If no products are found
        if (!products || products.length === 0) {
          return res.status(404).json({ message: 'No products found for this user' });
        }
    
        // Send the products as a response
        res.status(200).json({ success: true, products });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
      }

}




exports.orderItems = async (req, res) => {
    try {
        // Assuming the user's ID is available in the request (e.g., from authentication middleware)
        const userId = req.params.userId;

        // Fetch the user's orders from the "buyNow" section
        const user = await users.findById(userId).select('buyNow'); // Select only the "buyNow" field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the orders in the response
        res.status(200).json({ orders: user.buyNow });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


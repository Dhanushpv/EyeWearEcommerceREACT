const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const accessControl =require('../utli/accessControl').accessControl
const upload = require('../utli/uploads');

function  setAccessControl(access_types){
    return(req,res,next)=>{
        accessControl(access_types,req,res,next);
    }

}

router.post('/user',userController.registerUser);
router.get('/users',userController.getUsertypes);
// router.get('/Singleusertype/:id',userController.Singleusertype);
router.get('/individualUser/:id',userController.soloUser);
router.get('/fetchCategory',userController.fetchingCategory);
router.get('/fetchGender',userController.fetchingGender);
router.post('/uploadProducts/:id', upload.array('images', 5), userController.addProducts);
router.get('/fullProductList/:id',userController.viewAllProducts);
router.get('/AllProducts',userController.allProducts);
router.get('/SingleProductList/:id',userController.SingleProductList);
router.post('/addToCart',userController.addToCart);
router.get('/CartView',userController.CartView);
router.post('/addtowishlist',userController.addWishList);
router.post('/addAddress/:id', userController.addAddress);
router.get('/loadWishList/:id',userController.loadWishList)
router.get('/addAddressLoad/:id',userController.AddressLoad);
router.get('/MerchandiseHub/:id',userController.ProductMart);
router.delete('/DeleteProduct/:id',userController.DeleteProduct);
router.put('/productupdation/:id',userController.productupdation);
router.delete('/removeFromCart/:userId',userController.removeProductFromCart);
router.post('/orderCart/:id', userController.buyNow);
router.get('/status',userController.checkWishlistStatus);
router.post('/updateCart/:id',userController.updateCart);
router.get('/fetchMensglass',userController.fetchMensglass);
router.get('/search/:q', userController.searchProducts);
router.get('/bestseller',userController.bestseller);
router.get('/totalseller',userController.totalseller);
router.get('/totalbuyers',userController.totalBuyers);
router.delete('/removeWishlist/:userId',userController.removeWishlist);
router.get('/totalorders',userController.totalorders);
router.get('/totalRevenue',userController.totalRevenue);
router.get('/sellerDetails',userController.sellerDetails);
router.get('/BuyerDetails',userController.BuyerDetails);
router.get('/SingleSellerproducts/:userId',userController.SingleSellerproducts)
router.get('/orderItems/:userId',userController.orderItems)






module.exports = router;
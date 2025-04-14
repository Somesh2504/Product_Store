import express from 'express';
import { getProducts,updateProduct,createProduct,deleteProduct } from '../Controller/productController.js';


const router=express.Router();

router.post('/',createProduct)
router.delete('/:id',deleteProduct)
router.get('/',getProducts)
router.put('/:id',updateProduct)

export default router;
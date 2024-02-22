import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { Product, ProductModel } from '../models/productModel'

export const productRouter = express.Router()

productRouter.get('/', expressAsyncHandler(async(req,res) => {
    const products = await ProductModel.find()
    res.json(products)
  })
)

productRouter.get('/slug/:slug',
  expressAsyncHandler(async(req,res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug })
    if(product) res.json(product)
    else res.status(404).json({ messsage: 'Product Not Found' })
  })
)
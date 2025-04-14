import product from "../Models/product_model.js";
import mongoose from "mongoose";
export const getProducts = async (req, res) => {
  try {
    const prod = await product.find({});
    return res.status(200).json({ success: true, products: prod });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: "not deleted...." });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "invalid product id" });
  }
  const deleteProd = await product.findByIdAndDelete(id);
  return res
    .status(200)
    .json({ success: true, message: "product deleted successfully" });
};

export const createProduct = async (req, res) => {
  const prod = req.body;
  console.log(prod)
  if (!prod.Name || !prod.Price || !prod.Image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all feilds .." });
  }
  const newProd = new product(prod);
  try {
    await newProd.save();
    res.status(201).json({ success: true, message: newProd });
  } catch (error) {
    console.log("Error in saving product..." ,error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const prod = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "invalid product id" });
  }
  if (!prod) {
    return res
      .status(400)
      .json({ success: false, message: "give all details" });
  }
  try {
    const updatedproduct = await product.findByIdAndUpdate(id, prod, {
      new: true,
    });
    return res
      .status(200)
      .json({
        success: true,
        message: "product updated successfully",
        data: updatedproduct,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

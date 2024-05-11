import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductById,
  searchProduct
} from "../controllers/products.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

const router = Router();


  
// router.get("/", getProducts);
// router.get("/:productId", getProductById);
// // router.post("/", [verifyToken, isModerator], createProduct);
// router.post("/", createProduct);
// router.put("/:productId", [verifyToken, isModerator], updateProductById);
// router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

router.post("/", createProduct);
router
  .route('/:productId')
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById)

router.get('/search/:productName', searchProduct);
export default router;

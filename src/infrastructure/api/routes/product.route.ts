import express, {Request, Response} from "express";
import ProductRepository from "../../../modules/product-adm/repository/product.repository";
import CreateProductUseCase from "../../../modules/product-adm/usecase/add-product/add-product.usecase";

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository);
    try{
        const productDto ={
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock
        }

        const output = await usecase.execute(productDto);
        res.send(output);
    } catch(err){
        res.status(500).send(err)
    }
});
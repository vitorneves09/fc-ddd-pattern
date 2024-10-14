import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository-interface";
import ProductModel from "../db/sequelize/model/product.mode";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price
            },
            {
                where: {
                    id: entity.id
                }
            }
        );
    }

   async find(id: string): Promise<Product> {
       const productModel = await ProductModel.findOne({ where: { id } });
       
       return new Product(productModel.id,productModel.price,productModel.name);
    }

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();
        
        return products.map(product => {
            return new Product(product.id, product.price, product.name)
        })
    }

}
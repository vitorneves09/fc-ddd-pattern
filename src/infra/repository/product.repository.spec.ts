import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.mode";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequilize.addModels([ProductModel]);
        await sequilize.sync();
    });


    afterEach(async () => {
        await sequilize.close();
    });

    it("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", 10, "Product 1",);
        
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 10
        });

    });


    it("Should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", 10, "Product 1",);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 10
        });


        product.changeName("Product 2");
        product.changePrice(20);

        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 20
        });
    });


    it("Should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", 10, "Product 1",);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        
        const foundProduct = await productRepository.find("1");
        
        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    });


    it("Should find All  products", async () => {
        
        const productRepository = new ProductRepository();

        const product1 = new Product("1", 10, "Product 1",);
        await productRepository.create(product1);

        const product2 = new Product("2", 10, "Product 2",);
        await productRepository.create(product2);
        

        const foundProducts = await productRepository.findAll();
        const products = [product1, product2]
        

        expect(products).toEqual(foundProducts);

    });
}); 
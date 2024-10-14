import Customer from "../entity/customer";
import Product from "../entity/product";
import RepositoryInterface from "./repository-interface";

export default interface CustomerRepositoryInterface
    extends RepositoryInterface<Customer>{}
export default class Product {
    private _id: string;
    private _price: number;
    private _name: string; 

    constructor(id: string, price: number,name:string) {
        this._id = id;
        this._price = price; 
        this._name = name;
        this.validate();
    }

    validate(): boolean {
        
        if (this._id.length === 0 ) {
            throw new Error("Id is required");
        }

        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        
        if (this._price < 0) {
            throw new Error("Price must be greater than zero");
        }
    
        return true;
    }

    changeName(name: string){
        this._name = name;
        this.validate(); 
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }

    

}
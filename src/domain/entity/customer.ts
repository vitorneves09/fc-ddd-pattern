import Address from "../ValueObject/address";

export default class Customer{
    private _id: string;
    private _name: string;
    private _address!: Address; // Utilizando o conceito de Value Object 
    private _active: boolean = true; 
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    changeName(name : string) {
        this._name = name;
    }
    
    get Address(): Address{
        return this._address;
    }

    get name(): string {
        return this._name
    }

    get id(): string{
        return this._id;
    }

    /**
     * A entidade possui regra de negocio
     */
    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");    
        }

        this._active = true;
    }
    
    deActive() {
        this._active = false;
    }

    validate() {
        
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }

        if (this._id.length === 0 ) {
            throw new Error("Id is required");
        }
    }

    set Address(address: Address) {
        this._address = address;        
    }

    isActive() : boolean{
        return this._active;
    }

    get rewardPoints(): number{
        return this._rewardPoints;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

}

export interface IItem{
    name : string,
    brand : string,
    qty : number,
    price : number

}
export interface IOrder extends Document{
    _id ?: string,
    name : string,
    email: string,
    mobile : number,
    items : IItem[],
    tax : number,
    total : number,
    createdAt ?: string,
    updatedAt ?: string
}
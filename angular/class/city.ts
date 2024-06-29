import { Apartment } from "./apartment";

export class City{
    constructor(public _id:string, public name:string, public apartmentsInCity:Array<Apartment>){}
}
import { Advertiser } from "./advertiser";
import { Category } from "./category";
import { City } from "./city";

export class Apartment{
    constructor(public _id:string,public name:string, public description:string, public img:Array<string>,
        public category:Category, public city:City, public address:string, public beds:number, public additions:string,
        public price:number, public advertiser:Advertiser){
    }
}
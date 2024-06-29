export class Advertiser{
    constructor(
        public _id:string,
        public name:string,
        public email:string,
        public password:string,
        public token:string,
        public phone_1:string,
        public phone_2?:string){}
}
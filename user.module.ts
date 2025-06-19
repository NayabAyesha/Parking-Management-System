
export class UserModule { 
  
  emailId: string;
  password: string;

 constructor()
{
  this.emailId = "";
  this.password = "";
}
}

export interface IUserModule
{
  userId: number;
  emailId: string;
  password: string;
  createDate: string;
  projectNmae: string;
  fullName: number;
  mobileNo: boolean;
  extraId:number;
}

export interface ResponeModel
{
  message:string;
  result:boolean;
  data:any;
}

export interface Isite
{
  siteId:number;
  clientId:number;
  siteName:string;
  siteCity:string;
  clientAddress:string;
  sitePinCode:string;
  totalBuildings:number;
  createDate:string
}
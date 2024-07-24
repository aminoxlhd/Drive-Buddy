export interface OrderModel {
    id: string;
    studentId: string;
    teacherId: string;
    vehiculeId : string;
    category : string;
    price: string;
    status : string;
    address: string;
    date: string;
    createdAt: string;
  }  



  export interface OrderRequest {
    id: string;
    vehiculeId : string;
    category : string;
    price: string;
    address: string;
    date: string;
    createdAt: string;
  }  
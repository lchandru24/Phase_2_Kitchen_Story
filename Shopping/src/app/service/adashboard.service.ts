import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdashboardService {

  constructor(private _http:HttpClient) { }

  //Create Food Item
  postFoodItem(data:any){
    return this._http.post<any>("http://localhost:3000/products", data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //Get Food Item
  getFoodItem(){
    return this._http.get<any>("http://localhost:3000/products").pipe(map((res:any)=>{
      return res;
    }))
  }

  //Update Food Item
  updateFoodItem(data:any, id:number){
    return this._http.put<any>("http://localhost:3000/products/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //Delete Food Item
  deleteFoodItem(id:number){
    return this._http.delete<any>("http://localhost:3000/products/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }


}

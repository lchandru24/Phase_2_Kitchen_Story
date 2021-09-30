import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { AdashboardService } from 'src/app/service/adashboard.service';
import { FoodDataModel } from './adashboard.model';

@Component({
  selector: 'app-adashboard',
  templateUrl: './adashboard.component.html',
  styleUrls: ['./adashboard.component.css']
})
export class AdashboardComponent implements OnInit {

  allFoodData:any;
  formValue!: FormGroup;
  adashboardObj : FoodDataModel = new FoodDataModel;
  showAdd!:boolean;
  showbtn!:boolean;
  toggle:boolean=false;

  constructor(private formBuilder: FormBuilder, private api: AdashboardService, private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title:[''],
      price:[''],
      description:[''],
      category:[''],
      image:['']
    })
    this.getAllItems();
    let validate = sessionStorage.getItem("key");
    if(validate === "true"){
      this.toggle = true;
    }else{
      this.toggle = false;
    }
  }

  clickAddFoodItem(){
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }


  addFoodItem(){
    this.adashboardObj.title = this.formValue.value.title;
    this.adashboardObj.price = this.formValue.value.price;
    this.adashboardObj.description = this.formValue.value.description;
    this.adashboardObj.category = this.formValue.value.category;
    this.adashboardObj.image = this.formValue.value.image;

    this.api.postFoodItem(this.adashboardObj).subscribe(res=>{
      console.log(res);
      alert("Food Item Added Successfully!");
      this.formValue.reset()
      this.getAllItems();
    },
    err=>{
      alert("Something Went Wrong!");
    })
  }

  getAllItems(){
    this.api.getFoodItem().subscribe(res=>{
      this.allFoodData = res;
    })
  }

  deleteFoodItem(data:any){
    this.api.deleteFoodItem(data.id).subscribe(res=>{
      alert("Food Item Deleted Successfully!");
      this.getAllItems();
    })
  }

  onEditFoodItem(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.adashboardObj.id = data.id;
    this.formValue.controls['title'].setValue(data.title);
    this.formValue.controls['price'].setValue(data.price);
    this.formValue.controls['description'].setValue(data.description);
    this.formValue.controls['category'].setValue(data.category);
    this.formValue.controls['image'].setValue(data.image);
  }

  updateFoodItem(){
    this.adashboardObj.title = this.formValue.value.title;
    this.adashboardObj.price = this.formValue.value.price;
    this.adashboardObj.description = this.formValue.value.description;
    this.adashboardObj.category = this.formValue.value.category;
    this.adashboardObj.image = this.formValue.value.image;
    
    this.api.updateFoodItem(this.adashboardObj, this.adashboardObj.id).subscribe(res=>{
      alert("Food Item Updated Successfully!");
      this.formValue.reset()
      this.getAllItems();
    })

  }

  logout(){
    this.router.navigate(['login']);
    sessionStorage.setItem("key", "false");
    let validate = sessionStorage.getItem("key");
    if(validate === "true"){
      this.toggle = false;
    }else{
      this.toggle = true;
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Restaurent } from '../models/restaurent.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup;
  restaurentModelObject: Restaurent = new Restaurent;
  allRestaurentRecord: any;
  isUpdate!:boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.isUpdate=false;
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllRestaurentData();
  }

  clickAddRestaurant(){
    this.isUpdate=false;
    this.formValue.reset();
  }

  addRestaurent() {
    this.isUpdate=false;
    this.mappingObject();
    this.api.postRestaurentRecord(this.restaurentModelObject).subscribe(res => {
      alert("Record Added Success fully");
      this.formValue.reset();
      this.getAllRestaurentData();

    }, err => {
      alert("Kch to glat h .. chutiye");
    })

  }

  getAllRestaurentData() {
    this.isUpdate=false;
    this.api.getRestaurentRecord().subscribe(res => {
      this.allRestaurentRecord = res;
    })
  }

  onEdit(data: any) {
    this.isUpdate=true;
    this.restaurentModelObject.id=data.id;
    this.formValue.controls["name"].setValue(data.name);
    this.formValue.controls["email"].setValue(data.email);
    this.formValue.controls["mobile"].setValue(data.mobile);
    this.formValue.controls["address"].setValue(data.address);
    this.formValue.controls["services"].setValue(data.services);

  }

  deleteRestaurentData(data: any) {
    this.isUpdate=false;
    if (confirm("Do you want to Delete this Record ?")) {
      this.api.deleteRestaurentRecord(data.id).subscribe(res => {
        alert("Delete Record Successfully");
        this.getAllRestaurentData();
      })
    }
  }

  updateRestaurentData(){
    this.isUpdate=true;
    this.mappingObject();
    this.api.upadateRestaurentRecord(this.restaurentModelObject,this.restaurentModelObject.id).subscribe(res=>{
        alert("Data Update Successfully");
        this.getAllRestaurentData();
    },err=>{
      alert("Updation has some issues");
    })
  }


  private mappingObject() {
   
    this.restaurentModelObject.name = this.formValue.value.name;
    this.restaurentModelObject.email = this.formValue.value.email;
    this.restaurentModelObject.mobile = this.formValue.value.mobile;
    this.restaurentModelObject.address = this.formValue.value.address;
    this.restaurentModelObject.services = this.formValue.value.services;

  }

}



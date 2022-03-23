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
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllRestaurentData();
  }

  addRestaurent() {
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
    this.api.getRestaurentRecord().subscribe(res => {
      this.allRestaurentRecord = res;
    })
  }

  updateRestaurentData(data: any) {
    this.api.upadateRestaurentRecord(data, data.id).subscribe(res => {
      alert("Record Updated Successfully");
    })
  }

  deleteRestaurentData(data: any) {
    if (confirm("Do you want to Delete this Record ?")) {
      this.api.deleteRestaurentRecord(data.id).subscribe(res => {
        alert("Delete Record Successfully");
        this.getAllRestaurentData();
      })
    }
  }


  private mappingObject() {
    this.restaurentModelObject.name = this.formValue.value.name;
    this.restaurentModelObject.email = this.formValue.value.email;
    this.restaurentModelObject.mobile = this.formValue.value.mobile;
    this.restaurentModelObject.address = this.formValue.value.address;
    this.restaurentModelObject.services = this.formValue.value.services;
  }

}



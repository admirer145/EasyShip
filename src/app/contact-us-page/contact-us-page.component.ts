import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CustomFormValidations} from '../custom-form-validations.service'

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.css']
})
export class ContactUsPageComponent implements OnInit {
  contactUsForm: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.contactUsForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, CustomFormValidations.emailValidation]),
      'type': new FormControl('', Validators.required),
      'query': new FormControl('', Validators.required)
    });
  }

  contactUsFormEventHandler(): void{
    var formData = {
      name: this.contactUsForm.value.name,
      email:this.contactUsForm.value.email,
      type:this.contactUsForm.value.type,
      query: this.contactUsForm.value.query
    };
    console.log("Got the contact us form data ", formData);
    alert("Query Submitted Successfully");
    this.contactUsForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }


  form: FormGroup;
  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])],
      UserName: ['',Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])],
      password: ['',Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])],
      confirm: ['',Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])]
    })
  };

  onRegisterSubmit(){
    console.log("form submitted");
  }

  ngOnInit() {
  }

}

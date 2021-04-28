import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  subForm: FormGroup;
  errorMessage !: string;

  constructor(private formBuilder : FormBuilder,
              private router : Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.subForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName:[],
      lastName:[],
      dateOfBirth:[]
    });  
  }

  onSubmitForm() {
    
    const email = this.subForm.get('email').value;
    const password = this.subForm.get('password').value;
    const firstName = this.subForm.get('password').value;
    const lastName = this.subForm.get('password').value;
    const dateOfBirth = this.subForm.get('password').value;
    
    console.log('utilisateur :'+email+'password'+password);
    this.errorMessage="succès ou pas";
    this.router.navigateByUrl('/tabnav');

  }

}

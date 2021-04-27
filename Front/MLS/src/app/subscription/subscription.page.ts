import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  subForm: FormGroup;
  errorMessage !: string;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.subForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });  
  }

  onSubmitForm() {
    const email = this.subForm.get('email').value;
    const password = this.subForm.get('password').value;
    console.log('utilisateur :'+email+'password'+password);
    this.errorMessage="succès ou pas";
  }

}

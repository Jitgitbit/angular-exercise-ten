import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  forbiddenUsernames = ['Cris', 'Cristina', 'Maria'];
  genders = ['male', 'female'];

  signupForm: FormGroup;

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;         // set up a getter and use an alternative type casting syntax !!!
  }

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),  // Yes the good'old JS trick to binding for exceptions !!!
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit(){
    console.log(`signupForm says what?`,this.signupForm);
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);

    (<FormArray>this.signupForm.get('hobbies')).push(control);           // this is uncommon ! with FormArray you have to explicitly cast !
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){         // this "-1" is needed for checking presence of control.value in array !
      return {'nameIsForbidden': true};                               // because "-1" returns as true !
    }
    return null;
  }
}

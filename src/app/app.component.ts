import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  forbiddenUsernames = ['Cris', 'Cristina', 'Maria', 'cris', 'cristina', 'maria'];
  genders = ['male', 'female'];

  signupForm: FormGroup;

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;         // set up a getter and use an alternative type casting syntax !!!
  }

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),  // Yes the good'old JS trick to binding for exceptions !!!
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails), // Async validators have a seperate arg position
      }),                                                                                             // than regular validators !!!
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.signupForm.valueChanges.subscribe(
      (value) => console.log(`===>> Show me the userData:`,value.userData)
    );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(`======>>> Status says what?`,status)
    );
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
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {                                                 // the time-out is there to simulate the real delay a webserver would have responding !!!
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true});
        }else{
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  };
}

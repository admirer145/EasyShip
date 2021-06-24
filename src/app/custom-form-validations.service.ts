import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomFormValidations {

  constructor(){}

  static emailValidation(control: AbstractControl): ValidationErrors | null {
    const globalPattern = /(?=.*[@])(?=.*[.])/;
    return globalPattern.test(control.value) ? null : {emailValidation : true};
  }
  static passwordValidation(control: AbstractControl): ValidationErrors | null {
    const globalPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return globalPattern.test(control.value) ? null : {passwordValidation: true};
  }
  static phoneValidation(control: AbstractControl): ValidationErrors | null {
    const globalPattern = /^(?=.*[0-9])[0-9]{10,10}$/;
    return globalPattern.test(control.value) ? null : {phoneValidation: true};
  }
}

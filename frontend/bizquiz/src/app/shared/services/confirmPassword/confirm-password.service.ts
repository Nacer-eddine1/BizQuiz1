import { Injectable } from '@angular/core';
import { AbstractControl  } from '@angular/forms';
import { SignUpComponent } from '../../../sign-up/sign-up.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPasswordService {

  static MatchingPassword(control: AbstractControl){
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;
    const currentErrors = control.get('confirm_password')?.errors;
    const confirmControl = control.get('confirm_password');

    if(compare(password, confirmPassword)){
      confirmControl?.setErrors({...currentErrors, not_matching:true});
    }else{
      confirmControl?.setErrors(currentErrors || null)
    }
  }

}


function compare(password: string, confirmPassword: string){
  return password !== confirmPassword && confirmPassword !== '';
}
import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayout,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers:[
    LoginService,
    ToastrService
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  loginForm!: FormGroup;

  constructor( private router: Router, private loginService: LoginService, private toastService: ToastrService){

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

 send() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      // O objeto com next e error vai DENTRO dos parênteses
      next: () => this.toastService.success("Success Login!"),
      error: (err) => this.toastService.error("Login Failed!"),
      
    });
  }
 
navigate(){
  this.router.navigate(["/signup"]);
}

}

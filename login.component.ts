import { Component } from '@angular/core';
import { IUserModule, UserModule } from '../../model/user/user.module';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: UserModule = new UserModule();

  constructor(private userservice: UserService, private router: Router) {}

  Onloginuser() {
    this.userservice.loginuser(this.loginObj).subscribe(
      (res: IUserModule) => {
        console.log(res);
        localStorage.setItem("parkuser", JSON.stringify(res));
        this.userservice.LoggedUserData = res;
        this.router.navigate(['/Dashboard']);
      },
      (error: any) => {
        console.log("WRONG CREDENTIALS");
      }
    );
  }
}

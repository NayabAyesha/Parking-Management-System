import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'] 
})
export class LayoutComponent {
  userservice = inject(UserService);
  router = inject(Router); 

  logout() {
    localStorage.removeItem('parkuser');
    this.router.navigateByUrl("/login");
  }
}

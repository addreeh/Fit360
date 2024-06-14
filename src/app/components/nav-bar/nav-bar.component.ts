import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserToProfile } from '../../interfaces/UserToProfile';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private http: HttpClient, private router: Router, public authService: AuthService, private cookie: CookieService) { }

  user!: UserToProfile;


  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      let token = this.cookie.get("token");
      this.http.get<UserToProfile>(`http://localhost:8080/user/getUser/${token}`).subscribe((data) => {
        this.user = data;
        const fecha = new Date(this.user.joinDate).toLocaleDateString();
        this.user.joinDate = fecha;
        if (this.user.picture == null || this.user.picture == "") {
          this.user.picture = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
        } else {
          this.user.picture = "data:image/jpg;base64," + this.user.picture;
        }
      })
    }
  }

  isCurrentRoute(route: string): boolean {
    return this.router.isActive(route, true);
  }

  toggleAuthentication() {
    if (this.authService.isAuthenticated()) {
      console.log("DENTRO");

      this.authService.logout();
      this.router.navigate(["login"]);
    } else {
      this.router.navigate(["login"]);
    }
  }
}

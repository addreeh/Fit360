import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UserToProfile } from '../../interfaces/UserToProfile';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  type: string | undefined;
  user: UserToProfile | null = null;

  showErrorAlert = false;
  showEditComponent = false;


  constructor(private http: HttpClient, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });

    if (this.authService.isAuthenticated()) {
      let token = this.authService.getToken(); // Obtener el token del servicio de autenticación
      this.http.get<UserToProfile>(`http://localhost:8080/user/getUser/${token}`).subscribe((data) => {
        this.user = data;
        const fecha = new Date(this.user.joinDate).toLocaleDateString();
        this.user.joinDate = fecha;
        if (this.user.picture == null || this.user.picture == "")
          this.user.picture = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
        else
          this.user.picture = "data:image/jpg;base64," + this.user.picture;
      });
    }
  }
}

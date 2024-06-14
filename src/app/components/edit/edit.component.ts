import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { UserToProfile } from '../../interfaces/UserToProfile';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  user: UserToProfile | null = null;
  users: UserToProfile[] = [];
  selectedFile: File | null = null;
  tempPicture: string | null = null;
  oldPassword: string = '';
  newPassword: string = '';
  repeatPassword: string = '';
  selectedUser: UserToProfile | null = null;


  showErrorAlert = false;


  constructor(private http: HttpClient, private authService: AuthService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
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

        // Verificar si el usuario es administrador
        if (this.user.role === 'admin') {
          // Si es administrador, obtener todos los usuarios
          this.http.get<UserToProfile[]>(`http://localhost:8080/user/getAllUsers`).subscribe((users) => {
            // Aquí puedes manejar la respuesta y mostrar o usar la información de todos los usuarios
            this.users = users;

          });


        }
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Actualiza el archivo seleccionado

    if (this.selectedFile) {
      // Si hay un archivo seleccionado, lee su contenido como URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.tempPicture = e.target.result; // Almacena la imagen seleccionada temporalmente
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  convertToBase64(tempPicture: string | null): string | null {
    if (tempPicture) {
      // Verifica si la imagen es una URL base64 ya existente
      if (tempPicture.startsWith('data:image')) {
        return tempPicture.split(';base64,').pop() || null;
      } else {
        // Si la imagen no es una URL base64, conviértela a base64
        const base64Data = tempPicture.split(',')[1];
        return base64Data || null;
      }
    }
    return null;
  }

  submit() {
    if (this.tempPicture) {
      this.tempPicture = this.convertToBase64(this.tempPicture);
      this.user!.picture = new String(this.tempPicture);
    } else {
      if (this.user?.picture) {
        const urlPattern = /^(http|https):\/\/[^ "]+$/;
        if (urlPattern.test((this.user.picture).toString())) {
          this.user.picture = "";
        }
      }
    }
    this.http.post<any>(`http://localhost:8080/user/edit`, this.user)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          this.showErrorAlert = true;
        }
      );
  }

  password() {
    if (this.repeatPassword !== this.newPassword) {
      // Si las contraseñas no coinciden, muestra un mensaje de error o maneja la validación de alguna otra manera
      return;
    } else {
      const passwords = { id: this.user?.id, oldPassword: this.oldPassword, newPassword: this.newPassword };

      this.http.post<any>('http://localhost:8080/user/password', passwords)
        .subscribe(
          (response) => {
            console.log('Registro exitoso:', response);
            window.location.reload();
          },
          (error) => {
            console.error('Error en el registro:', error);
            this.showErrorAlert = true;
          }
        );
    }
  }

  reload() {
    window.location.reload();
  }

  showConfirmationPopup: boolean = false;
  showPopUp() {
    this.showConfirmationPopup = true;
  }

  showPopUpAdmin(usuario: any) {
    this.selectedUser = usuario;
    this.showConfirmationPopup = true;
  }

  definitiveDelete() {
    this.http.delete<any>(`http://localhost:8080/user/delete/${this.user!.id}`)
      .subscribe(
        (response) => {
          this.cookieService.delete('token');
          this.cookieService.deleteAll('token')
          this.router.navigate(['/']);
        },
        (error) => {
          this.showErrorAlert = true;
        }
      );
  }

  definitiveDeleteAdmin() {
    const userId = this.selectedUser?.id;
    this.http.delete<any>(`http://localhost:8080/user/delete/${userId}`)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          this.showErrorAlert = true;
        }
      );
  }

  cancelDelete() {
    this.showConfirmationPopup = false;
  }
}

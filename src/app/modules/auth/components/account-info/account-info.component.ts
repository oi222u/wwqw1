import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { User } from '../../interfaces/user-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { LoginService } from '../../services/login.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent {
  user$?: Observable<User>;
  user?: User;
  image$?: Observable<Image>;
  image?: Image;
  imagesProviderUrl: string;
  imageFileName: string = '';

  constructor(
    public dialog: MatDialog,
    private userService: LoginService,
    private imageService: ImageService,
    private jwtTokenService: JwtTokenService
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

  ngOnInit() {
    this.getUser();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    dialogMessage: string
  ): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {
        message: dialogMessage,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteImage()
        this.deleteUser();
      }
    });
  }

  getUser() {
    const userId = this.jwtTokenService.getAuthenticatedUserId();
    this.user$ = this.userService.getUser(userId).pipe(
      tap((user) => {
        this.user = user;
        this.getImage();
      })
    );
  }

  getImage() {
    if (this.user)
      this.image$ = this.imageService.getImageByUser(this.user.id).pipe(
        tap((image) => {
          this.image = image;
        })
      );
  }

  deleteUser() {
    if (this.user) this.user$ = this.userService.deleteUser(this.user.id);
  }

  deleteImage() {
    if (this.image)
      this.imageService.deleteImageById(this.image.id).subscribe();
  }

  changeUserInfo() {
    if (this.user)
      this.user$ = this.userService.editUser(this.user.id, this.user);
  }

  changeImage(event: any) {
    let imageFile: File = event.target.files[0];
    if (imageFile) {
      this.imageFileName = '-user.' + imageFile.name;

      const formData = new FormData();
      var imageModel = {
        name: this.imageFileName,
        userId: this.user!.id,
      } as Image;

      formData.append('imageFile', imageFile, this.imageFileName);
      formData.append('json', JSON.stringify(imageModel));

      this.deleteImage();
      this.imageService.uploadImageFile(formData).subscribe(() => {
        this.getImage();
      });
    }
  }
}

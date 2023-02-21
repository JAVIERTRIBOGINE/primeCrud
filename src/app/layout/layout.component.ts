import { ObserversModule } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiV1Service } from '../core/services/api-v1.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  value!: string;
  heroesList!: Observable<any>;
displayedColumns: string[] = ['id', 'name', 'power', 'movie', 'actions'];
  loading: boolean = false;
  isShowing: boolean = false;
  links: string[] = ['heroes'];
  constructor(private apiV1: ApiV1Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.getData();
  }

  toogleSideNav() {
    this.isShowing = !this.isShowing;
  }

  // getData() {
  //   this.heroesList = this.apiV1.getData();
  // }

  // get isLoading() {
  //   return this.loading;
  // }

  // public insertHero(){
  //   this.loading = true;
  //   this.apiV1.postData().subscribe(() => {
  //     this.loading = false;
  //     this.getData()
  //   });
  // }

  // openDialog(action: string) {
  //   const dialogRef = this.dialog.open(FormComponent, {
  //     // data: {name: this.name, animal: this.animal},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

}

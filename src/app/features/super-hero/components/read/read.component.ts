import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiV1Service } from 'src/app/core/services/api-v1.service';
import { Location } from '@angular/common';
import { SharedDeleteComponent } from 'src/app/shared/shared-delete/shared-delete.component';
import { SharedFormComponent } from 'src/app/shared/shared-form/shared-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent {
  value!: string;
  heroesList!: Observable<any>;
  displayedColumns: string[] = ['id', 'name', 'power', 'movie', 'actions'];
  loading: boolean = false;

  
  
  constructor(private apiV1: ApiV1Service, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.loading = true;
    this.getData();
  }

  getData() {
    
    this.heroesList = this.apiV1.getData(environment.baseUrl + environment.entities.heroes.url);
    this.heroesList.subscribe({
        error: (e) => console.warn(e),
        complete: () => this.loading = false,
      }
      
      );
  }

  get isLoading() {
    return this.loading;
  }

  deleteMessage(event: string) {
    const dialogRef = this.dialog.open( SharedDeleteComponent, {
      data: {id: event}
    });

    dialogRef.afterClosed().subscribe(result => {
      result? this.delete(event): console.log('The dialog was closed with no deletion');
    })
  }

  editForm(event: object) {
    const dialogRef = this.dialog.open( SharedFormComponent, {
      data: {
        columns: this.displayedColumns,
        editValues: event
      }
    });

    dialogRef.afterClosed().subscribe(result => {
          !!result ? this.update(result) : console.log('The dialog was closed ');
    })
  }

  addForm(add: boolean){
    const dialogRef = this.dialog.open( SharedFormComponent, {
      data: {
        columns: this.displayedColumns,
        editValues: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      !!result ? this.add(result) : console.log('The dialog was closed ');
    })
  }

  update(data: object){
    this.loading = true;
    this.apiV1.patchData(environment.baseUrl + environment.entities.heroes.url, data).subscribe(
      {
        complete: () => this.getData()
      }
    )
  }

  add(data: object){
    this.loading = true;
    this.apiV1.postData(environment.baseUrl + environment.entities.heroes.url, data).subscribe(
      {
        complete: () => this.getData()
      }
    )
  }

  delete(id:string){
    this.loading = true;
    this.apiV1.deleteData(environment.baseUrl + environment.entities.heroes.url, id).subscribe( 
      {
        complete: () => this.getData()
      }
    );
  }

  applyFilter(event: any){
    
    const filterName = event;
    if (filterName.length > 2 && filterName.length !== 0  ) this.heroesList =  this.apiV1.searchbyName(environment.baseUrl + environment.entities.heroes.url, environment.entities.heroes.filterKey, filterName);
    else this.getData();
    
  }
}



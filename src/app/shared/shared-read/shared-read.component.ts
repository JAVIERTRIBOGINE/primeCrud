import { UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiV1Service } from 'src/app/core/services/api-v1.service';



@Component({
  selector: 'app-shared-read',
  templateUrl: './shared-read.component.html',
  styleUrls: ['./shared-read.component.scss']
})
export class SharedReadComponent {
  @Input() entity!: string; 
  columnsTest!: string[];
  @Input() set columns(value:string[]) {
    this.columnsTest = value;
  }; 
  @Input() data!: Observable<any>; 
  @Input() isLoadingData!: boolean; 
  
  @Output() onFilterValue: EventEmitter<string> = new EventEmitter<string>(); 
  @Output() onDeleteAction: EventEmitter<string> = new EventEmitter<string>();
 
  @Output() onEditAction: EventEmitter<object> = new EventEmitter<object>();
  @Output() onAddAction: EventEmitter<boolean> = new EventEmitter<boolean>();

;
  constructor(private apiV1: ApiV1Service, public dialog: MatDialog) { }



  setFilterValue(event: any){
    
    const filterName = (event.target as HTMLInputElement).value;
    this.onFilterValue.emit(filterName);
  }


  addAction() {
    this.onAddAction.emit(true);
  }

  editAction(element: object) {
    this.onEditAction.emit(element);
  }

  deleteAction(id: string) {
    this.onDeleteAction.emit(id);
  }
}

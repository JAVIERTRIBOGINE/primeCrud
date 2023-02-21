import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.scss']
  
})
export class SharedFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  formColumns!: string [];
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SharedFormComponent>
    ){
      this.formColumns =  this.data.columns.map((object:string | unknown) => object);
      this.createForm();
    }

    ngOnInit(){
     

    }

    createForm(){
      // this.data.columns.pop();
      this.formColumns.pop();
      this.formColumns.shift();
      console.log(this.formColumns);
      
      this.formColumns.forEach((element: string) => {
        console.log("element: ", element);
        
        this.form.addControl(element, new FormControl( this.data.editValues?this.data.editValues[element]:'', [Validators.required]) );
      });
    }

    isFieldInvalid(control: string) {
      return this.form.get(control)!.hasError;
    }
  
    getErrorMessage(control: string) {
      if (this.form.get(control)?.hasError('minlength')){
        return 'Minimum length: 8 characters';
      }
      return this.form.get(control)!.hasError('required') ? 'please enter password': '';
    }

    onSubmit(){
      console.log("submit: ", this.form);
      let formValues = Object.assign(this.form.value);
      if(this.data?.editValues ) formValues.id = this.data.editValues['id'];
      
      this.dialogRef.close(formValues);
    }


    isFormInvalid() {
      return this.form!.invalid;
    }



}

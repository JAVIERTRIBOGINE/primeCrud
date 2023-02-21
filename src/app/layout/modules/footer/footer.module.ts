import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MaterialModule } from '../../../core/material/material.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [ FooterComponent ],
  exports: [ FooterComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    // BrowserModule
  ]
})
export class FooterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TagsInputComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    TagsInputComponent
  ]
})
export class SharedModule { }

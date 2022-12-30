import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NgxEditorModule } from 'ngx-editor';



@NgModule({
  declarations: [TagsInputComponent, TextInputComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ],
  exports: [
    TagsInputComponent,
    TextInputComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NgxEditorModule } from 'ngx-editor';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    TagsInputComponent,
    TextInputComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxEditorModule,
    MatDialogModule
  ],
  exports: [
    TagsInputComponent,
    TextInputComponent,
    CheckoutComponent
  ]
})
export class SharedModule { }

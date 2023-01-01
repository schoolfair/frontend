import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { MaterialModule } from '../material/material.module';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NgxEditorModule } from 'ngx-editor';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdsenseModule } from 'ng2-adsense';
import { environment } from 'src/environments/environment';

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
    MatDialogModule,
    AdsenseModule.forRoot({
      adClient: environment.adClientId,
    }),
  ],
  exports: [
    TagsInputComponent,
    TextInputComponent,
    CheckoutComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    }
  ]
})
export class SharedModule { }

import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Tags } from '../../models/tags';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {  MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss'],
})
export class TagsInputComponent implements OnInit {

  separatorKeysCodes: number[] =  [ENTER, COMMA];
  tagControl: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
  filteredTags: Observable<string[]>;
  allTags: string[] = Tags
  tags: string[] = [];

  @Input() Tags = new FormControl<string[]>([], [Validators.required]);

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    )
  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    console.log(value);

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.Tags.setValue(this.tags);

    this.tagControl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    this.Tags.setValue(this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    this.tags.push(event.option.viewValue);

    this.tagInput.nativeElement.value = '';

    this.Tags.setValue(this.tags);

    this.tagControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

}

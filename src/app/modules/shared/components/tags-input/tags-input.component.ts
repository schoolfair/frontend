import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { UntypedFormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Tags } from '../../models/tags';
import { MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent } from '@angular/material/legacy-autocomplete';
import { MatLegacyChipInputEvent as MatChipInputEvent } from '@angular/material/legacy-chips';


@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsInputComponent implements OnInit {

  separatorKeysCodes: number[] =  [ENTER, COMMA];
  tagControl: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
  filteredTags: Observable<string[]>;
  allTags: string[] = Tags
  tags: string[] = [];

  @Output() Tags = new EventEmitter<string[]>();

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

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.Tags.emit(this.tags);

    this.tagControl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    this.Tags.emit(this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
    this.Tags.emit(this.tags);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

}

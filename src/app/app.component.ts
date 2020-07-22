import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  opened: boolean = true;

  options = {
    pscValue : ['One', 'Two', 'Three'],
    naicsValue : ['Naics1','Niacs2']
  };

  pscFilteredOptions: Observable<string[]>;

  profileForm = this.fb.group({
    fromDate: [],
    pscValue: [''],
    naicsValue:[''],
    textValue: ['']
  });

  

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    this.pscFilteredOptions = this.valueChanges('pscValue');
  }

  valueChanges(formField){
    return this.profileForm.get(formField).valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value,formField))
    );
  }

  private _filter(value: string,formField: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options[formField].filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search-form',
  template: `
    <form [formGroup]="searchForm" (ngSubmit)="onSubmit()">
      <label>
        Search term:
        <input type="text" formControlName="term">
      </label>
      <button type="submit" [disabled]="searchForm.invalid">Search</button>
    </form>
  `,
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      term: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const term = this.searchForm.value.term;
      this.apiService.search(term).subscribe();
    }
  }
}

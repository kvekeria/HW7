import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <app-search-form></app-search-form>
    <app-search-result [data]="responseData" [source]="responseSource"></app-search-result>
  `,
})
export class AppComponent {
  responseData: any[] = [];
  responseSource: string = '';

  constructor(private apiService: ApiService) {}

  search(term: string) {
    this.apiService.search(term).subscribe((response: any) => {
      this.responseData = response.data;
      this.responseSource = response.source;
    });
  }
}

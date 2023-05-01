import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  template: `
    <div *ngIf="data">
      <p>Data retrieved from {{ source }}</p>
      <ul *ngIf="data.length">
        <li *ngFor="let item of data">{{ item }}</li>
      </ul>
      <p *ngIf="!data.length">No results found.</p>
    </div>
  `,
})
export class SearchResultComponent {
  @Input() data: any[] = [];
  @Input() source: string = '';
}

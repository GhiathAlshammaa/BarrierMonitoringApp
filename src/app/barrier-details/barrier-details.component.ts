// barrier-details.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barrier-details',
  templateUrl: './barrier-details.component.html',
  styleUrls: ['./barrier-details.component.css']
})
export class BarrierDetailsComponent {
  @Input() barrier: any; 

  constructor() { }
}

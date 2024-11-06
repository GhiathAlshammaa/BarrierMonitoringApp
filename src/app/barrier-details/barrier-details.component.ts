
import { Component, Input } from '@angular/core';
import { BarrierStatus } from './barrier-status';

@Component({
  selector: 'app-barrier-details',
  templateUrl: './barrier-details.component.html',
  styleUrls: ['./barrier-details.component.css']
})
export class BarrierDetailsComponent {
  @Input() barrier: any; 
  public BarrierStatus = BarrierStatus;
}

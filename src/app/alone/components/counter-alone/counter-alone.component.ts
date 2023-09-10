import { Component, Input } from '@angular/core';

@Component({
  selector: 'counter-alone',
  standalone: true,
  templateUrl: './counter-alone.component.html',
  styleUrls: ['./counter-alone.component.css']
})
export class CounterAloneComponent {

  //a traves del padre podemos modificar el valor de la propiedad
@Input()
public counter = 10;
}

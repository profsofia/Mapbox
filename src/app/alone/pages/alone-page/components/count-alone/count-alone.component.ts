import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'counter-alone',
  standalone: true,
  //imports: [CommonModule],
  templateUrl: './count-alone.component.html',
  styleUrls: ['./count-alone.component.css']
})
export class CountAloneComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    this.readToLocalStorage();
  }
  @Input()
  public counter = 10;



  saveToLocalStorage(){
    localStorage.setItem('counter',this.counter.toString());
  }

  readToLocalStorage(){
    localStorage.getItem('counter') ?? '10';
  }
}

import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-xterm',
  templateUrl: './xterm.component.html',
  styleUrls: ['./xterm.component.scss']
})
export class XtermComponent implements OnChanges{

  // private items = [];
  @ViewChild('myTerminal') terminalDiv: ElementRef;
  @Input() lines: string[];

  constructor() { }

  public newLine(e: string){
    this.lines.push(e);
    this.terminalDiv.nativeElement.scrollTop = this.terminalDiv.nativeElement.scrollHeight + 20;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.terminalDiv.nativeElement.scrollTop = this.terminalDiv.nativeElement.scrollHeight + 20;
  }
  
}

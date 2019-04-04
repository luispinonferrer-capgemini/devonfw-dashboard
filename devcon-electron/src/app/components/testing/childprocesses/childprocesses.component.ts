import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { XtermComponent } from '../xterm/xterm.component';
import { ElectronService } from '../../../providers/electron.service';

@Component({
  selector: 'app-childprocesses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './childprocesses.component.html',
  styleUrls: ['./childprocesses.component.scss']
})
export class ChildprocessesComponent implements AfterViewInit {

  // @ViewChild(XtermComponent) terminal: XtermComponent;
  private running = false;
  private stdout: string [] = [];

  constructor(private electronService: ElectronService, private ref: ChangeDetectorRef) { }

  ngAfterViewInit(){
    this.electronService.ipcRenderer.on('script-out', (event, data) => {
      console.log(event, data);
      // this.terminal.newLine(data);
      this.stdout = [...this.stdout, data];
      this.ref.detectChanges();
    });
    this.electronService.ipcRenderer.on('script-finished', (event, data) => {
      console.log(event, data);
      // this.terminal.newLine('Process finished!');
      this.stdout = [...this.stdout, 'Process finished!'];
      this.running = false;
      this.ref.detectChanges();
    });
  }

  onClickRun(){
    // tslint:disable-next-line:curly
    if (this.running) return;
    console.log('Running script!');
    this.running = true;
    // this.electronService.ipcRenderer.send('run-script');
    // this.electronService.ipcRenderer.send('install-devon-ide');
    // this.electronService.ipcRenderer.send('create-project');
  }

}

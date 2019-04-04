import { Component, OnInit, Inject, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DevconService } from '../../../providers/devcon.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElectronService } from '../../../providers/electron.service';
import Devon from '../../../../electron/providers/Devon';
import { Workspace } from '../../../../assets/model/workspace.schema';
import { DatabaseService } from '../../../providers/database.service';

@Component({
  selector: 'app-workpaces',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workpaces.component.html',
  styleUrls: ['./workpaces.component.scss']
})
export class WorkspacesComponent implements AfterViewInit, OnInit, OnDestroy {

  private name: string;
  private running = false;
  private stdout: string[] = [];
  private workspaces: Workspace[] = [];

  constructor(
    private devconService: DevconService,
    private dialog: MatDialog,
    private electronService: ElectronService,
    private ref: ChangeDetectorRef,
    private database: DatabaseService,
  ) { }

  ngOnInit(): void {
    console.log('component initialized');
    this.database.getWorkspaces().subscribe((workpaces) => (this.workspaces = workpaces));
  }

  ngAfterViewInit(): void {
    this.electronService.ipcRenderer.on(Devon.events.CONSOLE_OUTPUT, (event, data) => {
      console.log(event, data);
      this.stdout = [...this.stdout, data];
      this.ref.detectChanges();
    });
    this.electronService.ipcRenderer.on(Devon.events.PROCESS_FINISHED, (event, data) => {
      console.log(event, data);
      this.stdout = [...this.stdout, 'Process finished!'];
      this.running = false;
      this.ref.detectChanges();
    });
  }

  onClickCreate() {
    const dialogNameRef = this.dialog.open(WorkspaceNameDialog, {
      width: '250px',
      data: {name: this.name}
    });
    dialogNameRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      this.running = true;
      console.log(result);
      this.name = result;
      const newWorkspace = new Workspace();
      newWorkspace.name = result;
      this.database.addWorkspace(newWorkspace).subscribe((workspaces) => (this.workspaces = workspaces));
      this.devconService.createWorkspace(this.name);
    });
  }

  onClickOpenWorkspace(workspace: Workspace) {
    this.devconService.openWorkspace(workspace.name);
  }

  ngOnDestroy() {
    this.ref.detach();
    this.electronService.ipcRenderer.removeAllListeners(Devon.events.CONSOLE_OUTPUT);
    this.electronService.ipcRenderer.removeAllListeners(Devon.events.PROCESS_FINISHED);
  }

}

@Component({
  selector: 'workspace-name-dialog',
  templateUrl: 'workspace-name-dialog.html',
})
export class WorkspaceNameDialog {

  constructor(
    public dialogRef: MatDialogRef<WorkspaceNameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string}) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

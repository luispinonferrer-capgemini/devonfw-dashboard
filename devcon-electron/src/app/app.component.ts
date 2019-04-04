import { Component, ViewChild, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { SidenavService } from './sidenav.service';
import { MatSidenav } from '@angular/material';
import { DevconService } from './providers/devcon.service';
import { ToastService } from './providers/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private sidenavService: SidenavService,
    private devconService: DevconService,
    private toastService: ToastService,
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnInit(): void {
    // this.devconService.checkVersion().subscribe(version => {
    //   console.log(`Devcon running on v.${version}`);
    //   this.toastService.open(`Devcon v.${version} New version available!`, true, 'Update now');
    // });
  }

}

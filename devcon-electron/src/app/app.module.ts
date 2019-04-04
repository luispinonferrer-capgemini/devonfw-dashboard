import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppMaterialModule } from './app-material.module';
import { SidenavComponent } from './widgets/sidenav/sidenav.component';
import { ToolbarComponent } from './widgets/toolbar/toolbar.component';
import { SidenavService } from './sidenav.service';
import { CreateComponent } from './components/project/create/create.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { InfoComponent } from './components/dist/info/info.component';
import { ConsoleOutputComponent } from './widgets/console-output/console-output.component';
import { DatabaseService } from './providers/database.service';
import { DevconService } from './providers/devcon.service';
import { ToastService } from './providers/toast.service';
import { DocDevonComponent } from './components/doc/doc-devon/doc-devon.component';
import { SafePipe } from './pipes/SafePipe';
import { DocDevonguideComponent } from './components/doc/doc-devonguide/doc-devonguide.component';
import { ItemslistComponent } from './components/testing/itemslist/itemslist.component';
import { ChildprocessesComponent } from './components/testing/childprocesses/childprocesses.component';
import { XtermComponent } from './components/testing/xterm/xterm.component';
import { WorkspacesComponent, WorkspaceNameDialog } from './components/testing/workpaces/workpaces.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    SidenavComponent,
    ToolbarComponent,
    CreateComponent,
    WorkspaceComponent,
    InfoComponent,
    ConsoleOutputComponent,
    ItemslistComponent,
    DocDevonComponent,
    SafePipe,
    DocDevonguideComponent,
    ChildprocessesComponent,
    XtermComponent,
    WorkspacesComponent,
    WorkspaceNameDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [ElectronService, SidenavService, DatabaseService, DevconService, ToastService],
  bootstrap: [AppComponent],
  entryComponents: [WorkspaceNameDialog]
})
export class AppModule {}

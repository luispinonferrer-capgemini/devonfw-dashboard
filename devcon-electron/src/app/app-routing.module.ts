import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/project/create/create.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { InfoComponent } from './components/dist/info/info.component';
import { DocDevonComponent } from './components/doc/doc-devon/doc-devon.component';
import { DocDevonguideComponent } from './components/doc/doc-devonguide/doc-devonguide.component';
import { ItemslistComponent } from './components/testing/itemslist/itemslist.component';
import { ChildprocessesComponent } from './components/testing/childprocesses/childprocesses.component';
import { Workspace } from '../modules/workspace/Workspace';
import { WorkspacesComponent } from '../app/components/testing/workpaces/workpaces.component';

const routes: Routes = [
  {
    path: 'devon4jcreate',
    component: CreateComponent,
  },
  {
    path: 'workspace',
    component: WorkspaceComponent,
  },
  {
    path: 'distinfo',
    component: InfoComponent,
  },
  {
    path: 'databasetests',
    component: ItemslistComponent
  }, 
  {
    path: 'childprocessestests',
    component: ChildprocessesComponent
  }, 
  {
    path: 'doc-devon',
    component: DocDevonComponent
  }, 
  {
    path: 'doc-devonguide',
    component: DocDevonguideComponent
  }, 
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'test-workspaces',
    component: WorkspacesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

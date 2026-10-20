import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './features/landing/pages/inicio/inicio.component';
import { PortalDemoComponent } from './features/portal/pages/demo/portal-demo.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'portal-demo', component: PortalDemoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

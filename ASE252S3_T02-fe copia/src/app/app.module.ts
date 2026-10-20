import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { InicioComponent } from './features/landing/pages/inicio/inicio.component';

import { NavbarComponent } from './features/landing/components/navbar/navbar.component';
import { HeroComponent } from './features/landing/components/hero/hero.component';
import { ServiciosComponent } from './features/landing/components/servicios/servicios.component';
import { CursosComponent } from './features/landing/components/cursos/cursos.component';
import { NosotrosComponent } from './features/landing/components/nosotros/nosotros.component';
import { ContactoComponent } from './features/landing/components/contacto/contacto.component';
import { FooterComponent } from './features/landing/components/footer/footer.component';
import { PortalDemoComponent } from './features/portal/pages/demo/portal-demo.component';
import { TeacherWorkspaceComponent } from './features/portal/components/teacher-workspace/teacher-workspace.component';
import { ClassAssessmentMatrixComponent } from './features/portal/components/class-assessment-matrix/class-assessment-matrix.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,

    NavbarComponent,
    HeroComponent,
    ServiciosComponent,
    CursosComponent,
    NosotrosComponent,
    ContactoComponent,
    FooterComponent,
    PortalDemoComponent,
    TeacherWorkspaceComponent,
    ClassAssessmentMatrixComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule
  ],

  providers: [],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}

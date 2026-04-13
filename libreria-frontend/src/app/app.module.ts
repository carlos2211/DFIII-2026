import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule }          from './app-routing.module';
import { AppComponent }              from './app.component';
import { NavbarComponent }           from './components/navbar/navbar.component';
import { FooterComponent }           from './components/footer/footer.component';
import { LoginComponent }            from './components/login/login.component';
import { RegistroComponent }         from './components/registro/registro.component';
import { RecuperarPasswordComponent} from './components/recuperar-password/recuperar-password.component';
import { PerfilComponent }           from './components/perfil/perfil.component';
import { CatalogoComponent }         from './components/catalogo/catalogo.component';
import { CarritoComponent }          from './components/carrito/carrito.component';
import { DashboardComponent }        from './components/admin/dashboard/dashboard.component';
import { GestionLibrosComponent }    from './components/admin/gestion-libros/gestion-libros.component';
import { ClpPipe } from './pipes/clp.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarPasswordComponent,
    PerfilComponent,
    CatalogoComponent,
    CarritoComponent,
    DashboardComponent,
    GestionLibrosComponent,
     ClpPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

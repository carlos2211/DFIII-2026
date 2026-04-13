import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }  from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { LoginComponent }            from './components/login/login.component';
import { RegistroComponent }         from './components/registro/registro.component';
import { RecuperarPasswordComponent} from './components/recuperar-password/recuperar-password.component';
import { PerfilComponent }           from './components/perfil/perfil.component';
import { CatalogoComponent }         from './components/catalogo/catalogo.component';
import { CarritoComponent }          from './components/carrito/carrito.component';
import { DashboardComponent }        from './components/admin/dashboard/dashboard.component';
import { GestionLibrosComponent }    from './components/admin/gestion-libros/gestion-libros.component';

const routes: Routes = [
  { path: '',                    redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',               component: LoginComponent },
  { path: 'registro',            component: RegistroComponent },
  { path: 'recuperar-password',  component: RecuperarPasswordComponent },
  { path: 'perfil',              component: PerfilComponent,        canActivate: [AuthGuard] },
  { path: 'catalogo',            component: CatalogoComponent,      canActivate: [AuthGuard] },
  { path: 'carrito',             component: CarritoComponent,       canActivate: [AuthGuard] },
  { path: 'admin',               component: DashboardComponent,     canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/libros',        component: GestionLibrosComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**',                  redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserGuard} from './core/guards/user.guard';
import {AuthGuard} from './core/guards/auth.guard';


const routes: Routes = [
  {path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)},
  {path: 'auth', canActivate: [UserGuard], loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
  {path: '', redirectTo: '/auth/sign-in', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}), RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LabelComponent } from './components/label/label.component';
import { PlatformComponent } from './components/platform/platform.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'user', component: UserComponent,
    children: [{
      path: 'add',
      component: UserEditComponent  
    }]
  },
  { path: 'platform', component: PlatformComponent },
  { path: 'label', component: LabelComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  
}

import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
    { path: 'header', component: HeaderComponent },
    { path: 'about', component: AboutComponent },
    { path: 'skills', component: SkillsComponent },
    { path: 'projects', component: ProjectsComponent }, 
    { path: 'resume', component: ResumeComponent },
    { path: 'contact', component: ContactComponent }, 
    { path: 'footer', component: FooterComponent }, 
    { path: '**', redirectTo: 'about' },
    { path: 'contact_form', component: ContactComponent }
  ];
  

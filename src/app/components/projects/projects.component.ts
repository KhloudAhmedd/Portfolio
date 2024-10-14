import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  items = [
    { image: '/projectImage1.png', altText: 'First Project', title: 'First Slide', description: 'This is the first slide' },
    { image: '/projectImage2.png', altText: 'First Project', title: 'Second Slide', description: 'This is the second slide' },
    { image: '/projectImage3.png', altText: 'First Project', title: 'Third Slide', description: 'This is the third slide' },
    { image: '/projectImage4.png', altText: 'First Project', title: 'Fourth Slide', description: 'This is the fourth slide' },
    { image: '/projectImage5.png', altText: 'First Project', title: 'Fifth Slide', description: 'This is the fifth slide' }
  ];
}

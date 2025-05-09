import { Component } from '@angular/core';

@Component({
  selector: 'app-material-view',
  imports: [],
  templateUrl: './material-view.component.html',
  styleUrl: './material-view.component.scss'
})
export class MaterialViewComponent {
  projects = [
    { id: 1, name: 'Mark', location: 'Otto', type: 'mdo' },
    { id: 2, name: 'Jacob', location: 'Thornton', type: 'fat' },
    { id: 3, name: 'John', location: 'Doe', type: 'social' }
  ];

  nextId = 4;

  // Called when "Create" button is clicked
  onCreate() {
    const newProject = {
      id: this.nextId++,
      name: 'New Project',
      location: 'New Location',
      type: 'New Type'
    };

    this.projects.push(newProject);
    console.log('New project created:', newProject);
  }

  // (Optional) Add edit/delete methods as needed



}

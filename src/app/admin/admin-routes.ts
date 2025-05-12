import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./main-container/main-container.component').then(m => m.MainContainerComponent),
        children: [

            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'project/view',
                loadComponent: () => import('./project-view/project-view.component').then(m => m.ProjectViewComponent)
            },
            {
                path: 'project/add',
                loadComponent: () => import("./project-add/project-add.component").then(m => m.ProjectAddComponent)
            },
            {
                path: 'task/view',
                loadComponent: () => import('./task-view/task-view.component').then(m => m.TaskViewComponent)
            },
            {
                path: 'task/add',
                loadComponent: () => import('./task-add/task-add.component').then(m => m.TaskAddComponent)
            },
            {
                path: 'task/edit',
                loadComponent: () => import('./task-edit/task-edit.component').then(m => m.TaskEditComponent)
            },
            {
                path: 'progress/view',
                loadComponent: () => import('./progress-view/progress-view.component').then(m => m.ProgressViewComponent)
            },
            {
                path: 'progress/add',
                loadComponent: () => import('./progress-add/progress-add.component').then(m => m.ProgressAddComponent)
            },
            {
                path: 'progress/edit',
                loadComponent: () => import('./progress-edit/progress-edit.component').then(m => m.ProgressEditComponent)
            },
            {
                path: 'material/view',
                loadComponent: () => import('./material-view/material-view.component').then(m => m.MaterialViewComponent)
            },
            {
                path: 'material/add',
                loadComponent: () => import('./material-add/material-add.component').then(m => m.MaterialAddComponent)
            },
            {
                path: 'material/edit',
                loadComponent: () => import('./material-edit/material-edit.component').then(m => m.MaterialEditComponent)
            },


        ]
    }
];
// Ensure the routes array satisfies the Route[] type


@NgModule({

    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

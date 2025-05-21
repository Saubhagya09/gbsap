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
                path: 'project/edit',
                loadComponent: () => import("./project-edit/project-edit.component").then(m => m.ProjectEditComponent)
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
            {
                path: 'inventory/view',
                loadComponent: () => import('./inventory-view/inventory-view.component').then(m => m.InventoryViewComponent)
            },
            {
                path: 'inventory/add',
                loadComponent: () => import('./inventory-add/inventory-add.component').then(m => m.InventoryAddComponent)
            },
            {
                path: 'inventory/edit',
                loadComponent: () => import('./inventory-edit/inventory-edit.component').then(m => m.InventoryEditComponent)
            },

            {
                path: 'vendor/view',
                loadComponent: () => import('./vendor-list-view/vendor-list-view.component').then(m => m.VendorListViewComponent)
            },
            {
                path: 'vendor/add',
                loadComponent: () => import('./vender-list-add/vender-list-add.component').then(m => m.VenderListAddComponent)
            },
            {
                path: 'vendor/edit',
                loadComponent: () => import('./vendor-edit/vendor-edit.component').then(m => m.VendorEditComponent)
            },
            {
                path: 'purchase/book',
                loadComponent: () => import('./purchase-book/purchase-book.component').then(m => m.PurchaseBookComponent)
            },
            {
                path: 'purchase/bill',
                loadComponent: () => import('./purches-bill/purches-bill.component').then(m => m.PurchesBillComponent)
            },
            {
                path: 'sell/bill',
                loadComponent: () => import('./sell-bill/sell-bill.component').then(m => m.SellBillComponent)
            },
            {
                path: 'sell/book',
                loadComponent: () => import('./sell-book/sell-book.component').then(m => m.SellBookComponent)
            },
            {
                path: 'employment/view',
                loadComponent: () => import('./employment-view/employment-view.component').then(m => m.EmploymentViewComponent)
            },

            {
                path: 'employment/edit',
                loadComponent: () => import('./employment-edit/employment-edit.component').then(m => m.EmploymentEditComponent)
            },
            {
                path: 'employment/add',
                loadComponent: () => import('./employment-add/employment-add.component').then(m => m.EmploymentAddComponent)
            },
            {
                path: 'charts',
                loadComponent: () => import('./charts/charts.component').then(m => m.ChartComponent)
            },
             {
                path: 'profile',
                loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
            },
             {
                path: 'quotation/bill',
                loadComponent: () => import('./quotation-bill/quotation-bill.component').then(m => m.QuotationBillComponent)
            },
            {
                path: 'quotation/book',
                loadComponent: () => import('./quotation-book/quotation-book.component').then(m => m.QuotationBookComponent)
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

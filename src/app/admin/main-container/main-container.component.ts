import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { animate, state, style, transition, trigger } from '@angular/animations';
// import { MatCardModule } from '@angular/material/card';

export interface NavItem {
  displayName?: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  parent?: boolean;
  children?: NavItem[];
  show?: string;
  type?: boolean;
}

const navitems: NavItem[] = [
  {
    parent: false,
    displayName: 'Dashboard',
    iconName: 'dashboard',
    route: 'dashboard',
    show: 'N/A',
    type: true
  },
  {
    parent: true,
    displayName: 'Projects',
    iconName: 'folder_open',
    show: 'N/A',
    type: true,
    children: [
      {
        parent: false,
        displayName: 'View',
        iconName: 'visibility',
        route: 'project/view',
        show: 'N/A',
        type: true
      },
      {
        parent: false,
        displayName: 'Add',
        iconName: 'add_circle',
        route: 'project/add',
        show: 'N/A',
        type: true
      }
    ]
  },
  // {
  //   parent: true,
  //   displayName: 'Taskmanager',
  //   iconName: 'folder_open',
  //   show: 'N/A',
  //   type: true,
  // children: [
  //   {
  //     parent: false,
  //     displayName: 'View',
  //     iconName: 'visibility',
  //     route: 'task/view',
  //     show: 'N/A',
  //     type: true
  //   },
  //   {
  //     parent: false,
  //     displayName: 'Add',
  //     iconName: 'add_circle',
  //     route: 'task/add',
  //     show: 'N/A',
  //     type: true
  //   }
  // ]
  // },
  // {
  //   parent: true,
  //   displayName: 'Progress',
  //   iconName: 'folder_open',
  //   show: 'N/A',
  //   type: true,
  //   children: [
  //     {
  //       parent: false,
  //       displayName: 'View',
  //       iconName: 'visibility',
  //       route: 'progress/view',
  //       show: 'N/A',
  //       type: true
  //     },
  //     {
  //       parent: false,
  //       displayName: 'Add',
  //       iconName: 'add_circle',
  //       route: 'progress/add',
  //       show: 'N/A',
  //       type: true
  //     }
  //   ]
  // },
  // {
  //   parent: true,
  //   displayName: 'Material',
  //   iconName: 'folder_open',
  //   show: 'N/A',
  //   type: true,
  //   children: [
  //     {
  //       parent: false,
  //       displayName: 'View',
  //       iconName: 'visibility',
  //       route: 'material/view',
  //       show: 'N/A',
  //       type: true
  //     },
  //     {
  //       parent: false,
  //       displayName: 'Add',
  //       iconName: 'add_circle',
  //       route: 'material/add',
  //       show: 'N/A',
  //       type: true
  //     }
  //   ]
  // }
];

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, MatIconModule, FormsModule, MatMenuModule, MatSidenavModule, MatExpansionModule,],
  animations: [
    trigger('random', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('rotated => default', animate('300ms ease-out')),
      transition('default => rotated', animate('300ms ease-in'))
    ])
  ],
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent {
  topnavImg = '../../../assets/images/loginpage/Ennomart-png-logo-s.png';
  onhover: boolean = false;
  toggle: boolean = true;
  visible: boolean = false;
  sidenavWidth: number = 17;
  mobileQuery: any;
  mobileQueryTablet: any;
  step: number = 0;
  isMenuOpen: boolean = true;
  active: boolean = false;
  test: any;
  viewState: string = 'default'; // Renamed from Viewstate to viewState

  demo: any;

  constructor(private router: Router, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryTablet = media.matchMedia('(max-width: 820px)');
    media.matchMedia('(max-width: 600px)').addListener(changeDetectorRef.detectChanges);
    media.matchMedia('(max-width: 820px)').addListener(changeDetectorRef.detectChanges);
    this.demo = navitems;
  }

  rotateIcon(index: number) {
    this.active = true;
    this.test = index;
    this.viewState = this.viewState === 'default' ? 'rotated' : 'default'; // Update to viewState
  }

  check_feature(id: any) {
    return true;
  }

  navigateTo(path: string) {
    this.router.navigate(['/app', path]);
  }

  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  selectedCategory: string = '';
  searchText: string = '';
  foods: { viewValue: string }[] = [
    { viewValue: 'Pizza' },
    { viewValue: 'Burger' },
    { viewValue: 'Pasta' },
    { viewValue: 'Salad' },
  ];
  filteredFoods: { viewValue: string }[] = [...this.foods];

  onCategoryChange() {
    console.log('Category selected:', this.selectedCategory);
  }

  setStep(index: number) {
    this.step = index;
  }

  increase() {
    this.sidenavWidth = 17;
  }

  btnClick() {
    this.toggle = !this.toggle;
  }

  decrease() {
    this.sidenavWidth = 5;
  }

  filterFoods() {
    this.filteredFoods = this.foods.filter(food =>
      food.viewValue.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // goToProfile() {
  //   console.log('Navigating to profile...');
  // }

  logout() {
    this.router.navigate(['/login']);
  }

  goToTms() {
    // window.open('https://isutms.web.app/');
  }

  isProfileClicked = false;

  goToProfile() {
    this.isProfileClicked = !this.isProfileClicked;
  }


}

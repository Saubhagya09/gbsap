import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';

// FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';

// Chart Component
// import { TaskPieChartComponent } from '../task-pie-chart/task-pie-chart.component';
import { ChartComponent } from '../charts/charts.component';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';


// Interfaces
interface TaskSummary {
  toDo: number;
  inProgress: number;
  completed: number;
}

interface DashboardMetrics {
  totalProjects: number;
  totalTasks: number;
  taskSummary: TaskSummary;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    FullCalendarModule,
    ChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('bounceIn', [
      transition(':enter', [
        animate(
          '800ms ease-in',
          keyframes([
            style({ opacity: 0, transform: 'scale(0.3)', offset: 0 }),
            style({ opacity: 1, transform: 'scale(1.05)', offset: 0.5 }),
            style({ transform: 'scale(0.95)', offset: 0.7 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),

    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  selected: any;
  dashboardData: DashboardMetrics | null = null;
  loading = true;
  error: string | null = null;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    }
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadCalendarEvents();
  }

  private loadDashboardData(): void {
    this.http.get<DashboardMetrics>('https://backend-sm8m.onrender.com/dashboard').subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load dashboard data.';
        console.error('Dashboard API Error:', err);
        this.loading = false;
      }
    });
  }

  private loadCalendarEvents(): void {
    this.calendarOptions.events = [
      { title: 'Kickoff Meeting', date: '2025-05-17' },
      { title: 'Design Phase Deadline', date: '2025-05-21' },
      { title: 'Code Review', date: '2025-05-23' },
      { title: 'Client Demo', date: '2025-05-28' }
    ];
  }
}
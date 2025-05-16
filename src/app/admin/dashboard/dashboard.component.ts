import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Angular Material Modules (used for dashboard UI only)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';



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
    FullCalendarModule,
    MatCardModule,
    MatDatepickerModule,

  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  selected: any;
  onDateChange($event: Event) {
    throw new Error('Method not implemented.');
  }
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
  selectedDate: any;
  dateClass: any;

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
  //  selected = model<Date | null>(null);
}
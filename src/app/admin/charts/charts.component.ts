import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './charts.component.html',
})
export class ChartComponent implements OnChanges {
  Highcharts: typeof Highcharts = Highcharts;

  @Input() toDo = 0;
  @Input() inProgress = 0;
  @Input() completed = 0;
  @Input() totalTask = 0;
  // @Input() totalProject = 0;

  chartOptions: Highcharts.Options = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      chart: { type: 'pie' },
      title: { text: 'Task Status Breakdown' },
      series: [{
        type: 'pie',
        data: [
          { name: 'To Do', y: this.toDo },
          { name: 'In Progress', y: this.inProgress },
          { name: 'Completed', y: this.completed },
          { name: 'Total Task', y: this.totalTask },
          // { name: 'Total Project', y: this.totalProject }
        ]
      }]
    };
  }
}
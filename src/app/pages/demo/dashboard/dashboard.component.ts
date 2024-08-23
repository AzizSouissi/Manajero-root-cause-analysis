import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Sample static project data with realistic details
  projects = [
    { name: 'Project Alpha', status: 'Completed', startDate: '2023-01-10', endDate: '2023-04-20', progress: 100 },
    { name: 'Project Beta', status: 'In Progress', startDate: '2023-02-15', endDate: '2023-10-30', progress: 75 },
    { name: 'Project Gamma', status: 'Not Started', startDate: '2023-05-01', endDate: '2023-12-31', progress: 0 },
    { name: 'Project Delta', status: 'In Progress', startDate: '2023-03-01', endDate: '2023-08-15', progress: 50 },
    { name: 'Project Epsilon', status: 'Completed', startDate: '2023-06-01', endDate: '2023-09-30', progress: 100 },
    { name: 'Project Zeta', status: 'Completed', startDate: '2023-07-15', endDate: '2023-12-01', progress: 90 },
    { name: 'Project Eta', status: 'In Progress', startDate: '2023-08-01', endDate: '2023-11-30', progress: 60 },
    { name: 'Project Theta', status: 'Not Started', startDate: '2023-09-01', endDate: '2024-03-15', progress: 0 }
  ];

  // Card data
  totalProjects: number = 0;
  completedProjects: number = 0;
  inProgressProjects: number = 0;
  notStartedProjects: number = 0;

  // Variables for the chart
  statusChart: Chart | undefined;

  ngOnInit(): void {
    this.calculateCardData();
    this.createStatusChart();
  }

  // Calculate card data based on projects
  calculateCardData(): void {
    this.totalProjects = this.projects.length;
    this.completedProjects = this.projects.filter(p => p.status === 'Completed').length;
    this.inProgressProjects = this.projects.filter(p => p.status === 'In Progress').length;
    this.notStartedProjects = this.projects.filter(p => p.status === 'Not Started').length;
  }

  // Function to create the pie chart
  createStatusChart(): void {
    const statusCounts = this.getStatusCounts();
    this.statusChart = new Chart('statusChart', {
      type: 'pie',
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336'], // Green, Yellow, Red for statuses
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });
  }

  // Helper function to count occurrences of each status
  getStatusCounts(): Record<string, number> {
    return this.projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}

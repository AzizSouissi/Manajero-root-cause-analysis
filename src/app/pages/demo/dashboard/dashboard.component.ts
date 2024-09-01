import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Chart } from "chart.js";
import { RcaProject } from "../../../@core/models/rca";
import { RcaProjectService } from "../../../@core/services/rca.service";

@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild("pieChart", { static: true })
  pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild("barChart", { static: true })
  barChartCanvas!: ElementRef<HTMLCanvasElement>;

  chartPie: Chart<"pie", number[], string> | undefined;
  chartBar: Chart<"bar", number[], string> | undefined;

  rcaProjects: RcaProject[] = [];
  errorMessage: string = "";

  constructor(private rcaProjectService: RcaProjectService) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  getAllProjects(): void {
    this.rcaProjectService.getAllProjects().subscribe({
      next: (projects: RcaProject[]) => {
        this.rcaProjects = projects;
        this.createCharts();
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  createCharts(): void {
    this.destroyCharts(); // Destroy existing charts if any

    // Process data for pie chart
    const statusCounts = this.rcaProjects.reduce((acc, project) => {
      const status = project.status || "Unknown"; // Default to 'Unknown' if status is null/undefined
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const statusLabels = Object.keys(statusCounts);
    const statusData = Object.values(statusCounts);

    // Process data for bar chart
    const priorityCounts = this.rcaProjects.reduce((acc, project) => {
      const priority = project.priority || "Unknown"; // Default to 'Unknown' if priority is null/undefined
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const priorityLabels = Object.keys(priorityCounts);
    const priorityData = Object.values(priorityCounts);

    // Pie Chart
    if (this.pieChartCanvas) {
      this.chartPie = new Chart(this.pieChartCanvas.nativeElement, {
        type: "pie",
        data: {
          labels: statusLabels,
          datasets: [
            {
              data: statusData,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.label || "";
                  if (context.parsed) {
                    label += `: ${context.parsed} projects`;
                  }
                  return label;
                },
              },
            },
          },
        },
      });
    }

    // Bar Chart
    if (this.barChartCanvas) {
      this.chartBar = new Chart(this.barChartCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: priorityLabels,
          datasets: [
            {
              label: "Number of Projects by Priority",
              data: priorityData,
              backgroundColor: "#42A5F5",
              borderColor: "#1E88E5",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  destroyCharts(): void {
    if (this.chartPie) {
      this.chartPie.destroy();
    }
    if (this.chartBar) {
      this.chartBar.destroy();
    }
  }
}

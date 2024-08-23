import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import Chart, { ChartTypeRegistry } from "chart.js";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "app-results-chart",
  templateUrl: "./results-chart.component.html",
  styleUrls: ["./results-chart.component.scss"],
})
export class ResultsChartComponent implements OnChanges, OnDestroy {
  @Input() correctAnswers: number = 0;
  @Input() falseAnswers: number = 0;
  @ViewChild("resultChart", { static: true })
  resultChart!: ElementRef<HTMLCanvasElement>;

  chart: Chart<"pie", number[], string> | undefined;
  router: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.correctAnswers || changes.falseAnswers) {
      this.displayChart();
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  displayChart(): void {
    this.destroyChart(); // Destroy the previous chart if it exists

    if (this.resultChart) {
      this.chart = new Chart<"pie", number[], string>(
        this.resultChart.nativeElement,
        {
          type: "pie",
          data: {
            labels: ["Correct Answers", "False Answers"],
            datasets: [
              {
                data: [this.correctAnswers, this.falseAnswers],
                backgroundColor: ["#006400", "#8B0000"], // Dark green and dark red
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          },
        }
      );
    }
  }

  destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  navigateToComments() {
    this.router.navigate(["/comments"]);
  }
}

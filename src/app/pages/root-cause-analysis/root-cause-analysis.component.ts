import { Component } from "@angular/core";

@Component({
  selector: "ngx-root-cause-analysis",
  templateUrl: "./root-cause-analysis.component.html",
  styleUrls: ["./root-cause-analysis.component.scss"],
})
export class RootCauseAnalysisComponent {
  selectedPhase: string | null = null;

  selectPhase(phase: string) {
    this.selectedPhase = phase;
  }
}

import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DemoService } from "../../../@core/services/demo.service";
import { Router } from "@angular/router";
import { Demo } from "../../../@core/models/demo";
import { Observable } from "rxjs";

@Component({
  selector: "ngx-rca-demo",
  templateUrl: "./rca-demo.component.html",
  styleUrls: ["./rca-demo.component.scss"],
})
export class RcaDemoComponent implements OnInit {
  demo!: Demo;
  isEditing = false;
  isEditingStep1 = false;
  isEditingStep2 = false;
  isEditingStep3 = false;
  isEditingStep4 = false;
  isEditingWhy = false;
  isEditingWhat = false;
  isEditingHow = false;
  isEditingWhatIf = false;
  isAdding = false;
  newContent = "";
  originalDemo!: Demo;
  imgUrlWhat = "";

  editorModules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    imageUploader: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e: any) => resolve(e.target.result);
          reader.onerror = (error) => reject("Image upload failed");
          reader.readAsDataURL(file);
        });
      },
    },
  };

  constructor(
    private http: HttpClient,
    private demoService: DemoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDemo();
  }

  fetchDemo(): void {
    this.demoService.getDemo().subscribe(
      (data: Demo) => {
        this.demo = data;
        this.originalDemo = { ...data }; // Save a copy of the original demo for cancel functionality
      },
      (error) => {
        console.error("Error fetching demo", error);
      }
    );
  }

  navigateToQuiz(): void {
    this.router.navigate(["/pages/lean/root-cause-analysis/quizz"]);
  }

  toggleAdd(): void {
    this.isAdding = !this.isAdding;
  }

  saveNewContent(): void {
    const newDemo = { content: this.newContent };
    this.createDemo(newDemo).subscribe(
      (response) => {
        alert("New demo saved successfully");
        console.log("New demo saved successfully", response);
        this.isAdding = false;
        this.newContent = "";
        this.fetchDemo(); // Refresh the demo data
      },
      (error) => {
        console.error("Error saving new demo", error);
      }
    );
  }

  createDemo(demo: { content: string }): Observable<{ content: string }> {
    const URL = "YOUR_API_URL"; // Replace with your actual API URL
    return this.http.post<{ content: string }>(URL, demo);
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.saveEdit("introduction");
    }
    this.isEditing = !this.isEditing;
  }

  saveEdit(field: string): void {
    if (this.isEditing) {
      this.demoService.updateDemo(this.demo.id, this.demo).subscribe(
        (response) => {
          alert("Changes saved successfully");
          console.log("Update successful", response);
          this.fetchDemo(); // Refresh the demo data
        },
        (error) => console.error("Update failed", error)
      );
    }
    this.isEditing = false;
  }

  toggleEditStep(step: string): void {
    const editingStates = {
      step1: this.isEditingStep1,
      step2: this.isEditingStep2,
      step3: this.isEditingStep3,
      step4: this.isEditingStep4,
    };

    if (editingStates[step]) {
      this.saveEditStep(step);
    }
    this[`isEditing${step.charAt(0).toUpperCase() + step.slice(1)}`] =
      !editingStates[step];
  }

  saveEditStep(step: string): void {
    this.demoService.updateDemo(this.demo.id, this.demo).subscribe(
      (response) => {
        alert("Changes saved successfully");
        console.log("Update successful", response);
        this.fetchDemo(); // Refresh the demo data
      },
      (error) => console.error("Update failed", error)
    );
  }

  toggleEditTutorial(section: string): void {
    const editingStates = {
      why: this.isEditingWhy,
      what: this.isEditingWhat,
      how: this.isEditingHow,
      whatIf: this.isEditingWhatIf,
    };

    if (editingStates[section]) {
      this.saveContentTutorial(section);
    }
    this[`isEditing${section.charAt(0).toUpperCase() + section.slice(1)}`] =
      !editingStates[section];
    Object.keys(editingStates).forEach((key) => {
      if (key !== section) {
        this[`isEditing${key.charAt(0).toUpperCase() + key.slice(1)}`] = false;
      }
    });
  }

  saveContentTutorial(section: string): void {
    this.demoService.updateDemo(this.demo.id, this.demo).subscribe(
      (response) => {
        alert("Changes saved successfully");
        console.log("Update successful", response);
        this.fetchDemo(); // Refresh the demo data
      },
      (error) => console.error("Update failed", error)
    );
  }

  cancelEditTutorial(section: string): void {
    // Revert changes by restoring the originalDemo data
    this.demo = { ...this.originalDemo };

    // Reset editing states
    this.isEditingWhy = false;
    this.isEditingWhat = false;
    this.isEditingHow = false;
    this.isEditingWhatIf = false;
    this.isEditingStep1 = false;
    this.isEditingStep2 = false;
    this.isEditingStep3 = false;
    this.isEditingStep4 = false;

    console.log(`Editing canceled for section: ${section}`);
  }
}

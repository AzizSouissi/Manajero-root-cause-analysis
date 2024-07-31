import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as bootstrap from "bootstrap";
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
  editContent() {
    throw new Error("Method not implemented.");
  }
  sections = [
    {
      id: "root-cause-analysis",
      title: "Root Cause Analysis",
      content: "Content of Root Cause Analysis section",
    },
    {
      id: "stepper-section",
      title: "Stepper Section",
      content: "Content of Stepper Section",
    },
    {
      id: "ishikawa-diagram",
      title: "Ishikawa Diagram",
      content: "Content of Ishikawa Diagram section",
    },
    {
      id: "limitations-acceptations",
      title: "Limitations and Acceptations",
      content: "Content of Limitations and Acceptations section",
    },
  ];
  demo!: Demo;
  isEditing: boolean = false;
  isEditingStep1: boolean = false;
  isEditingStep2: boolean = false;
  isEditingStep3: boolean = false;
  isEditingStep4: boolean = false;
  isEditingWhy = false;
  isEditingWhat = false;
  isEditingHow = false;
  isEditingWhatIf = false;
  newContent: string = '';

  // Pagination settings
  p: number = 1;
  itemsPerPage: number = 3;

  pagedItems: any[] = []; // Initialize pagedItems array
  isAdding: boolean = false;
  currentPage = 1; // Current page number
  items = Array.from({ length: 50 }).map((_, i) => `Item ${i + 1}`);
  imgUrlWhat = "";

  editorModules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    imageUploader: {
      upload: file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            resolve(e.target.result);
          };
          reader.onerror = error => {
            reject('Image upload failed');
          };
          reader.readAsDataURL(file);
        });
      }
    }
  };
  constructor(
    private http: HttpClient,
    private demoService: DemoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.demoService.getDemo().subscribe(
      (data: Demo) => {
        this.demo = data;
        console.log(this.demo);
      },
      (error) => {
        console.error("Error fetching demo", error);
      }
    );
  }
  navigateToQuiz() {
    this.router.navigate(['/quiz']);
  }
  toggleAdd(): void {
    this.isAdding = !this.isAdding;
  }

  saveNewContent(): void {
    const newDemo = { content: this.newContent };
    this.createDemo(newDemo).subscribe(
      response => {
        console.log('New demo saved successfully', response);
        this.isAdding = false;
        this.newContent = '';
      },
      error => {
        console.error('Error saving new demo', error);
      }
    );
  }

  createDemo(demo: { content: string }): Observable<{ content: string }> {
    const URL = 'YOUR_API_URL'; // Replace with your actual API URL
    return this.http.post<{ content: string }>(URL, demo);
  }

  tryItOut(): void {
    // Your implementation for the "Try it out" button
  }

  // Toggle edit mode
  toggleEdit() {
    if (this.isEditing) {
      this.saveEdit("introduction");
    }
    this.isEditing = !this.isEditing;
  }

  // Save edited data
  saveEdit(field: string) {
    if (this.isEditing) {
      // Optionally, add validation or transformation logic here
      this.demoService.updateDemo(this.demo.id, this.demo).subscribe({
        next: (response) => {
          console.log("Update successful", response);
        },
        error: (error) => {
          console.error("Update failed", error);
        },
      });
    }
    this.isEditing = false;
  }

  toggleEditStep(step: string) {
    switch (step) {
      case "step1":
        if (this.isEditingStep1) {
          this.saveEdit("step1title");
          this.saveEdit("step1content");
        }
        this.isEditingStep1 = !this.isEditingStep1;
        break;
      case "step2":
        if (this.isEditingStep2) {
          this.saveEdit("step2title");
          this.saveEdit("step2content");
        }
        this.isEditingStep2 = !this.isEditingStep2;
        break;
      case "step3":
        if (this.isEditingStep3) {
          this.saveEdit("step3title");
          this.saveEdit("step3content");
        }
        this.isEditingStep3 = !this.isEditingStep3;
        break;
      case "step4":
        if (this.isEditingStep4) {
          this.saveEdit("step4title");
          this.saveEdit("step4content");
        }
        this.isEditingStep4 = !this.isEditingStep4;
        break;
    }
  }

  // Save edited data
  saveEditStep(field: string) {
    alert("are you sure ?");
    this.demoService.updateDemo(this.demo.id, this.demo).subscribe({
      next: (response) => {
        console.log("Update successful", response);
      },
      error: (error) => {
        console.error("Update failed", error);
      },
    });
  }

  // Toggle edit mode for a specific section
  toggleEditTutorial(section: string) {
    switch (section) {
      case "why":
        this.isEditingWhy = !this.isEditingWhy;
        if (this.isEditingWhy) this.isEditingWhat = false;
        break;
      case "what":
        this.isEditingWhat = !this.isEditingWhat;
        if (this.isEditingWhat) this.isEditingWhy = false;
        break;
      case "how":
        this.isEditingHow = !this.isEditingHow;
        if (this.isEditingHow) this.isEditingWhat = false;
        break;
      case "whatIf":
        this.isEditingWhatIf = !this.isEditingWhatIf;
        if (this.isEditingWhatIf) this.isEditingHow = false;
        break;
    }
  }

  // Save edited data
  saveContentTutorial(section: string) {
    this.demoService.updateDemo(this.demo.id, this.demo).subscribe({
      next: (response) => {
        console.log("Update successful", response);
      },
      error: (error) => {
        console.error("Update failed", error);
      },
    });
  }

  // Cancel editing and revert changes
  cancelEditTutorial(section: string) {}
}

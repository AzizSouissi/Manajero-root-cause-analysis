import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { RcaProject } from "../../../@core/models/rca";
import { RcaProjectService } from "../../../@core/services/rca.service";

@Component({
  selector: "ngx-rca",
  templateUrl: "./rca.component.html",
  styleUrls: ["./rca.component.scss"],
})
export class RcaComponent implements OnInit {
  rcaProjects: RcaProject[] = [];
  selectedProject: RcaProject | null = null;
  projectForm: FormGroup;
  isEditMode = false;
  errorMessage: string = "";

  constructor(
    private rcaProjectService: RcaProjectService,
    private fb: FormBuilder
  ) {
    this.projectForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      status: ["", Validators.required],
      owner: ["", Validators.required],
      rootCause: [""],
      correctiveAction: [""],
      category: [""],
      teamMembers: this.fb.array([]), // Initialize the teamMembers as a FormArray
      priority: ["", Validators.required],
      impact: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.rcaProjectService.getAllProjects().subscribe({
      next: (projects: RcaProject[]) => {
        this.rcaProjects = projects;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const projectData: RcaProject = this.projectForm.value;

      if (this.isEditMode && this.selectedProject) {
        this.rcaProjectService
          .updateProject(this.selectedProject.id!, projectData)
          .subscribe({
            next: (updatedProject: RcaProject) => {
              const index = this.rcaProjects.findIndex(
                (p) => p.id === updatedProject.id
              );
              if (index !== -1) {
                this.rcaProjects[index] = updatedProject;
              }
              this.resetForm();
            },
            error: (error) => (this.errorMessage = error),
          });
      } else {
        this.rcaProjectService.createProject(projectData).subscribe({
          next: (createdProject: RcaProject) => {
            this.rcaProjects.push(createdProject);
            this.resetForm();
          },
          error: (error) => (this.errorMessage = error),
        });
      }
    }
  }

  editProject(project: RcaProject): void {
    this.selectedProject = project;
    this.isEditMode = true;
    this.projectForm.patchValue(project);
    this.setTeamMembers(project.teamMembers || []);
  }

  setTeamMembers(members: string[]): void {
    const teamMembers = this.projectForm.get("teamMembers") as FormArray;
    teamMembers.clear();
    members.forEach((member) => teamMembers.push(this.fb.control(member)));
  }

  addTeamMember(): void {
    const teamMembers = this.projectForm.get("teamMembers") as FormArray;
    teamMembers.push(this.fb.control(""));
  }

  deleteProject(id: string): void {
    if (window.confirm("Are you sure you want to delete this project?")) {
      this.rcaProjectService.deleteProject(id).subscribe({
        next: () => {
          this.rcaProjects = this.rcaProjects.filter((p) => p.id !== id);
          this.errorMessage = "Deleting successful";
        },
        error: (error) => (this.errorMessage = "Deleting successful"),
      });
    }
  }

  resetForm(): void {
    this.projectForm.reset();
    this.selectedProject = null;
    this.isEditMode = false;
    this.projectForm.setControl("teamMembers", this.fb.array([]));
  }
}

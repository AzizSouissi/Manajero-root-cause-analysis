import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RcaProject } from '../../../@core/models/rca';
import { RcaProjectService } from '../../../@core/services/rca.service';

@Component({
  selector: 'ngx-rca',
  templateUrl: './rca.component.html',
  styleUrls: ['./rca.component.scss']
})
export class RcaComponent implements OnInit {
  rcaProjects: RcaProject[] = [];
  selectedProject: RcaProject | null = null;
  projectForm: FormGroup;
  isEditMode = false;
  errorMessage: string = '';

  constructor(
    private rcaProjectService: RcaProjectService,
    private fb: FormBuilder
  ) {
    // Initialize the project form
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      owner: ['', Validators.required],
      rootCause: [''],
      correctiveAction: [''],
      category: [''],
      teamMembers: [''],
      priority: ['', Validators.required],
      impact: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  // Fetch all RCA projects
  getAllProjects(): void {
    this.rcaProjectService.getAllProjects().subscribe({
      next: (projects: RcaProject[]) => {
        this.rcaProjects = projects;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  // Handle project creation
  onSubmit(): void {
    if (this.projectForm.valid) {
      const projectData: RcaProject = this.projectForm.value;

      if (this.isEditMode && this.selectedProject) {
        // Update existing project
        this.rcaProjectService.updateProject(this.selectedProject.id!, projectData).subscribe({
          next: (updatedProject: RcaProject) => {
            const index = this.rcaProjects.findIndex(p => p.id === updatedProject.id);
            if (index !== -1) {
              this.rcaProjects[index] = updatedProject;
            }
            this.resetForm();
          },
          error: (error) => (this.errorMessage = error),
        });
      } else {
        // Create new project
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

  // Select a project to edit
  editProject(project: RcaProject): void {
    this.selectedProject = project;
    this.isEditMode = true;
    this.projectForm.patchValue(project);
  }

  // Delete a project
  deleteProject(id: string): void {
    this.rcaProjectService.deleteProject(id).subscribe({
      next: () => {
        this.rcaProjects = this.rcaProjects.filter(p => p.id !== id);
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  // Reset the form and exit edit mode
  resetForm(): void {
    this.projectForm.reset();
    this.selectedProject = null;
    this.isEditMode = false;
  }
}

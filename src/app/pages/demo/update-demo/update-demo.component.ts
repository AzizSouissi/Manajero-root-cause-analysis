import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Demo } from "../../../@core/models/demo";
import { DemoService } from "../../../@core/services/demo.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ngx-update-demo",
  templateUrl: "./update-demo.component.html",
  styleUrls: ["./update-demo.component.scss"],
})
export class UpdateDemoComponent implements OnInit {
  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private demoService: DemoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: ["", Validators.required],
      introduction: ["", Validators.required],
      step1title: ["", Validators.required],
      step1content: ["", Validators.required],
      step2title: ["", Validators.required],
      step2content: ["", Validators.required],
      step3title: ["", Validators.required],
      step3content: ["", Validators.required],
      step4title: ["", Validators.required],
      step4content: ["", Validators.required],
      example: ["", Validators.required],
      why: ["", Validators.required],
      what: ["", Validators.required],
      how: ["", Validators.required],
      whatif: ["", Validators.required],
    });
  }

  onSubmit(): void {
    // if (this.updateForm.valid) {
    //   this.demoService.updateDemo(this.updateForm.value).subscribe(
    //     (response) => {
    //       console.log("Demo updated successfully!", response);
    //       this.updateForm.reset();
    //       this.router.navigate(["/rca-demo"]);
    //     },
    //     (error) => {
    //       console.error("Error updating demo", error);
    //     }
    //   );
    // }
  }
}

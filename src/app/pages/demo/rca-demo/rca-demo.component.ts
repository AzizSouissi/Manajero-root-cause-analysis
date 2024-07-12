import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as bootstrap from "bootstrap";
import { DemoService } from "../../../@core/services/demo.service";
import { Router } from "@angular/router";
import { Demo } from "../../../@core/models/demo";

@Component({
  selector: "ngx-rca-demo",
  templateUrl: "./rca-demo.component.html",
  styleUrls: ["./rca-demo.component.scss"],
})
export class RcaDemoComponent implements OnInit {
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

  // Pagination settings
  p: number = 1;
  itemsPerPage: number = 3;

  pagedItems: any[] = []; // Initialize pagedItems array

  currentPage = 1; // Current page number
  items = Array.from({ length: 50 }).map((_, i) => `Item ${i + 1}`);
  imgUrlWhat = "";
  constructor(
    private http: HttpClient,
    private demoService: DemoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setupShowMoreFunctionality();
    this.setupCameraIconClickHandler();
    this.setPage(1);
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
  setPage(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.itemsPerPage - 1,
      this.items.length - 1
    );

    this.pagedItems = this.items.slice(startIndex, endIndex + 1);
  }

  pageChanged(event: any) {
    console.log("Page changed to: " + event.page);
    const startIndex = (event.page - 1) * 3;
    const endIndex = startIndex + 3;
    console.log(
      "Displaying items from index " + startIndex + " to " + endIndex
    );
    console.log(this.items.slice(startIndex, endIndex));
  }

  private setupShowMoreFunctionality(): void {
    const showMoreButtons = document.querySelectorAll(".show-more");

    showMoreButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const expandable = this.parentElement.querySelector(".expandable");
        expandable.classList.toggle("open");

        if (expandable.classList.contains("open")) {
          this.textContent = "Show less";
        } else {
          this.textContent = "Show more";
        }
      });
    });
  }

  private setupCameraIconClickHandler(): void {
    const cameraIcons = document.querySelectorAll(".bi-camera");

    const imageUrls = ["assets/images/fishbone.png", "assets/images/rcaex.png"];

    cameraIcons.forEach((icon, index) => {
      icon.addEventListener("click", function () {
        const imageUrl = imageUrls[index];
        const modalId = this.getAttribute("data-target");
        const modalElement = document.querySelector(modalId);

        if (imageUrl && modalElement) {
          const modalImage = modalElement.querySelector(
            ".modal-body img"
          ) as HTMLImageElement;

          if (modalImage) {
            modalImage.src = imageUrl;
            const modal = new bootstrap.Modal(modalElement as HTMLElement);
            modal.show();
          }
        }
      });
    });
  }
}

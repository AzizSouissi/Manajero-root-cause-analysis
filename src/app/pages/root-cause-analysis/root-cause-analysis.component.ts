import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as bootstrap from "bootstrap";

@Component({
  selector: "ngx-root-cause-analysis",
  templateUrl: "./root-cause-analysis.component.html",
  styleUrls: ["./root-cause-analysis.component.scss"],
})
export class RootCauseAnalysisComponent implements OnInit {

  sections = [
    { id: 'root-cause-analysis', title: 'Root Cause Analysis', content: 'Content of Root Cause Analysis section' },
    { id: 'stepper-section', title: 'Stepper Section', content: 'Content of Stepper Section' },
    { id: 'ishikawa-diagram', title: 'Ishikawa Diagram', content: 'Content of Ishikawa Diagram section' },
    { id: 'limitations-acceptations', title: 'Limitations and Acceptations', content: 'Content of Limitations and Acceptations section' }
  ];

  // Pagination settings
  p: number = 1;
  itemsPerPage: number = 3;
  
  pagedItems: any[] = []; // Initialize pagedItems array
 
  currentPage = 1; // Current page number
  items = Array.from({length: 50}).map((_, i) => `Item ${i + 1}`);
  imgUrlWhat=''
  constructor(private http: HttpClient) { 
    
  }

  ngOnInit(): void {

    this.setupShowMoreFunctionality();
    this.setupCameraIconClickHandler();
    this.setPage(1);
  }
  setPage(page: number) {
    // Calculate starting and ending index for the current page
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.items.length - 1);

    // Extract the current page items
    this.pagedItems = this.items.slice(startIndex, endIndex + 1);
  }

  pageChanged(event: any) {
    console.log('Page changed to: ' + event.page);
    // Example: Fetch data from an API based on the page number
    // Replace with your actual data fetching logic
    // For demonstration purposes, just logging the items for the new page
    const startIndex = (event.page - 1) * 3;
    const endIndex = startIndex + 3;
    console.log('Displaying items from index ' + startIndex + ' to ' + endIndex);
    console.log(this.items.slice(startIndex, endIndex));
  }

  private setupShowMoreFunctionality(): void {
    const showMoreButtons = document.querySelectorAll('.show-more');

    showMoreButtons.forEach(button => {
      button.addEventListener('click', function() {
        const expandable = this.parentElement.querySelector('.expandable');
        expandable.classList.toggle('open');

        if (expandable.classList.contains('open')) {
          this.textContent = 'Show less';
        } else {
          this.textContent = 'Show more';
        }
      });
    });
  }



  private setupCameraIconClickHandler(): void {
    const cameraIcons = document.querySelectorAll('.bi-camera');

    const imageUrls = [
        'assets/images/fishbone.png',
        'assets/images/rcaex.png'

    ];

    cameraIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            const imageUrl = imageUrls[index];
            const modalId = this.getAttribute('data-target');
            const modalElement = document.querySelector(modalId);

            if (imageUrl && modalElement) {
                const modalImage = modalElement.querySelector('.modal-body img') as HTMLImageElement;

                if (modalImage) {
                    modalImage.src = imageUrl;
                    const modal = new bootstrap.Modal(modalElement as HTMLElement);
                    modal.show();
                }
            }
        });
    });
}}
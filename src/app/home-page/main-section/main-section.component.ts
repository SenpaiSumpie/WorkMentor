import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent {

  search : string = '';

  constructor(
    private toastr: ToastrService
  ) { }

  showToast() : void {
    this.toastr.success("Hello, I'm the toastr message.", "This title?", { timeOut: 5000, progressBar: true, closeButton: true })
  }

}

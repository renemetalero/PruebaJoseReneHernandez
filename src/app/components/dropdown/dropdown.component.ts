import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit{

  @ViewChild('drp') dpr!: ElementRef;

  ngOnInit(): void {

    window.onclick = function(event) {
      const target = event.target as HTMLElement
      if (!target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
      }

  showDropdown() {
    this.dpr.nativeElement.classList.toggle("show");
  }
}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'periodic-table';
  public elementData: Array<any> = [];
  public currentDisplayedElement: any;
  public tableRow: Array<any> = Array.from(Array(9).keys());
  public tableCol: Array<any> = Array.from(Array(18).keys());
  public screenWidth!: number;
  constructor(private _http: HttpClient) {
    this.getElementData();
    this.screenWidth = window.innerWidth;
    this.screenAlert();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);

    this.screenAlert();
  }

  public screenAlert() {
    if (this.screenWidth <= 1000) {
      alert(
        'Please use a larger screen for better experience. or rduce the screen size.',
      );
    }
  }

  public getElementData() {
    this._http.get('./assets/periodic-element.json').subscribe((data: any) => {
      this.elementData = data.elements;
      this.currentDisplayedElement = this.elementData[0];
    });
  }

  public showTheElementDetails(ele: any) {
    this.currentDisplayedElement = ele;
  }
}

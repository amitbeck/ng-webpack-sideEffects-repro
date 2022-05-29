import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  formGroup = new FormGroup({
    text: new FormControl(''),
  });

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      this.formGroup.controls['text'].setWarnings({ warning: true }); // <- TypeError: this.formGroup.controls.text.setWarnings is not a function
    });
  }
}

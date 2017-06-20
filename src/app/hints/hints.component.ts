import {Component, OnInit} from '@angular/core';
import {HintsService} from "./hints.service";
import {Hint} from "./hint";

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.css'],
  providers: [HintsService]
})
export class HintsComponent implements OnInit {

  hints: Hint[];

  constructor(private hintsService: HintsService) {
  }

  ngOnInit() {
    this.getHints();
  }

  private getHints() {
    this.hintsService.getHints().then(hints => this.hints = hints);
  }

  slickConfig = {
    "accessibility": false,
    "arrows": false,
    "autoplay": true,
    "autoplaySpeed": 3000,
    "draggable": false,
    "fade": true,
    "pauseOnHover": false,
    "pauseOnFocus": false
  }
}

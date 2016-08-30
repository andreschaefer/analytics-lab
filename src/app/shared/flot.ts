import {Component, ElementRef, Input, AfterContentInit, AfterViewChecked} from "@angular/core";

@Component({
  selector: 'flot',
  template: `<div>loading</div>`
})
export class FlotCmp implements AfterViewChecked {

  private width = '100%';
  private height = 220;
  private chosenInitialized = false;

  @Input() private options: any;
  @Input() private dataset: any;
  @Input() private width: string;
  @Input() private height: string;


  constructor(public el: ElementRef) {

  }

  ngAfterViewChecked() {
    if (this.dataset && this.dataset.length > 0)
      if (!this.chosenInitialized) {
        let plotArea = $(this.el.nativeElement).find('div').empty();
        plotArea.css({
          width: this.width,
          height: this.height
        });
        $.plot(plotArea, this.dataset, this.options);
        this.chosenInitialized = true;
      }
  }
}

import { Directive, Input, OnChanges, SimpleChange  } from '@angular/core';
import { ElementRef, Renderer } from '@angular/core';
@Directive({
  selector: '[cc-flasher]',
})
export class FlasherDirective implements OnChanges {
  @Input('cc-flasher') start: boolean;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['start'] && changes['start'].currentValue) {
      this.renderer.setElementClass(this.el.nativeElement, 'cc-flasher', true);
      window.setTimeout(() => {
        this.renderer.setElementClass(this.el.nativeElement, 'cc-flasher', false);
      }, 2000)
    }
  }

}
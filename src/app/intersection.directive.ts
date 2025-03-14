import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appIntersection]'
})
export class IntersectionDirective implements OnInit, OnDestroy {
  @Output() visible = new EventEmitter<void>();
  private observer: IntersectionObserver | null = null;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.visible.emit();
        }
      });
    }, {
      rootMargin: '500px'
    });

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
} 
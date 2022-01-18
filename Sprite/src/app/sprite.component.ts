import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sprite',
  templateUrl: 'sprite.component.html',
  styleUrls: ['sprite.component.css']
})
export class SpriteComponent {
  @Input("url")
  public url?: string;

  @Input("offset-x")
  public offsetX?: number;

  @Input("offset-y")
  public offsetY?: number;

  @Input("width")
  public width?: number;

  @Input("height")
  public height?: number;

  @Output("clicked")
  private clicked: EventEmitter<void> = new EventEmitter<void>();

  public getStyle(): object {
    return {
      "background-image": `url(${this.url})`,
      "background-position-x": `${this.offsetX}px`,
      "background-position-y": `${this.offsetY}px`,
      "width": `${this.width}px`,
      "height": `${this.height}px`
    }
  }

  public next() {
    this.clicked.emit();
  }
}

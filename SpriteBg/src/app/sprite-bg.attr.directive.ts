import {Directive, HostBinding, Input} from "@angular/core";

// Значения по умолчанию
const URL_SPRITE: string = "http://fe.it-academy.by/Examples/smileys.png";
const OFFSETX_SPRITE: string = "-75px";
const OFFSETY_SPRITE: string = "-75px";
const WIDTH_SPRITE: string = "25px";
const HEIGHT_SPRITE: string = "25px";

@Directive({
  selector: "[sprite-bg]"
})
export class SpriteBgDirective {
  @Input("sprite-url")
  public url: string = URL_SPRITE;

  @Input("sprite-offset-x")
  public offsetX: string = OFFSETX_SPRITE;

  @Input("sprite-offset-y")
  public offsetY: string = OFFSETY_SPRITE;

  @Input("sprite-width")
  public width: string = WIDTH_SPRITE;

  @Input("sprite-height")
  public height: string = HEIGHT_SPRITE;

  @HostBinding("style.backgroundImage")
  public get getStyleBackgroundImage(): string {
    return `url(${this.url})`;
  }

  @HostBinding("style.backgroundPosition")
  public get getStyleBackgroundPosition(): string {
    return `${this.offsetX} ${this.offsetY}`;
  }

  @HostBinding("style.width")
  public get getStyleWidth(): string {
    return this.width;
  }

  @HostBinding("style.height")
  public get getStyleHeight(): string {
    return this.height;
  }
}

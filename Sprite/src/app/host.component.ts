import { Component } from '@angular/core';

const URL_SPRITE: string = "http://fe.it-academy.by/Examples/cards2.png";
const COL_MAX_SPRITE: number = 4;
const ROW_MAX_SPRITE: number = 14;
const WIDTH_SPRITE: number = 574 / COL_MAX_SPRITE;
const HEIGHT_SPRITE: number = 2712 / ROW_MAX_SPRITE;

@Component({
  moduleId: module.id,
  selector: "host",
  templateUrl: "host.component.html",
  styleUrls: ["host.component.css"]
})
export class HostComponent {
  // Позиция текущего изображения (столбец, строка)
  private current: {col: number, row: number} = {col: 1, row: 1};

  public getUrl(): string {
    return URL_SPRITE;
  };

  public getOffsetX(): number {
    return - WIDTH_SPRITE * ( this.current.col - 1 );
  };

  public getOffsetY(): number {
    return - HEIGHT_SPRITE * ( this.current.row - 1 );
  };

  public getWidth(): number {
    return WIDTH_SPRITE;
  };

  public getHeight(): number {
    return HEIGHT_SPRITE;
  };

  public change(): void {
    // Определение позиции следующего изображения
    if (this.current.col < COL_MAX_SPRITE)
      this.current.col++;
    else
      this.current.col = 1;

    if (this.current.col === 1) {
      if (this.current.row < ROW_MAX_SPRITE)
        this.current.row++;
      else
        this.current.row = 1;
    }

    // В последней строке два изображения пропущены
    if (this.current.row === ROW_MAX_SPRITE) {
      if (this.current.col === 2) this.current.col = 3;
      else if (this.current.col === COL_MAX_SPRITE) this.current = {col: 1, row: 1};
    }
  };
}

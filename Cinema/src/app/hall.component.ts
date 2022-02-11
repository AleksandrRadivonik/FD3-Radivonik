import {Component, Input} from '@angular/core';
import {TicketsService} from "./tickets.service";

@Component({
  moduleId: module.id,
  selector: "hall",
  templateUrl: "hall.component.html",
  styleUrls: ["hall.component.css"]
})
export class HallComponent {
  constructor(private tickets: TicketsService) {
  }

  @Input("name") // атрибут- наименование кинотеатра
  public name: string = "";

  // Всего мест
  public getTotal(): number {
    return this.tickets.getTotal();
  }

  // Количество свободных мест
  public getFree(): number {
    return this.tickets.getFree();
  }

  // Количество занятых мест
  public getHold(): number {
    return this.getTotal() - this.getFree();
  }

  // Массив мест
  public getPlaces(): Array<boolean> {
    return this.tickets.getPlaces();
  }
}

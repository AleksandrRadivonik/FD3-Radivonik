import {Component, Input} from '@angular/core';
import {TicketsService} from "./tickets.service";

@Component({
  moduleId: module.id,
  selector: "cash",
  templateUrl: "cash.component.html",
  styleUrls: ["cash.component.css"]
})
export class CashComponent {
  private isTryHold: boolean = false; // признак "был заказ билетов"
  private holdPlaces: Array<number> = []; // массив последних заказанных билетов

  constructor(private tickets: TicketsService) {
  }

  @Input("name") // атрибут- наименование кассы
  public name: string = "";

  // Информация о последнем заказе
  public getInfo(): {text: string, isError: boolean} {
    if (!this.isTryHold) return {text: "", isError: false};
    if (this.holdPlaces.length != 0) return {text: `Ваши места: ${this.holdPlaces}`, isError: false};
    else return {text: "Заказать билеты не удалось", isError: true};
  }

  // Заказ билетов
  public hold(count: string) {
    this.isTryHold = true;
    this.holdPlaces = this.tickets.hold(Number.parseInt(count))
  }
}

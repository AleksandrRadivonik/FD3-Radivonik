import {Component, Input} from '@angular/core';
import {TicketsService, TTicket} from "./tickets.service";

@Component({
  moduleId: module.id,
  selector: "cash",
  templateUrl: "cash.component.html",
  styleUrls: ["cash.component.css"]
})
export class CashComponent {
  private isTryHold: boolean = false; // признак "был заказ билетов"
  private holdPlaces: TTicket | null = null; // последние заказанные билеты

  constructor(private ticketsSrv: TicketsService) {
  }

  @Input("name") // атрибут- наименование кассы
  public name: string = "";

  // Информация о последнем заказе
  public getInfo(): {text: string, isError: boolean} {
    if (!this.isTryHold) return {text: "", isError: false};
    if (this.holdPlaces) return {text: `Ваши места: ряд ${this.holdPlaces.row} места ${this.holdPlaces.places}`, isError: false};
    else return {text: "Заказать билеты не удалось", isError: true};
  }

  // Заказ билетов
  public hold(count: string) {
    this.isTryHold = true;
    this.holdPlaces = this.ticketsSrv.hold(Number.parseInt(count))
  }
}

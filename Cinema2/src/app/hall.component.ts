import {Component, Input} from '@angular/core';
import {TicketsService, TPlaces} from "./tickets.service";

@Component({
  moduleId: module.id,
  selector: "hall",
  templateUrl: "hall.component.html",
  styleUrls: ["hall.component.css"]
})
export class HallComponent {
  private places: TPlaces = [];

  constructor(private ticketsSrv: TicketsService) {
    ticketsSrv.getPlacesObservable().subscribe((places: TPlaces) => {
      this.places = [...places]; // можно было просто присвоить массив, решил ещё так попробовать
      console.log(places); // логируем для проверки, что события в поток приходят
    });
  }

  // Атрибут- наименование кинотеатра
  @Input("name")
  public name: string = "";

  // Всего мест
  public getTotal(): number {
    return this.ticketsSrv.getTotal(this.places);
  }

  // Количество свободных мест
  public getFree(): number {
    return this.ticketsSrv.getFree(this.places);
  }

  // Количество занятых мест
  public getHold(): number {
    return this.getTotal() - this.getFree();
  }

  // Массив мест
  public getPlaces(): TPlaces {
    return this.places;
  }
}

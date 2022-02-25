import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

// Тип для массива мест в зале кинотеатра
export type TPlaces = Array<Array<boolean>>; // двумерный массив

// Тип для билета на места
export type TTicket = { row: number, places: Array<number> }; // номер ряда, массив номеров мест

// Тип для заказа билетов
type TTicketHold = {row: number, place: number};

@Injectable()
export class TicketsService {
  private places: TPlaces = [ // массив мест, false - означает свободное место
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ];

  private placesObservable: BehaviorSubject<TPlaces> = new BehaviorSubject<TPlaces>(this.places); // Observable для массива мест

  // Всего мест
  getTotal(places: TPlaces): number {
    let countTotal: number = 0;
    for (let i = 0; i < places.length; i++) {
      countTotal += places[i].length
    }
    return countTotal;
  }

  // Количество свободных мест
  getFree(places: TPlaces): number {
    let countFree: number = 0;
    for (let i = 0; i < places.length; i++) {
      countFree += places[i].filter((p: boolean) => !p).length
    }
    return countFree;
  }

  // Заказ билетов
  hold(count: number): TTicket | null {
    if (count > this.getFree(this.places)) return null;

    let holdsToRandom: Array<TTicketHold> = []; // массив рядов с номерами свободных мест, из которого можно потом выбрать случайным образом места рядом

    for (let r = 0; r < this.places.length; r++) {
      let row: Array<boolean> = this.places[r];
      for (let i = 0; i < row.length; i++) { // цикл по заполнению массива с номерами свободных мест, из которого можно выбрать места рядом
        if (!row[i]) { // место свободно
          let c: number = 1;
          while (c < count && (i + c) < row.length) { // поиск нескольких свободных мест подряд в соответствии с количеством заказываемых билетов
            if (row[i + c]) break; // если место занято, то прекращаем поиск свободных мест рядом
            c++;
          }
          if (c === count) holdsToRandom.push({row: r, place: i});
        }
      }
    }

    if (holdsToRandom.length === 0) return null;

    let select: TTicketHold = holdsToRandom[this.randomDiap(0, holdsToRandom.length - 1)];

    let holds: TTicket  = { row: select.row + 1, places: [] };
    for (let i = 0; i < count; i++) {
      this.places[select.row][select.place + i] = true; // теперь место занято
      holds.places.push(select.place + i + 1); // в результирующем массиве билетов номера мест должны начинаться с 1
    }

    this.placesObservable.next(this.places); // отправка массива мест подписчикам
    if (this.getFree(this.places) === 0)
      this.placesObservable.complete(); // завершение потока

    return holds;
  }

  // Возвращаемый Observable для возможных подписчиков
  public getPlacesObservable(): Observable<TPlaces> {
    return this.placesObservable;
  }

  // Получение случайных чисел
  private randomDiap(n: number, m: number): number {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  }
}

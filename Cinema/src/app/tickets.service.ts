import {Injectable} from "@angular/core";

@Injectable()
export class TicketsService {
  private places: Array<boolean> = []; // массив мест, false - означает свободное место

  constructor() {
    for(let i = 0; i < 20; i++)
      this.places.push(false);
  }

  // Массив мест
  getPlaces(): Array<boolean> {
    return this.places;
  }

  // Всего мест
  getTotal(): number {
    return this.places.length;
  }

  // Количество свободных мест
  getFree(): number {
    return this.places.filter((p: boolean) => !p).length;
  }

  // Заказ билетов
  hold(count: number): Array<number> {
    let holds: Array<number> = []; // возвращаемый массив билетов с номерами мест
    if (count > this.getFree()) return holds;

    let holdsToRandom: Array<number> = []; // массив с номерами свободных мест, из которого можно потом выбрать случайным образом места рядом

    for (let i = 0; i < this.getTotal(); i++) { // цикл по заполнению массива с номерами свободных мест, из которого можно выбрать места рядом
      if (!this.places[i]) { // место свободно
        let c: number = 1;
        while (c < count && (i + c) < this.getTotal()) { // поиск нескольких свободных мест подряд в соответствии с количеством заказываемых билетов
          if (this.places[i + c]) break; // если место занято, то прекращаем поиск свободных мест рядом
          c++;
        }
        if (c === count) holdsToRandom.push(i);
      }
    }

    if (holdsToRandom.length === 0) return holds;

    let beginNum: number = holdsToRandom[this.randomDiap(0, holdsToRandom.length - 1)];
    for (let i = 0; i < count; i++) {
      this.places[beginNum + i] = true; // теперь место занято
      holds.push(beginNum + i + 1); // в результирующем массиве билетов номера мест должны начинаться с 1
    }

    return holds;
  }

  // Получение случайных чисел
  private randomDiap(n: number, m: number): number {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  }
}

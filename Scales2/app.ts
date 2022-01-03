// Интерфейс для взвешиваемых продуктов
interface IScalable {
    getScale(): number; // получение веса продукта
    getName(): string;  // получение наименования продукта
}

// Класс Весы
class Scale {
    products: IScalable[] = []; // массив добавленных на весы продуктов

    constructor(_products: IScalable[] = []) { // Конструктор
        this.products = _products;
    }

    add(product: IScalable): void { // добавление нового продукта на весы
        this.products.push(product);
    }

    getSumScale(): number { // получение суммарного веса добавленных продуктов
        return this.products.reduce((sum: number, p: IScalable) => sum + p.getScale(), 0);
    }

    getNameList(): string[] { // получение списка наименований добавленных продуктов в виде массива
        return this.products.map((p: IScalable) => p.getName());
    }
}

// Класс Яблоко
class Apple implements IScalable {
    constructor(private name: string, private scale: number) {

    }

    getScale(): number { // получение веса продукта
        return this.scale;
    }

    getName(): string {  // получение наименования продукта
        return "Яблоко " + this.name;
    }
}

// Класс Помидор
class Tomato implements IScalable {
    constructor(private name: string, private scale: number) {

    }

    getScale(): number { // получение веса продукта
        return this.scale;
    }

    getName(): string {  // получение наименования продукта
        return "Помидор " + this.name;
    }
}

let scale: Scale = new Scale();
scale.add(new Apple("Антоновка", 0.2))
scale.add(new Apple("Малиновка", 0.25))
scale.add(new Tomato("Принц", 0.155))
scale.add(new Apple("Желтый", 0.105))
scale.add(new Apple("Белый налив", 0.125))

console.log("Список наименований: " + scale.getNameList());
console.log("Общий вес: " + scale.getSumScale());
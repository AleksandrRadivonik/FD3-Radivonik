// Класс Продукт
class Product {
    name: string;  // Наименование
    scale: number; // Вес

    constructor(_name: string, _scale: number) { // Конструктор
        this.name = _name;
        this.scale = _scale;
    }

    getScale(): number { // получение наименования продукта
        return this.scale;
    }

    getName(): string {  // получение наименования продукта
        return this.name;
    }
}

// Класс Весы
class Scale {
    products: Product[] = []; // массив добавленных на весы продуктов

    constructor(_products: Product[] = []) { // Конструктор
        this.products = _products;
    }

    add(product: Product): void { // добавление нового продукта на весы
        this.products.push(product);
    }

    getSumScale(): number { // получение суммарного веса добавленных продуктов
        return this.products.reduce((sum: number, p: Product) => sum + p.getScale(), 0);
    }

    getNameList(): string[] { // получение списка наименований добавленных продуктов в виде массива
        return this.products.map((p: Product) => p.getName());
    }
}

// Класс Яблоко
class Apple extends Product {
    constructor(_name: string, _scale: number) {
        super(_name, _scale);
    }
}

// Класс Помидор
class Tomato extends Product {
    constructor(_name: string, _scale: number) {
        super(_name, _scale);
    }
}

let scale: Scale = new Scale();
scale.add(new Apple("Яблоко Антоновка", 0.2))
scale.add(new Apple("Яблоко Малиновка", 0.25))
scale.add(new Tomato("Помидор Принц", 0.155))
scale.add(new Apple("Помидор Желтый", 0.105))
scale.add(new Apple("Яблоко Белый налив", 0.125))

console.log("Список наименований: " + scale.getNameList());
console.log("Общий вес: " + scale.getSumScale());
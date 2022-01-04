// Класс Продукт
class Product {
    constructor(private name: string, private scale: number) {}

    getScale(): number { // получение веса продукта
        return this.scale;
    }

    getName(): string {  // получение наименования продукта
        return this.name;
    }
}

// Интерфейс хранилища
interface IStorageEngine {
    addItem(item: Product): void;    // добавление продукта 
    getItem(index: number): Product; // получение продукта по индексу
    getCount(): number;              // получение количества продуктов
}

// Класс Весы
class Scale<StorageEngine extends IStorageEngine>  {
    constructor(private storage: StorageEngine) {} // Конструктор

    add(product: Product): void { // добавление нового продукта на весы
        this.storage.addItem(product);
    }

    getSumScale(): number { // получение суммарного веса добавленных продуктов
        let sum = 0;
        for(let i = 0; i < this.storage.getCount(); i++) 
          sum += this.storage.getItem(i).getScale();
        return sum;
    }

    getNameList(): Array<string> { // получение списка наименований добавленных продуктов в виде массива
        let names: Array<string> = new Array(); 
        for(let i = 0; i < this.storage.getCount(); i++) 
            names.push(this.storage.getItem(i).getName());
        return names;
    }
}

// Класс Хранилище в массиве
class ScalesStorageEngineArray implements IStorageEngine {
    private products: Array<Product>;

    constructor() { // конструктор
        this.products = new Array();
    }

    addItem(item: Product): void {    // добавление продукта 
        this.products.push(item);
    }

    getItem(index: number): Product { // получение продукта по индексу
        return this.products[index];
    }

    getCount(): number {               // получение количества продуктов
        return this.products.length;
    }    
}

// Класс Хранилище в LocalStorage
class ScalesStorageEngineLocalStorage implements IStorageEngine {
    private length: number;

    constructor(private keyPrefix: string) { // конструктор
        this.length = 0;
    } 
    
    addItem(item: Product): void {    // добавление продукта 
        localStorage.setItem(this.keyPrefix + this.length, JSON.stringify(item));
        this.length++;
    }

    getItem(index: number): Product { // получение продукта по индексу
        const {name, scale} = JSON.parse(localStorage.getItem(this.keyPrefix + index));
        return new Product(name, scale);
    }

    getCount(): number {               // получение количества продуктов
        return this.length;
    }    
}

let scaleArrayStorage: Scale<ScalesStorageEngineArray> = new Scale(new ScalesStorageEngineArray());
scaleArrayStorage.add(new Product("Яблоко Антоновка", 0.2))
scaleArrayStorage.add(new Product("Яблоко Малиновка", 0.25))
scaleArrayStorage.add(new Product("Помидор Принц", 0.155))
scaleArrayStorage.add(new Product("Помидор Желтый", 0.105))
scaleArrayStorage.add(new Product("Яблоко Белый налив", 0.125))

console.log("Весы<ArrayStorage> Список наименований: " + scaleArrayStorage.getNameList());
console.log("Весы<ArrayStorage> Общий вес: " + scaleArrayStorage.getSumScale());

let scaleLocalStorage: Scale<ScalesStorageEngineLocalStorage> = new Scale(new ScalesStorageEngineLocalStorage("ScalesStorage"));
scaleLocalStorage.add(new Product("Яблоко Антоновка", 0.2))
scaleLocalStorage.add(new Product("Яблоко Малиновка", 0.25))
scaleLocalStorage.add(new Product("Помидор Принц", 0.155))
scaleLocalStorage.add(new Product("Помидор Желтый", 0.105))
scaleLocalStorage.add(new Product("Яблоко Белый налив", 0.125))

console.log("Весы<LocalStorage> Список наименований: " + scaleLocalStorage.getNameList());
console.log("Весы<LocalStorage> Общий вес: " + scaleLocalStorage.getSumScale());
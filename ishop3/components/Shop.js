import React from "react";
import PropTypes from "prop-types";

import "./Shop.css";

import ProductBrow from "./ProductBrow";
import ProductEdit from "./ProductEdit";
import ShopModeEnum from "./ShopModeEnum";

// Магазин (родительский класс)
class Shop extends React.Component {
    // Типы props
    static propTypes = {
        name: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                price: PropTypes.number,
                photo: PropTypes.string,
                count: PropTypes.number
            })
        )
    }

    // Значения props по умолчанию
    static defaultProps = {
        name: "Интернет-магазин"
    }

    // Начальные значения state
    state = {
        heads: ["Наименование товара", "Цена", "Фото", "Количество", "Действие"], // наименования столбцов
        products: [...this.props.products], // товары
        mode: ShopModeEnum.BROW, // режим (просмотр, редактирование, добавление)
        selectedProduct: null, // выбранный товар (используется в т.ч. для карточки редактирования)
        errors: {}, // ошибки валидации
        isChanged: false // признак, что товар был изменен
    }

    // Определение state.selectedProduct
    selectProduct(id) {
        let product = null;
        if (id != null) {
            if (id === 0)
                product = {id: 0, name: "", price: "", photo: "", count: ""}; // для режима добавления
            else {
                product = this.state.products.find(v => v.id === id); // поиск в массиве товаров
                product = {...product, price: product.price.toString(), count: product.count.toString()}; // преобразование некоторых полей в строки
            }
        }
        return product;
    }

    // Выбор продукта
    select = (id) => {
        if (this.state.mode === ShopModeEnum.BROW || this.state.mode === ShopModeEnum.EDIT && !this.state.isChanged) // выбор возможен в режиме просмотра или не было изменений
            this.setState({mode: ShopModeEnum.BROW, selectedProduct: this.selectProduct(id), errors: {}, isChanged: false});
    }

    // Редактирование продукта
    edit = (id) => {
        this.setState({mode: ShopModeEnum.EDIT, selectedProduct: this.selectProduct(id), isChanged: false},
            () => this.validate(true));
    }

    // Добавление продукта
    append = () => {
        this.setState({mode: ShopModeEnum.APPEND, selectedProduct: this.selectProduct(0), isChanged: false},
            () => this.validate(true));
    }

    // Сохранение продукта
    save = () => {
        let product = { // преобразование полей к правильным типам
            ...this.state.selectedProduct,
            price: Number.parseFloat(this.state.selectedProduct.price),
            count: Number.parseInt(this.state.selectedProduct.count)
        };

        if (!this.validate(false)) // если не пройдена валидация
            return; // выход из сохранения

        if (this.state.mode === ShopModeEnum.APPEND) { // режим добавления
            product.id = this.state.products.reduce((id, v) => v.id > id ? v.id : id, 0) + 1; // присвоение уникального id
            let newProducts = [...this.state.products, product]; // добавление в массив товаров
            // сохранение в state с последующим выбором добавленного товара
            this.setState({products: newProducts, mode: ShopModeEnum.BROW, errors: {}, isChanged: false},
                () => {this.setState({selectedProduct: this.selectProduct(product.id)})});
        }
        else if (this.state.mode === ShopModeEnum.EDIT) {
            // изменение в массиве товаров
            let newProducts = this.state.products.map(v => v.id === this.state.selectedProduct.id ? product : v);
            // сохранение state
            this.setState({products: newProducts, mode: ShopModeEnum.BROW, errors: {}, isChanged: false});
        }
    }

    // Выход из редактирования продукта
    cancel = () => {
        let id = this.state.mode === ShopModeEnum.APPEND ? null : this.state.selectedProduct.id;
        this.setState({mode: ShopModeEnum.BROW, selectedProduct: this.selectProduct(id), errors: {}, isChanged: false});
    }

    // Удаление продукта
    delete = (id) => {
        if (confirm("Удалить товар?"))
            this.setState({products: this.state.products.filter(v => v.id !== id), selectedProduct: null, errors: {}, isChanged: false});
    }

    // Изменение поля продукта (сделал по простому- один обработчик на все поля)
    changeField = (name, value) => {
        this.setState({selectedProduct: {...this.state.selectedProduct, [name]: value}, isChanged: true}, () => this.validate(true));
    }

    // Валидация полей
    validate = (isAlwaysSetState) => {
        let newErrors = {};
        let fields = this.state.selectedProduct;

        Object.keys(fields).forEach(v => {
            if (v !== "id") {
                if (!fields[v])
                    newErrors[v] = "Должно быть заполнено";
                else if (v === "price" && !this.validateNumberDec(fields[v]))
                    newErrors[v] = "Должно быть число (допустимы 2 цифры после точки)";
                else if (v === "photo" && !this.validateImg(fields[v]))
                    newErrors[v] = "Должно быть имя файла изображения (.jpg, .jpeg, .png, .gif)";
                else if (v === "count" && !this.validateNumberInt(fields[v]))
                    newErrors[v] = "Должно быть целое число";
            }
        });

        let isExistsErrors = Object.keys(newErrors).length > 0;
        if (isAlwaysSetState || isExistsErrors)
            this.setState({errors: newErrors});

        return !isExistsErrors;
    }

    // Валидации разных типов полей по regexp
    validateNumberDec = (s) => /^(0|[1-9]\d*)(\.[0-9]{1,2})?$/.test(s);
    validateNumberInt = (s) => /^(0|[1-9]\d*)$/.test(s);
    validateImg = (s) => /^.+(\.jpg|\.jpeg|\.png|\.gif)$/i.test(s);

    // Отображение в VDOM
    render () {
        // Преобразование массива наименований столбцов в VDOM
        let productsHead = <tr>{this.state.heads.map((v, i) => <th className="ShopTableHead" key={i}>{v}</th>)}</tr>;

        // Преобразование списка товаров в VDOM
        let productsBrow = this.state.products.map(v =>
            <ProductBrow
                key={v.id}
                id={v.id}
                name={v.name}
                price={v.price}
                photo={v.photo}
                count={v.count}
                mode={this.state.mode}
                isSelected={this.state.selectedProduct ? v.id === this.state.selectedProduct.id : false}
                isChanged={this.state.isChanged}
                cbSelect={this.select}
                cbEdit={this.edit}
                cbDelete={this.delete}
            />);

        // Преобразование выбранного товара в VDOM
        let productEdit =
            <ProductEdit
                selectedProduct={this.state.selectedProduct}
                errors={this.state.errors}
                mode={this.state.mode}
                cbAppend={this.append}
                cbChangeField={this.changeField}
                cbSave={this.save}
                cbCancel={this.cancel}
            />;

        // Объединение в результирующий VDOM
        return (
            <div className="Shop">
                <div className="ShopName">{this.props.name}</div>
                <div>
                    <table className="ShopTable">
                        <thead>{productsHead}</thead>
                        <tbody>{productsBrow}</tbody>
                    </table>
                </div>
                <div>
                    {productEdit}
                </div>
            </div>
        );
    }
}

export default Shop;

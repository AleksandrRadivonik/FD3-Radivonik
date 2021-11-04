"use strict";

let Shop = React.createClass({

    // Имя
    displayName: "Shop",

    // Значения свойств по умолчанию
    getDefaultProps: function () {
        return {name: "Интернет-магазин"}
    },

    // Типы props
    propTypes: {
        name: React.PropTypes.string.isRequired,
        products: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                article: React.PropTypes.string,
                name: React.PropTypes.string,
                price: React.PropTypes.number,
                photo: React.PropTypes.string,
                count: React.PropTypes.number
            })
        ),
    },

    // Начальные значения state
    getInitialState: function () {
        return {
            heads: ["Наименование товара", "Цена", "Фото", "Количество", "Действие"], // наименования столбцов
            products: [...this.props.products], // товары
            selectedProductArticle: "" // article выбранного товара
        };
    },

    // Выбор продукта
    selectProduct: function (article) {
        this.setState({selectedProductArticle: article});
    },

    // Удаление продукта
    deleteProduct: function (article) {
        if (confirm("Удалить товар?")) {
            this.setState({products: this.state.products.filter(v => v.article != article)});
        }
    },

    // Отображение в VDOM
    render: function () {
        // Преобразование массива наименований столбцов в VDOM
        let productsHead = React.DOM.tr({},
            this.state.heads.map((v, i) => React.DOM.th({key: i, className: "ShopProductHead"}, v))
        );

        // Преобразование массива товаров в VDOM
        let productsTable = this.state.products.map(v =>
            React.createElement(Product, {
                key: v.article,
                article: v.article,
                name: v.name,
                price: v.price,
                photo: v.photo,
                count: v.count,
                isSelected: v.article == this.state.selectedProductArticle,
                cbSelect: this.selectProduct,
                cbDelete: this.deleteProduct
            })
        );

        // Объединение в результирующий VDOM
        return React.DOM.div({className: "Shop"},
            React.DOM.div({className: "ShopName"}, this.props.name),
            React.DOM.table({className: "ShopProductTable"},
                React.DOM.thead({}, productsHead),
                React.DOM.tbody({}, productsTable)
            )
        );
    },

});
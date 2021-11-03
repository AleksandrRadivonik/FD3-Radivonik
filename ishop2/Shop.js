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
            products: [...this.props.products],
            selectProductArticle: ""
        };
    },

    // Выбор продукта
    selectProduct: function (article) {
        this.setState({selectProductArticle: article});
    },

    // Удаление продукта
    deleteProduct: function (article) {
        if (confirm("Удалить товар?")) {
            this.setState({products: this.state.products.filter(v => v.article != article)});
        }
    },

    // Отображение в VDOM
    render: function () {
        // VDOM для наименований столбцов таблицы
        var productsHead = React.DOM.tr({},
            React.DOM.th({className: "ProductHead"}, "Наименование товара"),
            React.DOM.th({className: "ProductHead"}, "Цена"),
            React.DOM.th({className: "ProductHead"}, "Фото"),
            React.DOM.th({className: "ProductHead"}, "Количество"),
            React.DOM.th({className: "ProductHead"}, "Действие"),
        );

        // Преобразование массива товаров в VDOM
        var productsTable = this.state.products.map(v =>
            React.createElement(Product, {
                key: v.article,
                article: v.article,
                name: v.name,
                price: v.price,
                photo: v.photo,
                count: v.count,
                isSelected: v.article == this.state.selectProductArticle,
                cbSelect: this.selectProduct,
                cbDelete: this.deleteProduct
            })
        );

        // Объединение в результирующий VDOM
        return React.DOM.div({className: "Shop"},
            React.DOM.div({className: "ShopName"}, this.props.name),
            React.DOM.table({className: "ProductTable"},
                React.DOM.thead({}, productsHead),
                React.DOM.tbody({}, productsTable),
            ),
        );
    },

});
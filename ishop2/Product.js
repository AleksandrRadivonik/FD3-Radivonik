"use strict";

let Product = React.createClass({
    // Имя
    displayName: "Product",

    // Типы свойств
    propTypes: {
        article: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        photo: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired,
        isSelected: React.PropTypes.bool.isRequired, // признак выбора товара (передается родителем)
        cbSelect: React.PropTypes.func.isRequired,   // callback на выбор товара (передается родителем)
        cbDelete: React.PropTypes.func.isRequired    // callback на удаление товара (передается родителем)
    },

    // Выбор товара
    rowClick: function() {
        this.props.cbSelect(this.props.isSelected ? "" : this.props.article); // при повторном click выбор отменяется
    },

    // Удаление товара
    deleteButtonClick: function(EO) {
        this.props.cbDelete(this.props.article);
        EO.stopPropagation();
    },

    // Отбражение в VDOM
    render: function() {
        return React.DOM.tr({className: this.props.isSelected ? "ProductSelect" : "Product", key: this.props.article, onClick: this.rowClick},
            React.DOM.td({className: "ProductName"}, this.props.name),
            React.DOM.td({className: "ProductPrice"}, this.props.price.toFixed(2)),
            React.DOM.td({className: "ProductPhoto"},
                React.DOM.img({src: this.props.photo, alt: this.props.name})
            ),
            React.DOM.td({className: "ProductCount"}, this.props.count),
            React.DOM.td({className: "ProductAction"},
                React.DOM.input({type: "button", name: "deleteButton", className: "ProductButton", value: "Удалить",
                    onClick: this.deleteButtonClick
                })
            ),
        );
    }
});
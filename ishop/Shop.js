var Shop = React.createClass({

    displayName: "Shop",
  
    getDefaultProps: function() {
        return {name: "Интернет-магазин"}
    },

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
  
    render: function() {
        prоductsHead = React.DOM.tr({},
            React.DOM.th({className: "ProductHead"}, "Наименование"),
            React.DOM.th({className: "ProductHead"}, "Цена"),
            React.DOM.th({className: "ProductHead"}, "Фото"),
            React.DOM.th({className: "ProductHead"}, "Количество"),
        );

        prоductsTable = this.props.products.map(v => {  
            return React.DOM.tr({key: v.article, className: "Product"},
                React.DOM.td({className: "ProductName"}, v.name),
                React.DOM.td({className: "ProductPrice"}, v.price.toFixed(2)),
                React.DOM.td({className: "ProductPhoto"}, 
                    React.DOM.img({src: v.photo, alt: v.name})
                ),
                React.DOM.td({className: "ProductCount"}, v.count),
            );
        });

        return React.DOM.div({className: "Shop"}, 
            React.DOM.div({className: "ShopName"}, this.props.name),
            React.DOM.table({className: "ProductTable"}, 
                React.DOM.thead({className: "ProductTableHead"}, prоductsHead),
                React.DOM.tbody({className: "ProductTableBody"}, prоductsTable),
            ),    
        );    
    },    

  });
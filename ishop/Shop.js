var Shop = React.createClass({

    displayName: 'Shop',
  
    getDefaultProps: function() {
        return {name: "Интернет-магазин"}
    },
  
    render: function() {
        prоductsHead = React.DOM.tr({},
            React.DOM.td({}, "Наименование"),
            React.DOM.td({}, "Цена"),
            React.DOM.td({}, "Фото"),
            React.DOM.td({}, "Количество"),
        );

        prоductsTable = this.props.products.map(v => {  
            return React.DOM.tr({key: v.article, className: "Product"},
                React.DOM.td({className: "ProductName"}, v.name),
                React.DOM.td({className: "ProductPrice"}, v.price),
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
"use strict";

const Filter = React.createClass({
    // Имя
    displayName: "Filter",

    // Типы props
    propTypes: {
        strings: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    },

    // Начальные значения state
    getInitialState: function() {
        return {
            stringsWithKey: this.props.strings.map((v, i) => ({key: i, value: v})), // массив строк с добавлением key
            filterText: "", // Текст для поиска
            isSorted: false // Признак сортировки
        };
    },

    // Фильтр списка по введенному тексту
    filterTextChange: function(EO) {
        this.setState({filterText: EO.target.value});
    },

    // Сортировка списка
    sortedClick: function(EO) {
        this.setState({isSorted: EO.target.checked});
    },

    // Сброс фильтра (установка начальных значений state)
    resetButtonClick: function() {
//        this.setState(this.getInitialState());
        this.setState({filterText: "",  isSorted: false });
    },

    // Отображение в VDOM
    render: function() {
        // Преобразование массива в соответствии со значениями из state
        // Сначала фильтр (регистронезависимый)
        const filteredStrings = this.state.filterText ?
            this.state.stringsWithKey.filter(v => v.value.toUpperCase().indexOf(this.state.filterText.toUpperCase()) >= 0) :
            [...this.state.stringsWithKey];
        // Потом сортировка
        const sortedStrings = this.state.isSorted ?
            filteredStrings.sort((a, b) => a.value.localeCompare(b.value)) :
            filteredStrings;
        // Преобразование в массив тэгов <option>
        const optionStrings = sortedStrings.map(v => React.DOM.option({key: v.key}, v.value));

        return React.DOM.div(null,
            React.DOM.div(null,
                React.DOM.input({type: "checkbox", name: "sorted", className: "Sorted", value: "sorted",
                    checked: this.state.isSorted,
                    onClick: this.sortedClick}),
                React.DOM.input({type: "text", name: "filterText", className: "FilterText",
                    value: this.state.filterText,
                    onChange: this.filterTextChange
                }),
                React.DOM.input({type: "button", name: "resetButton", className: "ResetButton", value: "Сброс",
                    onClick: this.resetButtonClick
                })
            ),
            React.DOM.div(null,
                React.DOM.select({name: "strings", className: "Strings", multiple: true, size: 10},
                    optionStrings
                )
            )
        );
    },
});
import React from "react";
import PropTypes from "prop-types";

import "./MobileCompany.css";

import MobileClient from "./MobileClient";
import MobileClientCard from "./MobileClientCard";
import {mobileEvents, EVENT_APPEND, EVENT_EDIT, EVENT_SAVE, EVENT_CANCEL, EVENT_DELETE} from "./events";

// Значения фильтра
const FILTER_ALL = 0;     // Все
const FILTER_ACTIVE = 1;  // Активные
const FILTER_BLOCKED = 2; // Заблокированные

// Мобильная компания (родительский класс)
class MobileCompany extends React.PureComponent {
    // Типы props
    static propTypes = {
        name: PropTypes.string.isRequired,
        clients: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                fam: PropTypes.string,
                im: PropTypes.string,
                otch: PropTypes.string,
                balance: PropTypes.number
            })
        ),
        headNames: PropTypes.arrayOf(PropTypes.string)
    }

    // Значения props по умолчанию
    static defaultProps = {
        name: "Мобильная компания",
        headNames: ["Фамилия", "Имя", "Отчество", "Баланс", "Статус", "Редактирование", "Удаление"]
    }

    // Начальные значения state
    state = {
        name: this.props.name, // наименование
        clients: [...this.props.clients], // клиенты
        filter: FILTER_ALL, // текущий фильтр
        editedClient: null // редактируемый клиент
    }

    // Добавление слушателей событий
    componentDidMount = () => {
        mobileEvents.addListener(EVENT_APPEND, this.append);
        mobileEvents.addListener(EVENT_EDIT, this.edit);
        mobileEvents.addListener(EVENT_SAVE, this.save);
        mobileEvents.addListener(EVENT_CANCEL, this.cancel);
        mobileEvents.addListener(EVENT_DELETE, this.delete);
    }

    // Удавление слушателей событий
    componentWillUnmount = () => {
        mobileEvents.removeListener(EVENT_APPEND, this.append);
        mobileEvents.removeListener(EVENT_EDIT, this.edit);
        mobileEvents.removeListener(EVENT_SAVE, this.save);
        mobileEvents.removeListener(EVENT_CANCEL, this.cancel);
        mobileEvents.removeListener(EVENT_DELETE, this.delete);
    }

    // Установка фильтра
    setName = (EO) => {
        this.setState({name: EO.target.value});
    }

    // Установка фильтра
    filter = (EO) => {
        this.setState({filter: Number.parseInt(EO.target.dataset["filter"])});
    }

    // Определение клиента для редактирования
    editClient = (id) => {
        let client = null;
        if (id != null) {
            if (id === 0)
                client = {id: 0, fam: "", im: "", otch: "", balance: ""}; // для режима добавления
            else {
                client = this.state.clients.find(v => v.id === id); // поиск в массиве клиентов
                client = {...client, balance: client.balance.toString()}; // преобразование некоторых полей в строки
            }
        }
        return client;
    }

    // Добавление клиента
    append = () => {
        this.setState({editedClient: this.editClient(0)});
    }

    // Редактирование клиента
    edit = (id) => {
        this.setState({editedClient: this.editClient(id)});
    }

    // Сохранение клиента
    save = (edited) => {
        let client = { // преобразование полей к правильным типам
            ...edited,
            balance: Number.parseFloat(edited.balance)
        };

        if (client.id === 0) { // режим добавления
            client.id = this.state.clients.reduce((id, c) => c.id > id ? c.id : id, 0) + 1; // присвоение уникального id
            let newClients = [...this.state.clients, client]; // добавление в массив клиентов
            // сохранение в state
            this.setState({clients: newClients, editedClient: null});
        }
        else {
            // изменение в массиве клиентов
            let newClients = this.state.clients.map(c => c.id === edited.id ? client : c);
            // сохранение state
            this.setState({clients: newClients, editedClient: null});
        }
    }

    // Выход из редактирования клиента
    cancel = () => {
        this.setState({editedClient: null});
    }

    // Удаление клиента
    delete = (id) => {
        if (confirm("Удалить клиента?"))
            this.setState({clients: this.state.clients.filter(v => v.id !== id), editedClient: null});
    }

    // Добавление клиента
    appendButtonClick = () => {
        mobileEvents.emit(EVENT_APPEND);
    }

    // Отображение в VDOM
    render () {
        console.log("MobileCompany render");

        // Преобразование массива наименований столбцов в VDOM
        let clientsHead = <tr>{this.props.headNames.map((name, i) => <th className="TableHead" key={i}>{name}</th>)}</tr>;

        // Преобразование списка товаров в VDOM
        let clientsBrow = this.state.clients
            .filter(c =>
                this.state.filter === FILTER_ALL ||
                this.state.filter === FILTER_ACTIVE && c.balance > 0 ||
                this.state.filter === FILTER_BLOCKED && c.balance <= 0
            )
            .map(client => <MobileClient key={client.id} client={client} />);

        // Преобразование редактируемого клиента в VDOM
        let clientEdit = this.state.editedClient &&
            <MobileClientCard key={this.state.editedClient.id} client={this.state.editedClient} />;

        // Объединение в результирующий VDOM
        return (
            <div className="MobileCompany">
                <div>
                    <input className="Button" type="button" value="Velcom" onClick={this.setName} />
                    <input className="Button" type="button" value="MTC" onClick={this.setName} />
                </div>
                <div className="CompanyName">{this.state.name}</div>
                <div>
                    <input className="Button" type="button" value="Все" data-filter={FILTER_ALL} onClick={this.filter} />
                    <input className="Button" type="button" value="Активные" data-filter={FILTER_ACTIVE} onClick={this.filter} />
                    <input className="Button" type="button" value="Заблокированные" data-filter={FILTER_BLOCKED} onClick={this.filter} />
                </div>
                <div>
                    <table className="Table">
                        <thead>{clientsHead}</thead>
                        <tbody>{clientsBrow}</tbody>
                    </table>
                </div>
                <div>
                    <input className="Button" type="button" value="Добавить клиента" onClick={this.appendButtonClick} />
                </div>
                {clientEdit}
            </div>
        );
    }
}

export default MobileCompany;

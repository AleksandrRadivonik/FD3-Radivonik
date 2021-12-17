import React from "react";
import PropTypes from "prop-types";

import "./MobileClient.css";
import {mobileEvents, EVENT_EDIT, EVENT_DELETE} from "./events";

// Клиент в таблице
class MobileClient extends React.PureComponent {
    // Типы props
    static propTypes = {
        client: PropTypes.shape({
            id: PropTypes.number.isRequired,
            fam: PropTypes.string.isRequired,
            im: PropTypes.string.isRequired,
            otch: PropTypes.string,
            balance: PropTypes.number.isRequired
        }).isRequired
    }

    // Редактирование клиента
    editButtonClick = () => {
        mobileEvents.emit(EVENT_EDIT, this.props.client.id);
    }

    // Удаление товара
    deleteButtonClick = () => {
        mobileEvents.emit(EVENT_DELETE, this.props.client.id);
    }

    // Отбражение в VDOM
    render() {
        console.log("MobileClient id=" + this.props.client.id + " render");

        return (
            <tr className="Client" key={this.props.client.id}>
                <td className="Name">{this.props.client.fam}</td>
                <td className="Name">{this.props.client.im}</td>
                <td className="Name">{this.props.client.otch}</td>
                <td className="Balance">{this.props.client.balance.toFixed(2)}</td>
                {
                    (this.props.client.balance > 0)
                        ? <td className="StatusActive">active</td>
                        : <td className="StatusBlocked">blocked</td>
                }
                <td className="Action">
                    <input className="Button" type="button" name="editButton" value="Редактировать" onClick={this.editButtonClick}/>
                </td>
                <td className="Action">
                    <input className="Button" type="button" name="deleteButton" value="Удалить" onClick={this.deleteButtonClick}/>
                </td>
            </tr>
        );
    }
}

export default MobileClient;

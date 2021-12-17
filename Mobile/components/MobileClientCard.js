import React from "react";
import PropTypes from "prop-types";

import "./MobileClientCard.css";
import {mobileEvents, EVENT_SAVE, EVENT_CANCEL} from "./events";

// Карточка клиента
class MobileClientCard extends React.PureComponent {
    // Типы props
    static propTypes = {
        client: PropTypes.shape ({                // редактируемый клиент
            id: PropTypes.number.isRequired,
            fam: PropTypes.string.isRequired,
            im: PropTypes.string,
            otch: PropTypes.string,
            balance: PropTypes.string.isRequired
        })
    }

    // Начальные значения state
    state = {
        errors: {} // ошибки валидации
    }

    clientRef = {} // хэш для хранения ref

    setRef = (ref) => {
        if(ref) this.clientRef[ref.name] = ref;
    };

    // Валидация полей
    validate = (name) => {
        let newErrors = {};
        Object.keys(this.clientRef).forEach(key => {
            if (key !== "id" && (!name || key === name)) {
                if (!this.clientRef[key].value)
                    newErrors[key] = "Должно быть заполнено";
                else if (key === "balance" && !this.validateNumberDec(this.clientRef[key].value))
                    newErrors[key] = "Должно быть число (допустимы 2 цифры после точки)";
            }
        });

        this.setState({errors: newErrors});

        return Object.keys(newErrors).length === 0;
    }

    // Валидации разных типов полей по regexp
    validateNumberDec = (s) => /^(-?)(0|[1-9]\d*)(\.[0-9]{1,2})?$/.test(s);
    validateNumberInt = (s) => /^(-?)(|0|[1-9]\d*)$/.test(s);

     // Изменение поля
    inputChange = (EO) => {
        this.validate(EO.target.name);
    }

    // Сохранение
    buttonSaveClick = () => {
        if (!this.validate()) // если не пройдена валидация
            return; // выход из сохранения

        let client = Object.keys(this.clientRef).reduce(
            (cl, key) => ({...cl, [key]: this.clientRef[key].value }),
            {id: this.props.client.id});
        mobileEvents.emit(EVENT_SAVE, client);
    }

    // Выход
    buttonCancelClick = () => {
        mobileEvents.emit(EVENT_CANCEL);
    }

    // Отбражение в VDOM
    render() {
        console.log("MobileClientCard render");

        return (
            <div className="Modal">
                <div className="ModalContent">
                    <form>
                        <fieldset className="FieldSet">
                            <legend className="Legend">Карточка клиента</legend>
                            <div>
                                <label className="Label" htmlFor="article">ID клиента</label>
                                <input type="text" className="InputText InputNumber" name="id" id="id"
                                       value={this.props.client.id}
                                       disabled={true}/>
                            </div>
                            <div>
                                <label className="Label" htmlFor="name">Фамилия</label>
                                <input type="text" className="InputText" name="fam" id="fam"
                                       ref={this.setRef}
                                       defaultValue={this.props.client.fam}
                                       onBlur={this.inputChange}
                                />
                                {
                                    this.state.errors.fam &&
                                    <div className="Error">{this.state.errors.fam}</div>
                                }
                            </div>
                            <div>
                                <label className="Label" htmlFor="name">Имя</label>
                                <input type="text" className="InputText" name="im" id="im"
                                       ref={this.setRef}
                                       defaultValue={this.props.client.im}
                                       onBlur={this.inputChange}
                                />
                                {
                                    this.state.errors.im &&
                                    <div className="Error">{this.state.errors.im}</div>
                                }
                            </div>
                            <div>
                                <label className="Label" htmlFor="name">Отчество</label>
                                <input type="text" className="InputText" name="otch" id="otch"
                                       ref={this.setRef}
                                       defaultValue={this.props.client.otch}
                                       onBlur={this.inputChange}
                                />
                                {
                                    this.state.errors.otch &&
                                    <div className="Error">{this.state.errors.otch}</div>
                                }
                            </div>
                            <div>
                                <label className="Label" htmlFor="balance">Баланс</label>
                                <input type="text" className="InputText InputNumber" name="balance" id="balance"
                                       ref={this.setRef}
                                       defaultValue={this.props.client.balance}
                                       onBlur={this.inputChange}
                                />
                                {
                                    this.state.errors.balance &&
                                    <div className="Error">{this.state.errors.balance}</div>
                                }
                            </div>
                            <input type="button" className="ButtonEdit"
                                   value={this.props.client.id === 0 ? "Добавить" : "Сохранить"}
                                   disabled={Object.keys(this.state.errors).length > 0}
                                   onClick={this.buttonSaveClick}/>
                            <input type="button" className="ButtonEdit"
                                       value="Выход"
                                       onClick={this.buttonCancelClick}/>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

export default MobileClientCard;
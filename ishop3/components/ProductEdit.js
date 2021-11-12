import React from "react";
import PropTypes from "prop-types";

import "./ProductEdit.css";

import ShopModeEnum from "./ShopModeEnum";

// Товар на карточке
class ProductEdit extends React.Component {
    // Типы props
    static propTypes = {
        selectedProduct: PropTypes.shape ({       // выбранный (редактируемый) товар
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            photo: PropTypes.string.isRequired,
            count: PropTypes.string.isRequired
        }),
        errors: PropTypes.shape ({                // ошибки при валидации
            name: PropTypes.string,
            price: PropTypes.string,
            photo: PropTypes.string,
            count: PropTypes.string
        }).isRequired,
        mode: PropTypes.number.isRequired,        // режим
        cbAppend: PropTypes.func.isRequired,      // callback на добавление (передается родителем)
        cbChangeField: PropTypes.func.isRequired, // callback на изменение (передается родителем)
        cbSave: PropTypes.func.isRequired,        // callback на сохранение (передается родителем)
        cbCancel: PropTypes.func.isRequired       // callback на выход из редактирования (передается родителем)
    }

    // Обработчик кнопки Добавить
    buttonAppendClick = () => {
        this.props.cbAppend();
    }

    // Изменение поля
    inputChange = (EO) => {
        this.props.cbChangeField(EO.target.name, EO.target.value);
    }

    // Сохранение
    buttonSaveClick = () => {
        this.props.cbSave();
    }

    // Выход
    buttonCancelClick = () => {
        this.props.cbCancel();
    }

    // Отбражение в VDOM
    render() {
        return (
            <div>
                <div>
                    <input type="button" className="ButtonEdit"
                           value="Новый"
                           disabled={this.props.mode !== ShopModeEnum.BROW}
                           onClick={this.buttonAppendClick}/>
                </div>
                {
                    (this.props.selectedProduct) &&
                    <form>
                        <fieldset className="FieldSet">
                            <legend className="Legend">Карточка товара</legend>
                            <div>
                                <label className="Label" htmlFor="article">ID товара</label>
                                <input type="text" className="InputText InputNumber" name="id" id="id"
                                       value={this.props.selectedProduct.id}
                                       disabled={true}/>
                            </div>
                            <div>
                                <label className="Label" htmlFor="name">Наименование</label>
                                <input type="text" className="InputText" name="name" id="name"
                                       value={this.props.selectedProduct.name}
                                       disabled={this.props.mode === ShopModeEnum.BROW}
                                       onChange={this.inputChange}/>
                                {
                                    this.props.errors.name &&
                                    <div className="Error">{this.props.errors.name}</div>
                                }
                            </div>
                            <div>
                                <label className="Label" htmlFor="price">Цена</label>
                                <input type="text" className="InputText InputNumber" name="price" id="price"
                                       value={this.props.selectedProduct.price}
                                       disabled={this.props.mode === ShopModeEnum.BROW}
                                       onChange={this.inputChange}/>
                                {
                                    this.props.errors.price &&
                                    <div className="Error">{this.props.errors.price}</div>
                                }
                            </div>
                            <div>
                                <label className="Label" htmlFor="photo">Путь к фото</label>
                                <input type="text" className="InputText" name="photo" id="photo"
                                       value={this.props.selectedProduct.photo}
                                       disabled={this.props.mode === ShopModeEnum.BROW}
                                       onChange={this.inputChange}/>
                                {
                                    this.props.errors.photo &&
                                    <div className="Error">{this.props.errors.photo}</div>
                                }
                            </div>
                            <div>
                                <label className="Label" htmlFor="count">Количество</label>
                                <input type="text" className="InputText InputNumber" name="count" id="count"
                                       value={this.props.selectedProduct.count}
                                       disabled={this.props.mode === ShopModeEnum.BROW}
                                       onChange={this.inputChange}/>
                                {
                                    this.props.errors.count &&
                                    <div className="Error">{this.props.errors.count}</div>
                                }
                            </div>
                            {
                                (this.props.mode !== ShopModeEnum.BROW) &&
                                <input type="button" className="ButtonEdit"
                                       value={this.props.mode === ShopModeEnum.EDIT ? "Сохранить" : "Добавить"}
                                       disabled={Object.keys(this.props.errors).length > 0}
                                       onClick={this.buttonSaveClick}/>
                            }
                            {
                                (this.props.mode !== ShopModeEnum.BROW) &&
                                <input type="button" className="ButtonEdit"
                                       value="Выход"
                                       onClick={this.buttonCancelClick}/>
                            }
                        </fieldset>
                    </form>
                }
            </div>
        );
    }
}

export default ProductEdit;
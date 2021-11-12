import React from "react";
import PropTypes from "prop-types";

import "./ProductBrow.css";

import ShopModeEnum from "./ShopModeEnum";

// Товар в таблице
class ProductBrow extends React.Component {
    // Типы props
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        photo: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        mode: PropTypes.number.isRequired,     // режим
        isSelected: PropTypes.bool.isRequired, // признак выбора товара (передается родителем)
        isChanged: PropTypes.bool.isRequired,  // признак изменения товара на карточке редактирования (передается родителем)
        cbSelect: PropTypes.func.isRequired,   // callback на выбор товара (передается родителем)
        cbEdit: PropTypes.func.isRequired,     // callback на редактирование товара (передается родителем)
        cbDelete: PropTypes.func.isRequired    // callback на удаление товара (передается родителем)
    }

    // Выбор товара
    selectClick = () => {
        this.props.cbSelect(this.props.isSelected ? null : this.props.id); // при повторном click выбор отменяется
    }

    // Редактирование товара
    editButtonClick = (EO) => {
        this.props.cbEdit(this.props.id);
        EO.stopPropagation();
    }

    // Удаление товара
    deleteButtonClick = (EO) => {
        this.props.cbDelete(this.props.id);
        EO.stopPropagation();
    }

    // Отбражение в VDOM
    render() {
        return (
            <tr className={this.props.isSelected ? "ProductSelect" : "Product"} key={this.props.id} onClick={this.selectClick}>
                <td className = "Name">{this.props.name}</td>
                <td className = "Price">{this.props.price.toFixed(2)}</td>
                <td className = "Photo"><img src={this.props.photo} alt={this.props.name} /></td>
                <td className = "Count">{this.props.count}</td>
                <td className = "Action">
                    <input className="Button" type="button" name="editButton" value="Редактировать"
                           disabled={!(this.props.mode === ShopModeEnum.BROW || this.props.mode === ShopModeEnum.EDIT && !this.props.isChanged && !this.props.isSelected)}
                           onClick={this.editButtonClick}/>
                    <input className="Button" type="button" name="deleteButton" value="Удалить"
                           disabled={!(this.props.mode === ShopModeEnum.BROW)}
                           onClick={this.deleteButtonClick}/>
                </td>
            </tr>
        );
    }
}

export default ProductBrow;

const ApplicationError = require("../libs/applicationError");
const FileModel = require("./common/fileModel");

const dataFileName = "../../data/cards.json";

class CardsModel extends FileModel{
    
    constructor() {
        super(dataFileName);
    }

    async getAll() {
        return await this._dataSource;
    }

    async create(newCard) {
        console.log(newCard);
        if (!this._isCardValid(newCard)) {
            throw new ApplicationError("Card is not valid", 400);
        }
        if (this._dataSource.some((card) => {
            return card.cardNumber == newCard.cardNumber;
        })){
            throw new ApplicationError("Card with this cardNumber is already exists in this account", 400);
        };
        const maxId = this._dataSource.reduce((res, cur) => Math.max(res, cur.id), 0);
        console.log(maxId);        
        let _card = {
            id: maxId + 1,
            cardNumber: newCard.cardNumber,
            balance: newCard.balance,
        }
        this._dataSource.push(_card);
        await this._saveUpdates();
        return _card;
    }

    async remove(cardId) {
        const cardIndex = this._dataSource.f((card) => {           
            return card.id == cardId;
        });
        if (cardIndex === -1) {
            throw new ApplicationError(`Unable to remove card with id=${cardId}. Card not exists`, 400);
        }
        this._dataSource.splice(cardIndex, 1);
        await this._saveUpdates();
    }

    /**
     * @returns {Boolean} Валидна ли карта
     * @private
     */
    _isCardValid(card) {
        if (!card || !card.hasOwnProperty("cardNumber") || !card.hasOwnProperty("balance")) {
            return false;
        }
        if (card.cardNumber.length !== 16) {
            return false;
        }
        // TODO: check Lun's algorithm
        return true;
    }
}

module.exports = CardsModel;
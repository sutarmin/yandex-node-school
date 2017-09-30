const ApplicationError = require('../libs/applicationError');
const FileModel = require('./common/fileModel');

const dataFileName = '../../data/cards.json';

class CardsModel extends FileModel {
  constructor() {
    super(dataFileName);
  }

  async getAll() {
    return this._dataSource;
  }

  async create(newCard) {
    if (!this._isValid(newCard)) {
      throw new ApplicationError('Card is not valid', 400);
    }
    if (this._dataSource.some(card => card.cardNumber === newCard.cardNumber)) {
      throw new ApplicationError('Card with this cardNumber is already exists in this account', 400);
    }
    const maxId = this._dataSource.reduce((res, cur) => Math.max(res, cur.id), 0);
    const card = {
      id: maxId + 1,
      cardNumber: newCard.cardNumber,
      balance: newCard.balance,
    };
    this._dataSource.push(card);
    await this._saveUpdates();
    return card;
  }

  async remove(cardId) {
    const cardIndex = this._dataSource.f(card => card.id === cardId);
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
  static _isValid(card) {
    const hasOwnProperty = Object.prototype.hasOwnProperty.call;
    if (!card
        || !hasOwnProperty(card, 'cardNumber')
        || !hasOwnProperty(card, 'balance')) {
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

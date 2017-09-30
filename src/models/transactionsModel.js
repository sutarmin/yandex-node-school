const ApplicationError = require('../libs/applicationError');
const FileModel = require('./common/fileModel');

const dataFileName = '../../data/transactions.json';

class TransactionsModel extends FileModel {
  constructor() {
    super(dataFileName);
  }

  async getByCardId(cardId) {
    return this._dataSource.filter(transaction => transaction.cardId === cardId);
  }

  async create(_transaction) {
    if (!this._isValid(_transaction)) {
      throw new ApplicationError('Transaction is not valid', 400);
    }
    const maxId = this._dataSource.reduce((res, cur) => Math.max(res, cur.id), 0);
    const transaction = {
      cardId: _transaction.cardId,
      type: _transaction.type,
      data: _transaction.data,
      sum: +_transaction.sum,
      time: new Date(),
      id: maxId,
    };
    this._dataSource.push(transaction);
    this._saveUpdates();
    return transaction;
  }

  static _isValid(transaction) {
    const hasOwnProp = Object.prototype.hasOwnProperty.call;
    if (!transaction
            || !hasOwnProp(transaction, 'cardId')
            || !hasOwnProp(transaction, 'type')
            || !hasOwnProp(transaction, 'data')
            || !hasOwnProp(transaction, 'sum')
    ) {
      return false;
    }
    if (!['paymentMobile', 'prepaidCard', 'card2Card'].includes(transaction.type)) {
      return false;
    }
    if (isNaN(transaction.sum)) {
      return false;
    }
    return true;
  }
}

module.exports = TransactionsModel;

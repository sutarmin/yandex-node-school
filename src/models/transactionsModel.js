const ApplicationError = require("../libs/applicationError");
const FileModel = require("./common/fileModel");

const dataFileName = "../../data/transactions.json";

class TransactionsModel extends FileModel {
    constructor() {
        super(dataFileName);
    }

    async getByCardId(cardId) {
        return await this._dataSource.filter(transaction => transaction.cardId == cardId);
    }

    async create(_transaction) {
        if (!this._isValid(_transaction)) {
            throw new ApplicationError("Transaction is not valid", 400);
        }
        const maxId = this._dataSource.reduce((res, cur) => Math.max(res, cur.id), 0);
        const transaction = {
            cardId: _transaction.cardId,
            type: _transaction.type,
            data: _transaction.data,
            sum: +_transaction.sum,
            time: new Date(),
            id: maxId
        }
        this._dataSource.push(transaction);
        this._saveUpdates();
        return transaction;
    }

    _isValid(transaction) {
        if (!transaction 
            || !transaction.hasOwnProperty("cardId")
            || !transaction.hasOwnProperty("type")
            || !transaction.hasOwnProperty("data")
            || !transaction.hasOwnProperty("sum")
        ) {
            return false;
        }
        if (!["paymentMobile", "prepaidCard", "card2Card"].includes(transaction.type)) {
            return false;
        }
        if (isNaN(transaction.sum)) {
            return false;
        }
        return true;
    }
}
/*
{
		"id": 1,
		"cardId": 1,
		"type": "prepaidCard",
		"data": "220003000000003",
		"time": "2017-08-9T05:28:31+03:00",
		"sum": "2345"
	} */

module.exports = TransactionsModel;
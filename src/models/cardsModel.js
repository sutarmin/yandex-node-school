class CardsModel {
    
    constructor() {
        this.data = [
            {
                id: 1,
                cardNumber: "4504012345670189",
                balance: 3000,
            },
            {
                id: 2,
                cardNumber: "4504012345670181",
                balance: 2000,
            },
            {
                id: 3,
                cardNumber: "4504012345670182",
                balance: 1000,
            }
        ];
    }

    getAll() {
        return this.data;
    }

    create(card) {
        const maxId = this.data.reduce((cur, res) => Math.max(cur.id, res.id));        
        let _card = {
            id: maxId,
            cardNumber: card.cardNumber,
            balance: card.balance,
        }
        this.data.push(_card);
    }
}

module.exports = CardsModel;
const Koa = require("koa");
const bodyParser = require("koa-bodyparser")();
const router = require("koa-router")();
const serve = require("koa-static");

// libs
const ApplicationError = require("./libs/applicationError");

// middlewares
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const timeMeasurement = require("./middlewares/timeMeasurement");
const modelsInitializer = require("./middlewares/modelsInitializer");

// models
const CardsModel = require("./models/cardsModel");
const TransactionsModel = require("./models/transactionsModel");

// controllers
const cardsController = require("./controllers/cards");
const transactionsController = require("./controllers/transactions");

const app = new Koa();

router.param('id', (id, ctx, next) => next());

router.get("/cards/", cardsController.get);
router.post("/cards/", cardsController.add);
router.delete("/cards/:id", cardsController.remove);

router.get('/cards/:id/transactions/', transactionsController.get);
router.post('/cards/:id/transactions/', transactionsController.add);

app.use(logger);
app.use(timeMeasurement);
app.use(errorHandler);
app.use(async (ctx, next) => {
    ctx.cardsModel = new CardsModel();
    ctx.transactionsModel = new TransactionsModel();

    await Promise.all([
            ctx.cardsModel.loadFile(),
            ctx.transactionsModel.loadFile()
    ]);

    await next();
});

app.use(bodyParser);
app.use(router.routes());
app.use(serve("./public"));

app.listen(3000,() => {
    console.log("Yandex.Cards now listenig on port 3000");
});
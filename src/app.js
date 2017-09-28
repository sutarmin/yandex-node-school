const Koa = require("koa");
const bodyParser = require("koa-bodyparser")();
const router = require("koa-router")();
const serve = require("koa-static");

/// libs
const ApplicationError = require("./libs/applicationError");

// models
const CardsModel = require("./models/cardsModel");

// controllers
const cardsController = require("./controllers/cards");

const app = new Koa();

router.param('id', (id, ctx, next) => next());

router.get("/cards/", cardsController.get);
router.post("/cards/", cardsController.add);
router.delete("/cards/:id", cardsController.remove);

// error handler
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		console.log('Error detected', err);
        ctx.status = err instanceof ApplicationError ? err.status : 500;
        ctx.set("Content-Type", "application/json")
		ctx.body = `{ "error": "${err.message}" }`;
	}
});

// TODO: logger

app.use(async (ctx, next) => {
    ctx.cardsModel = new CardsModel();

    await Promise.all([
            ctx.cardsModel.loadFile(),
    ]);

    await next();
});

app.use(bodyParser);
app.use(router.routes());
app.use(serve("./public"));

app.listen(3000,() => {
    console.log("App now listenig on port 3000");
});
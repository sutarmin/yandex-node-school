const Koa = require("koa");
const bodyParser = require("koa-bodyparser")();
const router = require("koa-router")();
const serve = require("koa-static");

const cardsController = require("./controllers/cards");

const app = new Koa();

router.get("/cards/", cardsController.get);
router.post("/cards/", cardsController.post);

app.use(bodyParser);
app.use(router.routes());
app.use(serve("./public"));

app.listen(3000,() => {
    console.log("App now listenig on port 3000");
});
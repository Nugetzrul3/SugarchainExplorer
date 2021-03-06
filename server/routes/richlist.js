const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    try {
        const { collections: { addresses }, config: { limits: { richlist: limit } } } = ctx.locals;

        const richlist = await addresses
            .find({})
            .project({ _id: 0 })
            .sort({ balance: -1 })
            .collation({ locale: 'en_US', numericOrdering: true })
            .limit(limit)
            .toArray();

        ctx.body = { data: richlist };
    } catch (error) {
        console.error(error);
        ctx.throw(500);
    }
});

module.exports = router;

// eslint-disable-next-line strict
module.exports = options => {
    const { whiteList } = options;
    return async function (ctx, next) {
        const { origin } = ctx.request.header;
        console.log(origin);
        if (whiteList.includes('*') || whiteList.includes(origin)) {
            console.log('isok')
            ctx.set('Access-Control-Allow-Origin', origin);
            ctx.set('Access-Control-Allow-Methods', '*');
            ctx.set('Access-Control-Allow-Headers', 'x-requested-with,authorization,content-type,xxx');
            ctx.set('Access-Control-Allow-Credentials', 'true');
            console.log(ctx)
        }

        await next();
    };
}

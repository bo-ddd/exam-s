// eslint-disable-next-line strict
module.exports = () =>
  async function(ctx, next) {
    console.log('ctx.url:' + ctx.url);
    if (ctx.method === 'GET') {
      console.log('ctx.request.query:' + JSON.stringify(ctx.request.query));
    } else if (ctx.method === 'POST') {
      console.debug('ctx.request.body:' + JSON.stringify(ctx.request.body, null, 2));
    }
    await next();
  };

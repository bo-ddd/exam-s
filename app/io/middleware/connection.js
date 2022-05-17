module.exports = app =>{
    return async (ctx,next) =>{
        ctx.socket.emit('res','connected!');
        console.log('server socket connected');
        await next();
    }
}
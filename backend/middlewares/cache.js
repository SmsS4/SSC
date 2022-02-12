const { SocketClosedUnexpectedlyError } = require("@node-redis/client");
const asyncRedis = require("async-redis");

let client = null;



function startRedisClient(config) {
    console.log("Connecting to redis")
    client = asyncRedis.createClient({
        host: config.host,
        port: config.port
    });
    client.on('connect', function() {
        console.log('redis connected');
    });     
}


module.exports = (config, { strapi })=> {
    return async (ctx, next) => {
        if (client == null) {
            startRedisClient(config);
        }
        if (ctx.request) {
            if (ctx.request.method == "GET") {
                const key = ctx.request.url;
                console.log(ctx.request.url);

                if (config.cacheRoutes.some(v => key.includes("/api/" + v))) {
                    const value = await client.get(key);
                    if (value == null) {
                        await next()
                        client.set(key, JSON.stringify(ctx.response.body));
                    }else {
                        console.log("Read from cache")
                        ctx.response.body = JSON.parse(value)
                    }
                }else {
                    await next()
                }
                
            }else {
                client.flushdb();
                await next()
            }
        }
        
      };
  };
   
const client = require('prom-client')
const collectDefaultMetrics = client.collectDefaultMetrics;
const register = new client.Registry()
const express = require('express');
const app = express();

register.setDefaultLabels({
    app: 'backend'
  })
collectDefaultMetrics({ register });

app.get('/metrics', async (req, res) => {
    console.log("metrics called")
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
    res.end();
});

let serverStarted = false;

function startPromServer(port) {
    app.listen(port, () => console.log(`Server is running on http://localhost:${port}, metrics are exposed on http://localhost:${port}/metrics`));
}

const s200 = new client.Counter({
    name: 's200',
    help: 'number_ok_status',
});
register.registerMetric(s200);

const s403 = new client.Counter({
    name: 's403',
    help: 'number_unauthorized_status',
});
register.registerMetric(s403);

const s500 = new client.Counter({
    name: 's500',
    help: 'number_internal_error',
});
register.registerMetric(s500);

const cnt_reqouests = new client.Counter({
    name: 'cnt_reqouests',
    help: 'number_of_requests',
});
register.registerMetric(cnt_reqouests);

const total_requests_time = new client.Counter({
    name: 'total_requests_time',    
    help: 'total_requests_time' ,
});
register.registerMetric(total_requests_time);


module.exports = (config, { strapi })=> {
    return async (ctx, next) => {
        if (!serverStarted) {
            startPromServer(config.port);
            serverStarted = true;
        }
        const start = Date.now();
        await next();
        cnt_reqouests.inc();
        const status = ctx.response.status;
        if (status == 200) {
            s200.inc()
        }else if (status == 403) {
            s403.inc()
        }else if (status == 500) {
            s500.inc()
        }
        total_requests_time.inc(Math.ceil(Date.now() - start));
      };
  };
   
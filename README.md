# run

## frontend

```
cd frontend
npm install
npm start
```

## backend

```
cd backend
npm install
npm run develop
```

## prometheus & redis

```
docker-compose up
```

## DOCKER
TODO

# features

## backend

### strapi v4

### strapi v4 panel

![](assets/1.png)

### redis cache for get requests

without cache:
![](assets/2.png)

with cache:
![](assets/3.png)


### prometheus
![](assets/4.png)
http://localhost:9090/graph?g0.range_input=1h&g0.expr=s200&g0.tab=0&g1.range_input=1h&g1.moment_input=2022-02-12%2014%3A34%3A01&g1.expr=s403&g1.tab=0&g2.range_input=1h&g2.expr=s500&g2.tab=0&g3.range_input=1h&g3.expr=cnt_reqouests&g3.tab=0&g4.range_input=1h&g4.expr=total_requests_time&g4.tab=0
![](assets/5.png)

### sentry (plugin)
![](assets/6.png)

## frontend

### antd
### reactjs
### responsive design

### search
![](assets/7.png)

### search by tag, writer or blog
![](assets/8.png)

### filter by tag
![](assets/9.png)
![](assets/10.png)

### writers profile
#### timeline of blogs
#### name, bio and ...
#### avatar
![](assets/11.png)

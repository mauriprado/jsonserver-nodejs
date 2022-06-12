const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json', 'routes.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

server.set('port', process.env.PORT || 3000);

server.db = router.db

server.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);
server.options('*', cors());

server.use(middlewares);
server.use(auth);
server.use(router);
server.listen(server.get('port'), () => {
    console.log('JSON Server is running');
});
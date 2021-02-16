# typescript-express-1

Node + ExpressJs + Typescript

SEQUELIZE
https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html
0 - Install
npm install -D sequelize-cli sequelize mysql2
1 - INIT
npx sequelize-cli init

2 - Config

3 - CrearDB
4 - Migrar
4.1 UP
4.2 DOWN
5 - Seeders

//PROGRAMACION ORIENTADA POR CAPAS MS
-> INPUT -> MW1, MW2, MW3 -> ACCION -> Dominio -> Aplicacion -> OUPUT
APP(ACTIONS,MW) <|> DOMAIN <|> Infra(DB, LOGGER, REDIS....)

//EVENT LISTENER
{ eventId: string, listener: (args) => Promise<void> }

//EVENT EMIITER
{
eventId: strign,
payload: any
ts_ms: Date
}

// BRAND REPOSITORY

...Brand.create().then(brand=> {
EventManager.getInstance().emit({
eventId: EVENT_ORM_BRAN_CREATE,
payload: {after: null, before: brand, .....},
ts: new Date()
})
})

//APP
EventManager.getInstance().register({
eventListener: {
eventId: EVENT_ORM_BRAN_CREATE,
listener: (args) => {
console.log(args);
}
}
})

interface EventManager {
emit(args: {
eventDTO: EventDTO
}),
register(args: {
eventListener: EventListener
})
}

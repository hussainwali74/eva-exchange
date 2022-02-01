module.exports = {
    "factories": ["dist/**/database/factories/**/*.js"],
    "seeds": ["dist/**/database/seeds/**/*.js"],
    //seeds: ['src/database/seeds/**/*{.ts,.js}'],//
    //factories: ['src/database/factories/**/*{.ts,.js}'],
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "eva_exchange",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    //autoLoadEntities: true,
    //cli: {
    //    migrationsDir: "migration"
    //},
    //synchronize: true
}

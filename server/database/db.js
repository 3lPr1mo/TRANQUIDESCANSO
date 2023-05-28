import Sequelize from 'sequelize';

export const db = new Sequelize(
    'proy_hoteles',
    'postgres',
    '123456',
    {
    host: 'localhost',
    dialect:'postgres',}
);
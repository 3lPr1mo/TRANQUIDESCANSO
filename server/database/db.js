import Sequelize from 'sequelize';

export const db = new Sequelize(
    'proy_hoteles',
    'postgres',
    '1234',
    {
    host: 'localhost',
    dialect:'postgres',}
);
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,       
    process.env.DB_USER,       
    process.env.DB_PWD,        
    {
        host: process.env.DB_HOST,   
        port: process.env.DB_PORT,   
        dialect: 'postgres',         
        logging: false,            
    }
);

// Testando a conexão
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados foi bem-sucedida.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
})();

export default sequelize;

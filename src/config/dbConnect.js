import pg from 'pg';

async function connect() {
    
    const { Pool } = pg;
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PWD ,
        port: process.env.DB_PORT,
    });

    const client = await pool.connect();
    console.log("criou o pool de conexão");
    client.release();

    global.connction = pool;
    return pool.connect();
}

export default { connect };





const { Pool } = require('pg');
const connectionString = 'postgresql://pavel:qwertyasd@informatika-test.cfukopd77khx.us-east-2.rds.amazonaws.com:5432/informatika_test_db';

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};

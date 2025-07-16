import oracledb, { outFormat } from 'oracledb';

export async function executeQuery(query: string) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING,
    });

    const result = await connection.execute(
      query, 
      [], // binding parameters
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT // this will make sure rows are now returned as key value/ pair object
      }
    );

    return result.rows;
  }
  catch(err) {
    throw err;
  }
  finally {
    await connection.close();
  }
}
import { Pool } from "pg";

const connectionString = 'postgres://xiderlib:v061GksDl3pp_4pGIf0IsWi4ssVJCv8w@motty.db.elephantsql.com/xiderlib';

const db = new Pool({connectionString});

export default db;
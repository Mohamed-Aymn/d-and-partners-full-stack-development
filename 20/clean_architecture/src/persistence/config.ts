export type Config = {
  port: number;
  db: {
    name: string;
    host: string;
    port: string;
    user: string | undefined;
    password: string | undefined;
    uri: string;
  };
  passwordPepper: string | undefined;
  jwtSecret: string | undefined;
};

export function loadConfig(): Config {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || '27017';
  const dbName = process.env.DB_NAME || 'mydb';

  return {
    port: Number(process.env.PORT) || 3000,
    db: {
      name: dbName,
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      uri: `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
    },
    passwordPepper: process.env.PASSWORD_PEPPER,
    jwtSecret: process.env.JWT_SECRET
  };
}

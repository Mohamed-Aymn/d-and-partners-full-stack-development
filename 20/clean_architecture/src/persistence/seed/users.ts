export type SeedUser = {
  email: string;
  password: string;
};

export const seedUsers: SeedUser[] = [
  {
    email: 'alice@example.com',
    password: 'password123'
  },
  {
    email: 'bob@example.com',
    password: 'password123'
  }
];

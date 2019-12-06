let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: "ec2-174-129-255-4.compute-1.amazonaws.com",
    port: 5432,
    user: "ncvfmzkacbfbnc",
    password:
      "2827ee2fae09d6816b325f361d074be62ff5cadd5095539b8c7f7516fbb2e105",
    database: "d1eojtm9g6qa0t"
  };
}
// console.log(dbParams);
module.exports = dbParams;

module.exports = pool => {
  const findUserId = function(email) {
    const query = `SELECT id FROM users WHERE email = $1`;
    return pool.query(query, [email]).then(res => res.rows[0]);
  };

  return {
    findUserId
  };
};

const Chance = require("chance");
const chance = new Chance();

module.exports = {
  generateRandomUser: () => {
    const gender = chance.gender();
    const firstName = chance.first({gender: gender});
    const lastName = chance.last({gender: gender});
    const email = firstName.charAt(0) + lastName + '@email.com';
    const phone = chance.phone();

    return {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone
    };
  }
};

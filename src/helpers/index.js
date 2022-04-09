const resp = require("./resp.hp");
const jwt = require("./jwt.hp");
const password = require("./password.hp");
const messages = require("./messages.hp");
const GenericResponse = require("./generic.hp");

module.exports = {
  ...resp,
  ...jwt,
  ...password,
  ...messages,
  ...GenericResponse,
};

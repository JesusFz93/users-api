const { Schema, model } = require("mongoose");

const RoleSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

RoleSchema.methods.toJSON = function () {
  const { __v, _id, ...rest } = this.toObject();
  rest.id = _id;
  return rest;
};

module.exports = model("Role", RoleSchema);

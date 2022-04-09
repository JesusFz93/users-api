const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    roles_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true,
      },
    ],
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    user_name: {
      type: String,
      required: [true, "El usuario es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
    },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const { __v, _id, ...rest } = this.toObject();
  rest.id = _id;
  return rest;
};

module.exports = model("User", UserSchema);

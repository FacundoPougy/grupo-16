const { body } = require("express-validator");
const { User } = require("../../database/models");

const acceptedExtensions = [".jpg", ".jpeg", ".png"];

const registerValidations = {
  registerCheck: [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar un nombre para el usuario!")
      .bail()
      .isLength({
        min: 2,
      })
      .withMessage("El nombre debe tener al menos 2 caracteres"),

    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar un apellido!")
      .bail()
      .isLength({
        min: 2,
      })
      .withMessage("El apellido debe tener al menos 2 caracteres"),

    body("email")
      .notEmpty()
      .withMessage("Debes ingresar tu e-mail!")
      .bail()
      .trim()
      .isEmail()
      .withMessage("El e-mail es inválido")
      .bail()
      .custom(async (value, { req }) => {
        let duplicatedEmail = await User.findOne({
          where: { email: req.body.email },
        });
        if (duplicatedEmail) {
          throw new Error("Ese e-mail ya se encuentra en la base de datos");
        }
        return true;
      }),
    body("password")
      .notEmpty()
      .withMessage("Debes ingresar una contraseña!")
      .bail()
      .isLength({ min: 8 })
      .withMessage("la contraseña debe tener al menos 8 caracteres"),

    body("image").custom((value, { req }) => {
      const uploadedFiles = req.files;

      uploadedFiles.forEach((file) => {
        const fileExtension = file.originalname
          .substring(file.originalname.lastIndexOf("."))
          .toLowerCase();
        if (!acceptedExtensions.includes(fileExtension)) {
          throw new Error(`La extensión ${fileExtension} no está permitida.`);
        }
      });

      return true;
    }),
  ],
};

module.exports = registerValidations;

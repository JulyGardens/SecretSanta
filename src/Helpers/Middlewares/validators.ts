import { CustomRequest, RegisterBody } from "@Helpers/types";
import { CustomValidator } from "express-validator";

export const userRegisterValidator: CustomValidator = (value, { req }) => {
  return new Promise((resolve, reject) => {
    const { body } = req as CustomRequest<RegisterBody>;
    const { firstName, lastName, wishes } = body;
    const errors = [];

    if (!firstName || typeof firstName != "string" || firstName.length < 2) {
      errors.push(
        "You must specify firstName field. Which must be a string, and length must be more then 2 symbols."
      );
    }

    if (!lastName || typeof lastName != "string" || lastName.length < 2) {
      errors.push(
        "You must specify lastName field. Which must be a string, and length must be more then 2 symbols."
      );
    }

    if (!wishes || typeof wishes != "string") {
      errors.push("You must specify wishesh field. Which must be a string.");
    }

    if (!errors.length) {
      resolve(true);
    } else {
      reject(errors);
    }
  });
};

export const userBulkCreateValidator: CustomValidator = (value, { req }) => {
  return new Promise((resolve, reject) => {
    const errors = [];

    if (req.params) {
      const { amount } = req.params;

      if (!amount) {
        errors.push("You must specify amount param");
      }

      if (isNaN(+amount)) {
        errors.push("Amount must be a valid integer");
      }

      if (+amount < 1 || +amount > 500) {
        errors.push("Amount must be in 1-500 range.");
      }

      if (errors.length) {
        reject(errors);
      } else {
        resolve(true);
      }
    } else {
      reject(["You must specify amount param"]);
    }
  });
};

export const userDetailsValidator: CustomValidator = (value, { req }) => {
  return new Promise((resolve, reject) => {
    const errors = [];

    if (req.params) {
      const { id } = req.params;

      if (!id) {
        errors.push("You must specify id param!");
      }

      if (isNaN(+id)) {
        errors.push("You must specify number!");
      }

      if (+id < 1) {
        errors.push("Id can't be lower then 1!");
      }

      if (errors.length) {
        reject(errors);
      } else {
        resolve(true);
      }
    } else {
      reject(["No params was specified!"]);
    }
  });
};

import * as yup from "yup";
export const schema = yup.object({
  currency_send: yup.string().required("This is required field"),
  currency_receive: yup.string().required("This is required field"),
  send: yup
    .string()
    .required("This is required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .max(20, "Max length limit 20 charactor"),
  receive: yup
    .string()
    .required("This is required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .max(20, "Max length limit 20 charactor"),
});

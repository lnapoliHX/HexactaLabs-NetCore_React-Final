import * as yup from "yup";
import "../../../common/helpers/YupConfig";

export default yup.object().shape({
  name: yup.string().required(),
  costPrice: yup.number().required(),
  salePrice: yup.number().required(),
  stock: yup
    .number()
    .integer()
    .positive()
    .min(1)
    .required(),
  productTypeId: yup
    .string()
    .required()
    .notOneOf(["default"], "Please select an option"),
  providerId: yup
    .string()
    .required()
    .notOneOf(["default"], "Please select an option")
});

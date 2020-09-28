import * as yup from "yup";
import "../../../common/helpers/YupConfig";

const schema = yup.object().shape({
  name: yup.string().required(),
  costPrice: yup.number().required(),
  salePrice: yup.number().required(),
  stock: yup.number().required()
  /*
  productTypeName: yup.string().required(),
  providers: yup.array().required() 
  */
});

export default schema;

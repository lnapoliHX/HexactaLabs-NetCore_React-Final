import * as yup from "yup";
import "../../../common/helpers/YupConfig";

export default yup.object().shape({
  cantidad: yup.number().required(),
});

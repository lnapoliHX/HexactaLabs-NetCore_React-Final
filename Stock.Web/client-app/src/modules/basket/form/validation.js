import * as yup from "yup";
import "../../../common/helpers/YupConfig";

export default yup.object().shape({
  description: yup.string().required()
});

import * as Yup from "yup";

const AddNewItemValidationSchema = Yup.object().shape({
  name: Yup.string().required("Item Name is required"),
  category: Yup.string().required("Category is required"),
});

export default AddNewItemValidationSchema;

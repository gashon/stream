import { FC } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import type { PostCreateRequest } from "@/types";

type FormValues = PostCreateRequest;

const initialValues: FormValues = {
  content: "",
  is_private: false,
  is_draft: false,
};

const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
  console.log({ values, actions });
  alert(JSON.stringify(values, null, 2));
  actions.setSubmitting(false);
};

export const PostForm: FC = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="flex flex-col justify-center space-y-4">
        <ContentInput />
        <ControlPanel />
      </Form>
    </Formik>
  );
};

const ContentInput: FC = () => (
  <div className="flex flex-col">
    <Field
      id="content"
      name="content"
      placeholder="Post..."
      className="p-2 border rounded-md text-black"
      autoComplete="off"
    />
  </div>
);

const ControlPanel: FC = () => (
  <div className="flex justify-between">
    <div className="flex gap-5 items-center">
      <CheckboxInput id="is_private" label="Private" />
      <CheckboxInput id="is_draft" label="Draft" />
    </div>
    <button type="submit" className="p-2 underline rounded-md">
      Submit
    </button>
  </div>
);

const CheckboxInput: FC<{ id: string; label: string }> = ({ id, label }) => (
  <div className="flex justify-center items-center">
    <label htmlFor={id} className="mr-2 cursor-pointer">
      {label}
    </label>
    <Field id={id} name={id} type="checkbox" className="cursor-pointer" />
  </div>
);

export default PostForm;

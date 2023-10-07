import { FC, useState, useEffect } from "react";
import { Formik, Form, Field, FormikHelpers, useFormikContext } from "formik";

import type { PostCreateRequest } from "@/types";
import { useCreatePostMutation } from "@/features";

type FormValues = PostCreateRequest;

const initialValues: FormValues = {
  password: "",
  content: "",
  is_private: false,
  is_draft: false,
};

enum ErrorStatus {
  NoError,
  AuthError,
  ServerError,
}

export const PostForm: FC = () => {
  const [errorStatus, setErrorStatus] = useState<ErrorStatus>(ErrorStatus.NoError);
  const createPostMutation = useCreatePostMutation();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
        createPostMutation.mutate(values);

        if (createPostMutation.isError) {
          setErrorStatus(ErrorStatus.AuthError);
        } else {
          actions.resetForm();
        }
      }}
    >
      <Form className="flex flex-col justify-center space-y-4">
        {errorStatus === ErrorStatus.AuthError && <PasswordInput />}
        <ContentInput />
        <ControlPanel />
      </Form>
    </Formik>
  );
};

const PasswordInput: FC = () => (
  <div className="flex flex-col">
    <Field
      id="password"
      name="password"
      placeholder="password"
      className="p-2 border-b bg-transparent"
      autoComplete="off"
    />
  </div>
);

const ContentInput: FC = () => {
  const [numRows, setNumRows] = useState(2); // Initialize with default row number
  const { values } = useFormikContext<{ content: string }>();

  useEffect(() => {
    setNumRows(values.content.split("\n").length || 1); // Calculate row number based on new lines
  }, [values.content]);

  return (
    <div className="flex flex-col">
      <Field
        as="textarea"
        id="content"
        name="content"
        placeholder="Post..."
        className="p-2 border rounded-md text-black resize-none"
        rows={numRows} // Set dynamic row number
        style={{ overflowY: "auto" }}
        autoComplete="off"
      />
    </div>
  );
};

const ControlPanel: FC = () => (
  <div className="flex justify-between">
    <div className="flex gap-5 items-center">
      <CheckboxInput id="is_private" label="Private" />
      <CheckboxInput id="is_draft" label="Draft" />
    </div>
    <button type="submit" className="p-2 underline rounded-md">
      Create
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

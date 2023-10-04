import { FC } from "react";

import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from "formik";
import type { PostCreateRequest } from "@/types";

type FormValues = PostCreateRequest;

export const PostForm: FC = () => {
  const initialValues: FormValues = {
    content: "",
    is_private: false,
    is_draft: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Form
        className="flex flex-col justify-center"
        style={{
          gap: "1rem",
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="content">Content</label>
          <Field
            id="content"
            name="content"
            placeholder="Post..."
            style={{
              color: "black",
            }}
          />
        </div>

        <div className="justify-between flex">
          <div className="flex flex-row gap-5 justify-center items-center">
            <div className="flex justify-center items-center">
              <label htmlFor="is_private">Private</label>
              <Field id="is_private" name="is_private" type="checkbox" />
            </div>

            <div className="flex justify-center items-center ">
              <label htmlFor="is_draft">Draft</label>
              <Field id="is_draft" name="is_draft" type="checkbox" />
            </div>
          </div>

          <button type="submit">Submit</button>
        </div>
      </Form>
    </Formik>
  );
};

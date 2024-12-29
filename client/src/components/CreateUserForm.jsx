import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, Card } from "antd";

const AntdInput = ({ field, form, ...props }) => {
  return (
    <Input
      {...field}
      {...props}
      onChange={(e) => form.setFieldValue(field.name, e.target.value)}
      onBlur={() => form.setFieldTouched(field.name, true)}
    />
  );
};

const CreateUserForm = () => {
  // Initial form values
  const initialValues = {
    fullName: "",
    email: "",
    contact: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contact: Yup.string()
      .matches(/^\d{10}$/, "Contact must be a 10-digit number")
      .required("Contact is required"),
  });

  // Submit handler
  const onSubmit = (values, { resetForm }) => {
    console.log("Form Data: ", values);
    resetForm();
  };

  return (
    <Card style={{marginBottom:30}}>
      <h2>Contact Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="fullName">Full Name</label>
              <Field
                name="fullName"
                as={AntdInput}
                placeholder="Enter your full name"
              />
              {errors.fullName && touched.fullName && (
                <div style={{ color: "red", fontSize: "0.8em" }}>
                  {errors.fullName}
                </div>
              )}
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                as={AntdInput}
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <div style={{ color: "red", fontSize: "0.8em" }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="contact">Contact</label>
              <Field
                name="contact"
                as={AntdInput}
                placeholder="Enter your contact number"
              />
              {errors.contact && touched.contact && (
                <div style={{ color: "red", fontSize: "0.8em" }}>
                  {errors.contact}
                </div>
              )}
            </div>

            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default CreateUserForm;

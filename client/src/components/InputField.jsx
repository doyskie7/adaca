import React from "react";
import { Field } from "formik";
import { Input } from "antd";

const InputField = ({ label, name, placeholder, type = "text" }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label htmlFor={name} style={{ fontWeight: "bold" }}>
        {label}
      </label>
      <Field name={name}>
        {({ field, meta }) => (
          <>
            <Input
              {...field}
              id={name}
              placeholder={placeholder}
              type={type}
              style={{
                borderColor: meta.touched && meta.error ? "red" : undefined,
              }}
            />
            {meta.touched && meta.error && (
              <div style={{ color: "red", fontSize: "0.8em" }}>{meta.error}</div>
            )}
          </>
        )}
      </Field>
    </div>
  );
};

export default InputField;

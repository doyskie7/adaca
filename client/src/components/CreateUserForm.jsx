import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Card } from "antd";
import { userSchema } from "../schemas/user";
import InputField from "./InputField";
import { usePublicPostRequestsMutation, usePrivateDeleteRequestsMutation, usePrivateUpdateRequestsMutation } from "../hooks/apiServiceReducer";
import AlertResponse from "./AlertResponse";
import { useDispatch, useSelector } from "react-redux";
import { setResponse } from "../hooks/responseReducer";
import { clearCurrentUser } from "../hooks/userReducer";

const CreateUserForm = () => {
    const [initialValues,setInitialValues] = useState({
        full_name: "",
        email: "",
        contact: "",
    })
    const [publicPostRequests, { isLoading, error }] = usePublicPostRequestsMutation();
    const [privateDeleteRequests, { isLoading:isLoadingDelete, error:errorDelete }] = usePrivateDeleteRequestsMutation();
    const [privateUpdateRequests, { isLoading:isLoadingUpdate, error:errorUpdate }] = usePrivateUpdateRequestsMutation();

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state?.user?.item)
    const response = useSelector((state) => state?.response?.item)

    const onSubmit = async (values, { resetForm }) => {
        let result = {}
        if(currentUser?.action === 'update'){
            result = await privateUpdateRequests({
                route: `/user/${currentUser?.key}`,
                body: values,
            });
            dispatch(clearCurrentUser())
        }else if(currentUser?.action === 'create' || !currentUser?.action){
            result = await publicPostRequests({
                route: "/user",
                body: values,
            });
            resetForm()
        }
        dispatch(setResponse({
            ...result,
            reload: !response?.reload
        }));
        setInitialValues({
            full_name: "",
            email: "",
            contact: "",
        })
    };
   

    useEffect(()=>{
        if(currentUser?.action === 'delete'){
            const onSubmitDelete = async (currentUser) => {
                let result = await privateDeleteRequests({
                    route: `/user/${currentUser?.key}`,
                    query:{}
                });
                dispatch(setResponse({
                    ...result,
                    reload: !response?.reload
                }));
            };
            onSubmitDelete(currentUser)
        }
        if(currentUser?.action === 'update'){
            setInitialValues({
                full_name: currentUser?.full_name,
                email: currentUser?.email,
                contact: currentUser?.contact,
            })
        }
    },[currentUser?.key])


    return (
        <Card style={{ marginBottom: 30 }}>
            <h2>Contact Form</h2>
            <Formik
                enableReinitialize 
                initialValues={initialValues}
                validationSchema={userSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div style={{ marginBottom: "10px" }}>
                            <label htmlFor="full_name">Full Name</label>
                            <InputField
                                id="full_name"
                                name="full_name"
                                placeholder="Jane"
                            />
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                            <label htmlFor="email">Email</label>
                            <InputField
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                            <label htmlFor="contact">Contact</label>
                            <InputField
                                id="contact"
                                name="contact"
                                placeholder="Enter your contact number"
                            />
                        </div>

                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isLoading}
                            block
                        >
                            {isLoading || isLoadingUpdate ? "Loading..." : "Submit"}
                        </Button>
                    </Form>
                )}
            </Formik>
            <br />
            <AlertResponse />
        </Card>
    );
};

export default CreateUserForm;

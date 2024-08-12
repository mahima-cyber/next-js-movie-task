import React, { useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "@/service/auth.service";
import { authLogin } from "@/Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
});

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSignUp = async (data) => {
    setLoading(true);
    const res = await authService.signUp(data);
    if (res) {
      const request = {
        email: data.email,
        password: data.password,
      };
      const loginRes = await authService.signIn(request);
      if (loginRes?.token) {
        dispatch(authLogin(loginRes));
        router.push("/");
      }
    }
    setLoading(false);
  };

  return (
    <section className="auth-form-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col sm={6} lg={4}>
            <h2 className="form-title">Sign up</h2>
            <div>
              <Formik
                initialValues={{
                  password: "",
                  email: "",
                  name: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSignUp}
              >
                {({ errors, touched }) => (
                  <Form className="form-card">
                    <div className="form-group">
                      <Field
                        name="name"
                        className={`form-control ${
                          errors.name && touched.name ? "is-invalid" : ""
                        }`}
                        placeholder="Enter name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        name="email"
                        className={`form-control ${
                          errors.email && touched.email ? "is-invalid" : ""
                        }`}
                        placeholder="Enter email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        type="password"
                        name="password"
                        className={`form-control ${
                          errors.password && touched.password
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <Button
                      className="d-flex justify-content-center align-items-center"
                      type="submit"
                      disabled={loading}
                    >
                      Sign Up
                      {loading && (
                        <Spinner
                          animation="border"
                          size="sm"
                          className="ml-2"
                        />
                      )}
                    </Button>
                    <h4 className="already-account">
                      Already have an account?
                      <Button
                        onClick={() => router.push("/signin")}
                        variant="plain"
                      >
                        Sign in
                      </Button>
                    </h4>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignUp;

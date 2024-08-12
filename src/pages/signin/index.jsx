"use client";
import { authLogin } from "@/Redux/Slices/authSlice";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "@/service/auth.service";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

const SignIpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
});

const initialValue = {
  password: "",
  email: "",
};

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = Cookie.get("email") || "";
    const password = Cookie.get("password") || "";
    setInitialValues({
      email,
      password,
    });
  }, []);

  const handleLogin = async (data) => {
    if (data?.rememberMe) {
      Cookie.set("email", data.email, { expires: 30 });
      Cookie.set("password", data?.password, { expires: 30 });
    } else {
      Cookie.remove("email");
      Cookie.remove("password");
    }
    setLoading(true);
    const res = await authService.signIn(data);
    setLoading(false);
    if (res) {
      dispatch(authLogin(res));
      router.push("/");
    }
  };

  return (
    <section className="auth-form-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col sm={6} lg={4}>
            <h2 className="form-title">Sign in</h2>
            <div>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={SignIpSchema}
                onSubmit={handleLogin}
              >
                {({ values, errors, touched }) => (
                  <Form className="form-card">
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
                    <div className="form-group checkbox-group">
                      <div>
                        <Field
                          id="rememberMe"
                          type="checkbox"
                          name="rememberMe"
                          className="form-check"
                          checked={values?.rememberMe}
                        />
                        <span className="checkbox-custom"></span>
                      </div>
                      <label for="rememberMe">Remember me</label>
                    </div>
                    <Button
                      className="d-flex justify-content-center align-items-center"
                      type="submit"
                      disabled={loading}
                    >
                      Login
                      {loading && (
                        <Spinner
                          animation="border"
                          size="sm"
                          className="ml-2"
                        />
                      )}
                    </Button>
                    <h4 className="already-account">
                      Don't have an account?
                      <Button
                        onClick={() => router.push("/signup")}
                        variant="plain"
                      >
                        Sign up here
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

export default SignIn;

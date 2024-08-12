"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactDropzone from "../dropzone/reactDropzone";
import authService from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import PageLoading from "../pageLoading/pageLoading";

const initialVal = {
  title: "",
  year: "",
};
const currentYear = new Date().getFullYear();

const CreateMovie = ({ id }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState("")
  const [preview, setPreview] = useState(null)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [initialValues, setInitialValues] = useState(initialVal)

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    year: Yup.number()
      .typeError("Year must be a number")
      .min(1900, "Year must be at least 1900")
      .max(currentYear, `Year cannot be more than ${currentYear}`)
      .required("Publishing year is required")
  });

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // This will encode the file as base64
    });
  };

  const handleSubmit = async (data) => {
    let res = null
    setIsSubmiting(true)
    if (id) {
      res = await authService.updateMovie(id, { ...data, image: image });
    } else {
      res = await authService.createMovie({ ...data, image: image });
    }
    if (res) {
      toast.success(res?.message)
      setTimeout(() => {
        setIsSubmiting(false)
        handleNavigate()
      }, [1000])
    }

  }

  useEffect(() => {
    if (id) {
      fetchMovie()
    }
  }, [id])

  const fetchMovie = async () => {
    setLoading(true)
    const res = await authService.movieDetails(id);
    setLoading(false)
    if (res) {
      setInitialValues({
        title: res?.title,
        year: res?.year
      })
      setPreview(res?.image)
      setImage(res?.image)
    }
  }

  const handleDrop = async (files) => {
    const file = files[0]
    const base64 = await fileToBase64(file)
    setImage(base64)
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }

  const handleNavigate = (id) => {
    router.push(`/`)
  }

  return (
    <section className="movie-wrapper">
      <PageLoading loading={loading} />
      <Container>
        <Row className="align-items-center justify-content-between movie-header">
          <Col xs={12}>
            <div className="page-head">
              <h4 className="page-title">{id ? "Edit" : "Create a new movie"}</h4>
            </div>
          </Col>
        </Row>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form encType='multipart/form-data'>
              <Row className="justify-content-between">
                <Col sm={5}>
                  <ReactDropzone handleDrop={handleDrop} preview={preview} />
                </Col>
                <Col sm={5}>
                  <div className="form-card" >
                    <div className="form-group">
                      <Field
                        name="title"
                        type="text"
                        placeholder="Title"
                        className={`form-control ${errors.title && touched.title ? "is-invalid" : ""
                          }`}
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        name="year"
                        type="text"
                        placeholder="Publishing year"
                        className={`form-control ${errors.year && touched.year
                          ? "is-invalid"
                          : ""
                          }`}
                      />
                      <ErrorMessage
                        name="year"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="btn-wrapper me-auto mt-5">
                      <Button
                        variant="secondary"
                        type="button"
                        disabled={isSubmiting}
                        onClick={handleNavigate}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={isSubmiting}
                        className="d-flex justify-content-center align-items-center"
                        type="submit"
                      >
                        {id ? "Update" : "Submit"}
                        {isSubmiting && (
                          <Spinner
                            animation="border"
                            size="sm"
                            className="ml-2"
                          />
                        )}
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </section>
  );
};

export default CreateMovie;

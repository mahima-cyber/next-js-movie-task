import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import authService from '@/service/auth.service';
import { useRouter } from 'next/navigation';
import { authLogout } from '@/Redux/Slices/authSlice';
import { useDispatch } from 'react-redux';
import MovieCard from './MovieCard';
import ReactPaginate from '../pagination/ReactPaginate';
import PageLoading from '../pageLoading/pageLoading';

const MovieComponent = () => {

  const router = useRouter();
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)

  const fetchMovieList = async () => {
    const params = `pageNumber=${page}`
    setLoading(true)
    const res = await authService.movieList(params);
    setLoading(false)
    if (res) {
      setData(res?.list || [])
      setTotalPages(res?.totalRecords)
    }
  };

  useEffect(() => {
    fetchMovieList();
  }, [page]);

  const handleLogout = () => {
    dispatch(authLogout())
  }

  const handleNavigate = () => {
    router.push(`movie`)
  }

  const handlePaginate = (_page) => {
    setPage(_page)
  }

  return (
    <section className={`movie-wrapper ${!loading && "movie-wrapper-empty"} ${data?.length && "movie-empty"}`}>
      <PageLoading loading={loading} />
      <Container>
        {data?.length ? (
          <>
            <Row className="align-items-center justify-content-between movie-header">
              <Col xs={8} sm={6}>
                <div className="page-head">
                  <h4 className="page-title">My movies</h4>
                  <Button variant="plain" className="btn-icon" onClick={handleNavigate}    >
                    <img
                      src="/assets/add-icon.svg"
                      alt="add"
                      className="img-fluid"
                    />
                  </Button>
                </div>
              </Col>
              <Col xs={4} sm={6} className="text-end">
                <Button onClick={handleLogout} variant="plain" className="btn-icon logout-btn">
                  <span className="text">Logout</span>
                  <img
                    src="/assets/logout-icon.svg"
                    alt="add"
                    className="img-fluid"
                  />
                </Button>
              </Col>
            </Row>
            <Row>
              {data?.map((movie, index) => {
                return <MovieCard data={movie} key={index} />
              })}
            </Row>
            <ReactPaginate currentPage={page} handlePaginate={handlePaginate} totalPages={totalPages} />
          </>
        ) : (
          !loading ? <div className="empty-movie-box">
            <h2 className="empty-title">Your movie list is empty</h2>
            <Button onClick={handleNavigate}>Add a new movie</Button>
          </div> : ''
        )}
      </Container>
    </section>
  );
};

export default MovieComponent;

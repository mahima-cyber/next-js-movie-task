import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './pageLoading.scss'


const PageLoading = ({ loading }) => {
    return (
        loading ?
            <div className='page-loading'>
                <Spinner animation="grow" variant="primary" />;
            </div> : null
    )
}
export default PageLoading;
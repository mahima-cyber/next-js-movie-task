import "../app/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/component/layout/Layout";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from "@/Redux/Store";


export default function RootLayout({ Component, pageProps }) {
    return (
        <div className="page-wrapper">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </PersistGate>
                <ToastContainer />
            </Provider>
        </div>
    );
}


import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const UNAUTHORIZED_ROUTES = ['/sigin', '/signup']

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const pathName = usePathname()

        const { token } = useSelector((state) => {
            return {
                token: state?.auth?.user?.token
            }
        })
        useEffect(() => {
            if (!token) {
                if (!UNAUTHORIZED_ROUTES.includes(pathName)) {
                    router.push('/signin');
                }
            } else {
                if (UNAUTHORIZED_ROUTES.includes(pathName)) {
                    router.push('/');
                }
            }
        }, [token]);

        return <WrappedComponent {...props} />;
    };
};
export default withAuth;
import { Navigate, Route, Routes, useLocation, Outlet } from 'react-router-dom';
import { useAppSelector } from './application/hooks';
import LoginPage from './presentation/authentication/login';
import RegisterPage from './presentation/authentication/register';
import { Layout } from './presentation/core/layout';
import HomePage from './presentation/home';
import SplashPage from './presentation/home/splash';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>

                <Route path="/" element={<SplashPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<RequireAuth />} >
                    <Route
                        path="/home"
                        element={
                            <HomePage />
                        }
                    />
                </Route>

            </Route>
        </Routes>
    );
}

function RequireAuth() {
    const user = useAppSelector((state) => state.auth.user)

    let location = useLocation()

    if (!user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default App;


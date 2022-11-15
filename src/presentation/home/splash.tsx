import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../../application/authentication/slice";
import { useAppSelector, useAppDispatch } from "../../application/hooks";

const SplashPage = () => {
    let auth = useAppSelector((state) => state.auth)
    let dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkAuth())
    }, [])


    if (auth.status != 'idle')
        if (auth.user) {
            return <Navigate to={'home'} replace />
        } else {
            return <Navigate to={'login'} replace />
        }

    return (
        <div className='w-full h-screen flex items-center justify-center text-2xl'>
            Loading with Splash
        </div>
    )
}

export default SplashPage

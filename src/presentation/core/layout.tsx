import { Link, Outlet } from 'react-router-dom';
import { logout } from '../../application/authentication/slice';
import { useAppDispatch, useAppSelector } from '../../application/hooks';

export function Layout() {
    const auth = useAppSelector(state => state.auth)

    let dispatch = useAppDispatch()
    const signout = () => dispatch(logout())

    return (
        <div>
            <div className='text-white font-semibold bg-blue-500 px-5 py-3'>
                {auth.user != null ?
                    <div className='flex justify-between'>
                        <Link to="/home">Home</Link>
                        <button onClick={signout}>Signout</button>
                    </div>
                    :
                    <div className='flex justify-end gap-x-5'>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                }
            </div>
            <Outlet />
        </div>
    );
}

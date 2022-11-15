import { Navigate, useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../application/hooks';
import { checkAuth, login } from '../../application/authentication/slice';
import { useEffect } from 'react';
import { CredentialType } from '../../utils/types';

type Inputs = CredentialType

const LoginPage = () => {
    let location = useLocation();

    let auth = useAppSelector((state) => state.auth)
    let dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    let from = location.state?.from?.pathname || "/home";

    const onSubmit: SubmitHandler<Inputs> = (data): void => {
        dispatch(login(data))
    }

    if (auth.user) {
        return <Navigate to={from} />
    }

    if (auth.status == 'pending') {
        return (
            <div className='w-full h-screen flex items-center justify-center text-2xl'>
                Loading
            </div>
        )
    }

    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center'>
            <form className="w-11/12 rounded-lg px-4 py-2 border border-gray-400 max-w-md" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' {...register('email', { required: true })} />
                    {errors.email && <span className='text-red-500 text-sm'>Email required</span>}
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' {...register('password', { required: true })} />
                    {errors.password && <span className='text-red-500 text-sm'>Password required</span>}
                </div>
                <div className='input-container'>
                    <div>
                        <button type='submit' className='w-auto px-4 py-2 bg-blue-500 rounded text-white'>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginPage

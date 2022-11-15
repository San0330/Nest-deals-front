import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../application/hooks';
import { register as registerUser } from '../../application/authentication/slice';
import { RegisterUserType } from '../../utils/types';
import { Navigate } from 'react-router-dom';

type Inputs = RegisterUserType

const RegisterPage = () => {

    let auth = useAppSelector((state) => state.auth)
    let dispatch = useAppDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data): void => {
        dispatch(registerUser(data))
    }

    if (auth.status == 'pending') {
        return (
            <div className='w-full h-screen flex items-center justify-center text-2xl'>
                Loading
            </div>
        )
    }

    if (auth.status == 'succeeded') {
        return <Navigate to='/login' />
    }

    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center'>
            <form className="w-11/12 rounded-lg px-4 py-2 border border-gray-400 max-w-md" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" id='first_name' {...register('first_name', { required: true })} />
                    {errors.first_name && <span className='text-red-500 text-sm'>First name required</span>}
                </div>
                <div className="input-container">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" id='last_name' {...register('last_name', { required: true })} />
                    {errors.last_name && <span className='text-red-500 text-sm'>Last name required</span>}
                </div>
                <div className="input-container">
                    <label htmlFor="date_of_birth">Date of birth</label>
                    <input type="date" id='date_of_birth' {...register('date_of_birth', { required: true })} />
                    {errors.date_of_birth && <span className='text-red-500 text-sm'>Date of birth required</span>}
                </div>
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

export default RegisterPage

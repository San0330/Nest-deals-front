import { MouseEvent } from 'react';

const HomePage = () => {

    const getProducts = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
    }

    return (
        <div className='w-3/4 mt-52 px-8 py-5 mx-auto bg-white rounded-lg shadow-xl'>
            <p className='text-lg p-5'>You are logged in</p>
            <button
                className='px-4 py-2 bg-green-500 rounded text-white'
                onClick={(e) => getProducts(e)}
            >
                Get Products
            </button>
        </div>
    )

}

export default HomePage

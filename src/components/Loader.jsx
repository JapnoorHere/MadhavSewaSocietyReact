import React from 'react'
import { useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners';

const Loader = () => {

    const isLoading = useSelector(store => store.loading.isLoading);

    return (
        <div>
            {isLoading && ( 
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
                    <BeatLoader
                        color="#fdba74"
                        loading
                        size={30}
                    />
                </div>
            )}
        </div>
    )
}

export default Loader

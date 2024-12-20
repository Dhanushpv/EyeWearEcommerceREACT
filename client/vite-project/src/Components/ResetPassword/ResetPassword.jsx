function ResetPassword() {

    return (<>

    <div className="bg-zinc-200 w-full h-screen flex justify-center items-center">
        
    <div className="bg-gray-800 text-white rounded-lg p-8 md:p-16 shadow-lg w-full max-w-lg text-center">
            <div className="flex justify-center mb-6">
                <div className="bg-gray-700 p-4 rounded-full">
                    <i className="fas fa-lock text-3xl" />
                </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                Password Protected
            </h1>
            <p className="text-gray-400 mb-8">
                This content is password protected. To view it please enter your password
                below.
            </p>
            <form className="flex flex-col md:flex-row items-center justify-center">
                <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-full md:w-auto md:flex-1 p-3 rounded-l-lg md:rounded-l-lg md:rounded-r-none text-gray-900 focus:outline-none"
                />
                <button
                    type="submit"
                    className="w-full md:w-auto mt-4 md:mt-0 md:ml-2 bg-white text-gray-900 p-3 rounded-r-lg md:rounded-r-lg md:rounded-l-none font-semibold"
                >
                    Submit Now
                </button>
            </form>
        </div>
    </div>


    </>)

} export default ResetPassword
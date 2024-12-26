function Mebership() {

    return(<>
    
    <div className="container mx-auto p-4 " style={{
    background: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), 
      url('https://i.ibb.co/fvNbLLT/rb-51307.png')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }}>
  <h1 className="text-5xl font-bold text-center text-white mb-8">
    Memberships &amp; Subscriptions
  </h1>
  <p className="text-center text-lg text-slate-500 mb-12">
    Choose the plan that’s right for you and unlock exclusive benefits!
  </p>
  <div className="flex flex-nowrap justify-center gap-4 overflow-x-auto
            [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-transparent">
    {/* Basic Membership */}
    <div className="w-full md:w-1/3 flex-shrink-0 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Basic Membership
        </h2>
        <p className="text-4xl font-bold text-gray-800 mb-4">$9.99/month</p>
        <ul className="text-left mb-4">
          <li className="mb-2">✔ Access to basic features</li>
          <li className="mb-2">✔ Community support</li>
          <li className="mb-2">✔ Monthly newsletter</li>
        </ul>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Join Now
        </button>
      </div>
    </div>
    {/* Premium Membership */}
    <div className="w-full md:w-1/3 flex-shrink-0 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Premium Membership
        </h2>
        <p className="text-4xl font-bold text-gray-800 mb-4">$19.99/month</p>
        <ul className="text-left mb-4">
          <li className="mb-2">✔ All Basic features</li>
          <li className="mb-2">✔ Priority support</li>
          <li className="mb-2">✔ Exclusive content</li>
          <li className="mb-2">✔ Access to webinars</li>
        </ul>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Join Now
        </button>
      </div>
    </div>
    {/* Pro Membership */}
    <div className="w-full md:w-1/3 flex-shrink-0 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Pro Membership
        </h2>
        <p className="text-4xl font-bold text-gray-800 mb-4">$29.99/month</p>
        <ul className="text-left mb-4">
          <li className="mb-2">✔ All Premium features</li>
          <li className="mb-2">✔ One-on-one coaching</li>
          <li className="mb-2">✔ Early access to new features</li>
       
        </ul>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Join Now
        </button>
      </div>
    </div>
  </div>
  <div className="text-center mt-12">
    <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing?</h2>
    <p className="text-slate-500 mb-4">
      Contact our support team for personalized recommendations.
    </p>
    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
      Contact Support
    </button>
  </div>
</div>

    
    </>)
    
}
export default Mebership
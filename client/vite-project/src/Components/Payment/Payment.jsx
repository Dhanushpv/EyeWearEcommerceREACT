function Payment(){
    return(<>

<>
  <h1 className="text-3xl font-bold mb-8">Payment Options</h1>
  <div className="flex flex-wrap justify-center gap-6 mb-8">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
      <div className="text-4xl mb-4">
        <i className="fas fa-credit-card text-blue-600" />
      </div>
      <h2 className="text-xl font-bold mb-2">Credit/Debit Card</h2>
      <p className="text-gray-600 mb-4">Visa, MasterCard, American Express</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
      <div className="text-4xl mb-4">
        <i className="fas fa-wallet text-yellow-600" />
      </div>
      <h2 className="text-xl font-bold mb-2">PayPal</h2>
      <p className="text-gray-600 mb-4">Secure payments via PayPal</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
      <div className="text-4xl mb-4">
        <i className="fas fa-university text-gray-600" />
      </div>
      <h2 className="text-xl font-bold mb-2">Bank Transfer</h2>
      <p className="text-gray-600 mb-4">Direct bank transfers available</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
    </div>
  </div>
  <h2 className="text-2xl font-bold mb-4">Add New Payment Method</h2>
  <button className="bg-green-600 text-white px-6 py-3 rounded">
    Add Payment Method
  </button>
</>

    
    </>)
}export default Payment
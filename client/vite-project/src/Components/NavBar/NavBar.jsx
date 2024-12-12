import { useEffect, useState } from "react";
import axios from "axios";

function NavBar() {
    const [buyerProfile, setBuyerProfile] = useState(null);
    const [productList, setProductList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null); // Dynamically track hovered categories

    const buyerSection = async () => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const tokenKey = params.get("login");
        const token = localStorage.getItem(tokenKey) || "";

        try {
            if (id && token) {
                const response = await axios.get(`http://localhost:3000/individualUser/${id}`, {
                    headers: { Authorization: token },
                });
                setBuyerProfile(response.data.data);
            }

            const productResponse = await axios.get("http://localhost:3000/allProducts");
            setProductList(productResponse.data.data);
            setFilteredProducts(productResponse.data.data);
        } catch (err) {
            console.error("Error fetching user or product details:", err);
        }
    };

    const handleMouseEnter = async (categoryId) => {
        try {
            const response = await axios.get("http://localhost:3000/fetchMensglass");
            const lastThreeGlasses = response.data.data.slice(-3);
            setHoveredCategory({ id: categoryId, products: lastThreeGlasses });
        } catch (err) {
            console.error("Error fetching glasses data:", err);
        }
    };

    const handleSearchChange = async (event) => {
        const query = event.target.value.trim();
        setSearchQuery(query);

        if (!query) {
            setFilteredProducts(productList);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/search/${encodeURIComponent(query)}`);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error("Error searching products:", error);
            setFilteredProducts([]);
        }
    };

    useEffect(() => {
        buyerSection();
    }, []);

    return (
        <>
            <nav className="pb-3">
                <div className="bg-gray-800 text-center" onClick={buyerSection}>
                    FREE SHIPPING ON ORDERS OVER $75
                </div>
                <div className="flex items-center container pt-3">
                    <div className="text-center">
                        <span className="logo_sub1">NO</span>
                        <span className="logo_sub1">VA</span>
                    </div>
                    <div className="flex items-center">
                        <div className="flex w-full md:w-auto items-center px-2">
                            <div className="relative group px-3">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => setIsCanvasOpen(true)}
                                    onBlur={() => setIsCanvasOpen(false)}
                                    className="p-2 border bg-white border-gray-300 rounded-md"
                                />
                            </div>
                            {["Eyeglasses", "Screen Glasses", "Kids Glasses", "Contact Lenses", "Sunglasses"].map(
                                (category, index) => (
                                    <div
                                        key={index}
                                        className="relative group px-2"
                                        onMouseEnter={() => handleMouseEnter(category)}
                                        onMouseLeave={() => setHoveredCategory(null)}
                                    >
                                        <span className="cursor-pointer border-blue-500">{category}</span>
                                        {hoveredCategory?.id === category && (
                                            <div
                                                className="absolute z-40 bg-slate-200 p-3 shadow-md w-3/4 border-green-500 rounded-lg"
                                                style={{ top: "100%", left: 0, width: "50vw" }}
                                            >
                                                {hoveredCategory.products.map((glass) => (
                                                    <div key={glass._id} className="flex items-center gap-3 mb-3">
                                                        <img
                                                            src={`http://localhost:3000/${glass.images[2]?.url?.replace(
                                                                /\\/g,
                                                                "/"
                                                            )}`}
                                                            alt={glass.title}
                                                            className="h-25 w-25 rounded-md"
                                                        />
                                                        <div>
                                                            <h4 className="font-semibold">{glass.title}</h4>
                                                            <p className="text-sm text-gray-500">₹{glass.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div
                className="z-40"
                style={{
                    position: "fixed",
                    left: 0,
                    width: "500px",
                    height: "100%",
                    backgroundColor: "white",
                    boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    transform: isCanvasOpen ? "translateX(0)" : "translateX(-100%)",
                    transition: "transform 0.3s ease-in-out",
                }}
            >
                <h2>Search Results</h2>
                <ul>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <li key={product._id} className="mb-3">
                                <div className="cursor-pointer flex items-center gap-3">
                                    <img
                                        src={`http://localhost:3000/${product.images[2]?.url?.replace(/\\/g, "/")}`}
                                        alt={product.title}
                                        className="h-20 w-20 rounded-md"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{product.title}</h4>
                                        <p className="text-sm text-gray-500">₹{product.price}</p>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </ul>
            </div>
        </>
    );
}

export default NavBar;

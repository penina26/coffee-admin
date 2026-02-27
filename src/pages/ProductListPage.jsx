import { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts.js";

export default function ProductListPage() {
    //create states
    const { products, loading, error, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState("");

    // Dynamically filter products based on the search input
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        const lowerSearch = searchTerm.toLowerCase();
        return products.filter((product) =>
            product.name.toLowerCase().includes(lowerSearch) ||
            product.origin.toLowerCase().includes(lowerSearch)
        );
    }, [products, searchTerm]);

    if (loading) return <div className="p-8 text-gray-300">Loading inventory...</div>;
    if (error) return <div className="p-8 text-red-400">Error loading data: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Product Inventory</h2>

                    {/* Dynamic Search Input */}
                    <input
                        type="text"
                        placeholder="Search by name or origin..."
                        className="p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProducts.length === 0 ? (
                        <p className="text-gray-400">No products found matching "{searchTerm}".</p>
                    ) : (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold text-blue-400">{product.name}</h3>
                                        <p className="text-sm text-gray-400 mb-2">{product.location} • {product.origin}</p>
                                    </div>
                                    <span className="bg-green-900 text-green-300 py-1 px-3 rounded-full text-sm font-bold">
                                        ${product.price}
                                    </span>
                                </div>
                                <p className="text-gray-300 mt-4">{product.description}</p>

                                <div className="mt-6 flex gap-3">
                                    {/* Delete function */}
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
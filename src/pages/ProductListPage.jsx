import { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts.js";
import Swal from 'sweetalert2';

export default function ProductListPage() {
    const { products, loading, error, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        const lowerSearch = searchTerm.toLowerCase();
        return products.filter((product) =>
            product.name.toLowerCase().includes(lowerSearch) ||
            product.origin.toLowerCase().includes(lowerSearch)
        );
    }, [products, searchTerm]);

    if (loading) return <div className="container mt-5 text-secondary">Loading inventory...</div>;
    if (error) return <div className="container mt-5 text-danger">Error loading data: {error}</div>;

    // sweet alert 
    const handleDeleteClick = (productId, productName) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${productName}. This cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!',
            background: '#212529',
            color: '#f8f9fa'
        }).then((result) => {
            if (result.isConfirmed) {

                deleteProduct(productId);

                Swal.fire({
                    title: 'Deleted!',
                    text: 'The product has been removed.',
                    icon: 'success',
                    background: '#212529',
                    color: '#f8f9fa'
                });
            }
        });
    };

    return (
        <div className="bg-dark text-light min-vh-100 py-5 font-monospace">
            <div className="container">

                {/* Header and Search Bar */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                    <h2 className="fw-bold mb-0">Product Inventory</h2>

                    <input
                        type="text"
                        placeholder="Search by name or origin..."
                        className="form-control w-auto bg-secondary text-light border-0 shadow-none placeholder-light"
                        style={{ minWidth: "250px" }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Product Grid */}
                <div className="row g-4">
                    {filteredProducts.length === 0 ? (
                        <div className="col-12 text-secondary">
                            <p>No products found matching "{searchTerm}".</p>
                        </div>
                    ) : (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="col-12 col-md-6">
                                {/* Bootstrap Dark Card */}
                                <div className="card h-100 text-bg-dark border-secondary shadow">
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <h4 className="card-title text-info mb-1">{product.name}</h4>
                                                <h6 className="card-subtitle text-muted mb-2">
                                                    {product.location} &bull; {product.origin}
                                                </h6>
                                            </div>
                                            <span className="badge rounded-pill bg-success fs-6">
                                                ${product.price}
                                            </span>
                                        </div>

                                        <p className="card-text flex-grow-1 mt-3">
                                            {product.description}
                                        </p>

                                        <div className="mt-4">
                                            <button
                                                onClick={() => handleDeleteClick(product.id, product.name)}
                                                className="btn btn-outline-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
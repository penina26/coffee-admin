import ProductForm from "../components/ProductForm.jsx";
import { useProducts } from "../hooks/useProducts.js";

export default function AdminPage() {
    const { addProduct } = useProducts();

    return (
        <div className="bg-dark text-light min-vh-100 py-5">
            <div className="container d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <ProductForm onSubmit={addProduct} />
                </div>
            </div>
        </div>
    );
}
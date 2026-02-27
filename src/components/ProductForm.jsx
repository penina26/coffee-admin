import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts.js";
import { toast } from 'react-toastify';

export default function ProductForm({ onSubmit }) {
    const { locations, locationsLoading, locationsError } = useProducts();
    const navigate = useNavigate();

    const defaultLoc = useMemo(
        () => (locations[0]?.name ? locations[0].name : "Addis Ababa"),
        [locations]
    );

    const [form, setForm] = useState({
        name: "",
        description: "",
        origin: "",
        price: "",
        location: "",
    });

    const [errors, setErrors] = useState({});

    function update(key, value) {
        setForm((p) => ({ ...p, [key]: value }));
    }

    function validate() {
        const e = {};
        if (!form.name.trim()) e.name = "Coffee name is required";
        if (!form.origin.trim()) e.origin = "Origin is required";
        const priceNum = Number(form.price);
        if (Number.isNaN(priceNum) || priceNum <= 0) e.price = "Price must be > 0";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        if (!validate()) return;

        try {
            await onSubmit({
                name: form.name.trim(),
                description: form.description.trim(),
                origin: form.origin.trim(),
                price: Number(form.price),
                location: form.location || defaultLoc,
            });

            setForm({ name: "", description: "", origin: "", price: "", location: defaultLoc });
            setErrors({});
            toast.success("Product successfully added!");
            navigate("/products");
        } catch (error) {
            console.error("Submission failed:", error);
            toast.error("Failed to add product. Please try again.");
        }
    }

    return (
        <form className="card text-bg-dark border-secondary shadow p-4" onSubmit={handleSubmit}>
            <h2 className="mb-4 text-info fw-bold">Add New Product</h2>

            <div className="mb-3">
                <label htmlFor="coffeeName" className="form-label text-light">Coffee Name</label>
                <input
                    id="coffeeName"
                    className={`form-control bg-secondary text-light border-0 ${errors.name ? 'is-invalid' : ''}`}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                />
                {errors.name && <div className="invalid-feedback text-danger">{errors.name}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="coffeeDescription" className="form-label text-light">Description</label>
                <textarea
                    id="coffeeDescription"
                    className="form-control bg-secondary text-light border-0"
                    rows="2"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="coffeeOrigin" className="form-label text-light">Origin</label>
                    <input
                        id="coffeeOrigin"
                        className={`form-control bg-secondary text-light border-0 ${errors.origin ? 'is-invalid' : ''}`}
                        value={form.origin}
                        onChange={(e) => update("origin", e.target.value)}
                    />
                    {errors.origin && <div className="invalid-feedback text-danger">{errors.origin}</div>}
                </div>

                <div className="col-md-6 mt-3 mt-md-0">
                    <label htmlFor="coffeePrice" className="form-label text-light">Price ($)</label>
                    <input
                        id="coffeePrice"
                        type="number"
                        className={`form-control bg-secondary text-light border-0 ${errors.price ? 'is-invalid' : ''}`}
                        value={form.price}
                        onChange={(e) => update("price", e.target.value)}
                    />
                    {errors.price && <div className="invalid-feedback text-danger">{errors.price}</div>}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="coffeeLocation" className="form-label text-light">Location</label>
                {locationsLoading && <div className="form-text text-muted">Loading locations...</div>}
                {locationsError && <div className="form-text text-danger">{locationsError}</div>}

                <select
                    id="coffeeLocation"
                    className="form-select bg-secondary text-light border-0"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                >
                    {locations.map((loc) => (
                        <option key={loc.id} value={loc.name}>
                            {loc.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn btn-info fw-bold w-100">Submit Product</button>
        </form>
    );
}
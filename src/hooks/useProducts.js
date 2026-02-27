import { useCallback, useEffect, useRef, useState } from "react";

// The JSON server db url
const API_BASE = "http://localhost:3001";

// helper function to make fetch requests 
async function request(path, options = {}, signal) {
    const res = await fetch(`${API_BASE}${path}`, { ...options, signal });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    if (res.status === 204) return null;
    return res.json();
}

// hooks
export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [locations, setLocations] = useState([]);
    const [locationsLoading, setLocationsLoading] = useState(true);
    const [locationsError, setLocationsError] = useState("");

    const productsAbort = useRef(null);
    const locationsAbort = useRef(null);

    // Read (GET) Products
    const loadProducts = useCallback(async () => {
        productsAbort.current?.abort();
        const controller = new AbortController();
        productsAbort.current = controller;

        try {
            setLoading(true);
            setError("");
            const data = await request("/products", {}, controller.signal);
            setProducts(Array.isArray(data) ? data : []);
        } catch (e) {
            if (e.name !== "AbortError") setError(e.message || "Error");
        } finally {
            if (!controller.signal.aborted) setLoading(false);
        }
    }, []);

    // Read (GET) Locations
    const loadLocations = useCallback(async () => {
        locationsAbort.current?.abort();
        const controller = new AbortController();
        locationsAbort.current = controller;

        try {
            setLocationsLoading(true);
            setLocationsError("");
            const data = await request("/locations", {}, controller.signal);
            setLocations(Array.isArray(data) ? data : []);
        } catch (e) {
            if (e.name !== "AbortError") setLocationsError(e.message || "Error");
        } finally {
            if (!controller.signal.aborted) setLocationsLoading(false);
        }
    }, []);

    // Run the GET requests when the hook first loads
    useEffect(() => {
        loadProducts();
        loadLocations();
        return () => {
            productsAbort.current?.abort();
            locationsAbort.current?.abort();
        };
    }, [loadProducts, loadLocations]);

    // Create (POST) a Product
    async function addProduct(product) {
        setError("");
        const created = await request("/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        //  update the UI
        setProducts((prev) => [created, ...prev]);
        return created;
    }

    // Update (PATCH) a Product
    async function patchProduct(id, patch) {
        setError("");
        const res = await request(`/products/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patch),
        });
        setProducts((prev) => prev.map((p) => (String(p.id) === String(id) ? res : p)));
        return res;
    }

    // Delete a Product
    async function deleteProduct(id) {
        setError("");
        await request(`/products/${id}`, { method: "DELETE" });
        setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    }

    // Return everything so components can use them
    return {
        products,
        loading,
        error,
        locations,
        locationsLoading,
        locationsError,
        addProduct,
        patchProduct,
        deleteProduct,
        reload: loadProducts,
        reloadLocations: loadLocations,
    };
}
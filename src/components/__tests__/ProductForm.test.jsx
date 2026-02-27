import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProductForm from '../ProductForm.jsx';
import { useProducts } from '../../hooks/useProducts.js';

vi.mock('../../hooks/useProducts.js');

describe('ProductForm Component', () => {
    const mockOnSubmit = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useProducts).mockReturnValue({
            locations: [
                { id: '1', name: 'Addis Ababa' },
                { id: '2', name: 'Nairobi' }
            ],
            locationsLoading: false,
            locationsError: ""
        });
    });

    test('renders all form inputs correctly', () => {

        render(
            <MemoryRouter>
                <ProductForm onSubmit={mockOnSubmit} />
            </MemoryRouter>
        );

        expect(screen.getByText(/Add New Product/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Coffee Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    });

    test('prevents submission and shows errors when fields are empty', async () => {

        render(
            <MemoryRouter>
                <ProductForm onSubmit={mockOnSubmit} />
            </MemoryRouter>
        );

        const submitButton = screen.getByRole('button', { name: /Submit Product/i });
        fireEvent.click(submitButton);

        expect(await screen.findByText(/Coffee name is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Origin is required/i)).toBeInTheDocument();

        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('submits successfully when valid data is entered', async () => {

        render(
            <MemoryRouter>
                <ProductForm onSubmit={mockOnSubmit} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Coffee Name/i), { target: { value: 'Test Reserve' } });
        fireEvent.change(screen.getByLabelText(/Origin/i), { target: { value: 'Ethiopia' } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '25' } });

        const submitButton = screen.getByRole('button', { name: /Submit Product/i });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledWith({
            name: 'Test Reserve',
            description: '',
            origin: 'Ethiopia',
            price: 25,
            location: 'Addis Ababa'
        });
    });
});
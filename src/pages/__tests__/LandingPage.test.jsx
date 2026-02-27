import { render, screen } from '@testing-library/react';
import LandingPage from '../LandingPage.jsx';

describe('LandingPage Component', () => {

    test('renders the main dashboard heading', () => {
        // 1. Render the component in a virtual DOM
        render(<LandingPage />);

        // 2. Search for the specific text
        const headingElement = screen.getByText(/Coffee Admin Portal/i);

        // 3. Assert that it exists on the screen
        expect(headingElement).toBeInTheDocument();
    });

    test('renders the descriptive paragraph', () => {
        render(<LandingPage />);
        const paragraphElement = screen.getByText(/Manage your specialty coffee inventory/i);
        expect(paragraphElement).toBeInTheDocument();
    });
});
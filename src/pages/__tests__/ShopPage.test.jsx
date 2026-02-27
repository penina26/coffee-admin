import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

it("renders search box", () => {
    render(<input placeholder="Search" />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
});
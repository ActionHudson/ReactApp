import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import SimpleGrid from "./SimpleGrid";

vi.mock("@mantine/core", () => ({
    SimpleGrid: ({ children, spacing, cols, ...props }) => (
        <div data-spacing={ spacing } data-cols={ cols } { ...props }>
            { children }
        </div>
    )
}));

describe("SimpleGrid", () => {
    it("renders children successfully", () => {
        render(
            <SimpleGrid cols={ 2 }>
                <div data-testid="test-child">Child Content</div>
            </SimpleGrid>
        );

        expect(screen.getByTestId("test-child")).toBeInTheDocument();
    });

    it("applies the correct spacing prop", () => {
        render(
            <SimpleGrid cols={ 2 } spacing="xl" data-testid="mock-grid">
                <div>Content</div>
            </SimpleGrid>
        );

        expect(
            screen.getByTestId("mock-grid")
        ).toHaveAttribute("data-spacing", "xl");
    });

    it("applies the default spacing prop when none is provided", () => {
        render(
            <SimpleGrid cols={ 2 } data-testid="mock-grid">
                <div>Content</div>
                <div>Content</div>
                <div>Content</div>
            </SimpleGrid>
        );

        expect(
            screen.getByTestId("mock-grid")
        ).toHaveAttribute("data-spacing", "1rem");
    });

    it("applies the correct cols prop", () => {
        render(
            <SimpleGrid cols={ 4 } data-testid="mock-grid">
                <div>Content</div>
                <div>Content</div>
                <div>Content</div>
                <div>Content</div>
                <div>Content</div>
            </SimpleGrid>
        );

        expect(
            screen.getByTestId("mock-grid")
        ).toHaveAttribute("data-cols", "4");
    });
});

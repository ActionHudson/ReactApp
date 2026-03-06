import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ScrollArea from "./ScrollArea";

// Mock the Mantine ScrollArea component
vi.mock("@mantine/core", () => ({
    ScrollArea: ({ children, style, scrollbarSize, classNames, ...props }) => (
        <div
            data-testid="mock-mantine-scrollarea"
            style={ style }
            data-scrollbar-size={ scrollbarSize }
            data-classnames={ JSON.stringify(classNames) }
            { ...props }
        >
            { children }
        </div>
    )
}));

describe("ScrollArea", () => {
    it("renders children successfully", () => {
        render(
            <ScrollArea>
                <div data-testid="test-child">Content</div>
            </ScrollArea>
        );

        expect(screen.getByTestId("test-child")).toBeInTheDocument();
    });

    it("applies the hardcoded style prop {{ flex: 1 }}", () => {
        render(<ScrollArea>Content</ScrollArea>);

        expect(
            screen.getByTestId("mock-mantine-scrollarea")
        ).toHaveStyle({ flex: "1" });
    });

    it("applies the hardcoded scrollbarSize={6}", () => {
        render(<ScrollArea>Content</ScrollArea>);

        expect(
            screen.getByTestId("mock-mantine-scrollarea")
        ).toHaveAttribute("data-scrollbar-size", "6");
    });

});

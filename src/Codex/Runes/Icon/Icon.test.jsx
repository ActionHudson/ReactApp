import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Icon from "./Icon";

vi.mock("@tabler/icons-react", () => ({
    IconMoodPuzzled: ({ size, stroke, ...props }) => (
        <svg data-testid="mock-icon-default" data-size={ size } data-stroke={ stroke } { ...props } />
    ),
    IconStar: ({ size, stroke, ...props }) => (
        <svg data-testid="mock-icon-star" data-size={ size } data-stroke={ stroke } { ...props } />
    )
}));

vi.mock("../../ArcaneThreads/Sizes", () => ({
    FontSize: {
        md: "16px",
        xl: "32px"
    }
}));

describe("Icon", () => {
    it("renders the default icon successfully", () => {
        render(<Icon />);

        expect(screen.getByTestId("mock-icon-default")).toBeInTheDocument();
    });

    it("renders the specified icon successfully", () => {
        render(<Icon icon="IconStar" />);

        expect(screen.getByTestId("mock-icon-star")).toBeInTheDocument();
    });

    it("applies the default size and stroke props", () => {
        render(<Icon />);

        const iconElement = screen.getByTestId("mock-icon-default");

        expect(iconElement).toHaveAttribute("data-size", "16px");
        expect(iconElement).toHaveAttribute("data-stroke", "1.5");
    });

    it("applies the correct custom size prop mapped from FontSize tokens", () => {
        render(<Icon size="xl" />);

        expect(
            screen.getByTestId("mock-icon-default")
        ).toHaveAttribute("data-size", "32px");
    });

    it("applies the correct custom stroke prop", () => {
        render(<Icon stroke={ 2.5 } />);

        expect(
            screen.getByTestId("mock-icon-default")
        ).toHaveAttribute("data-stroke", "2.5");
    });
});

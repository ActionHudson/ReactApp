import { Button as MantineButton } from "@mantine/core";
import PropTypes from "prop-types";

import { Colours } from "../../ArcaneThreads/Colours";

import classes from "./Button.module.css";

/**
 * A customized Mantine Button component with predefined variants and states.
 * @example
 * <Button label="Go" variant="filled" onClick={() => console.log("Clicked")} />
 * @param {Object} props
 * @param {string} props.label The text to display inside the button.
 * @param {"gradient"|"outline"|"filled"} [props.variant="gradient"] The visual style of the button.
 * @param {function} [props.onClick=null] The callback function fired when the button is clicked.
 * @param {boolean} [props.isDisabled=false] Whether the button is disabled.
 * @param {boolean} [props.isSubmit=false] Sets the button HTML type to "submit" when true.
 * @param {boolean} [props.isLoading=false] Shows a loading spinner and disables the button when true.
 * @param {boolean} [props.isFullWidth=false] Makes the button take up 100% of its container width when true.
 */

export default function Button ({
    label,
    variant = "gradient",
    onClick = null,
    isDisabled = false,
    isSubmit = false,
    isLoading = false,
    isFullWidth = false,
    ...props
}) {
    return (
        <MantineButton
            variant={ variant }
            fullWidth={ isFullWidth }
            gradient={
                variant === "gradient"
                    ? {
                        from: Colours.accent.primary,
                        to: Colours.accent.primaryDarker, deg: 45
                    }
                    : undefined
            }
            color={ Colours.accent.primary }
            onClick={ onClick }
            disabled={ isDisabled }
            className={ variant === "outline" ? classes.button : undefined }
            type={ isSubmit ? "submit" : "button" }
            loading={ isLoading }
            { ...props }
        >
            { label }
        </MantineButton>
    );
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    variant: PropTypes.oneOf([ "gradient", "outline", "filled" ]),
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    isSubmit: PropTypes.bool,
    isLoading: PropTypes.bool,
    isFullWidth: PropTypes.bool
};

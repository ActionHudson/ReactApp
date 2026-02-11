import { Avatar, Box, Popover, Stack } from "@mantine/core";
import PropTypes from "prop-types";

import Icon from "../../Runes/Icon/Icon";

export default function SimpleGridControl ({
    opened,
    setOpened,
    activeCol,
    setActiveCol,
    gridConfig
}) {
    return (
        <Popover
            opened={ opened }
            onChange={ setOpened }
            position="top"
            zIndex={ 10001 }
            offset={ { mainAxis: 10, crossAxis: 0 } }
            withinPortal={ false }
        >
            <Popover.Target>
                <Box
                    onClick={ () => setOpened(o => !o) }
                    style={
                        { display: 'inline-block',
                            cursor: 'pointer',
                            background: "white",
                            borderRadius: "50%" }
                    }
                >
                    <Avatar size={ 55 }>
                        <Icon
                            icon={ gridConfig[activeCol]?.icon }
                            size="xxl"
                            color="#DF6D9C"
                        />
                    </Avatar>
                </Box>
            </Popover.Target>

            <Popover.Dropdown
                style={ {
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    padding: 0
                } }
            >
                <Stack spacing="xs">
                    { Object.entries(gridConfig).map(([ key, config ]) => (
                        <Box
                            key={ key }
                            onClick={ () => {
                                setOpened(o => !o);
                                setActiveCol(config.cols);
                            } }
                            style={ {
                                display: 'inline-block',
                                cursor: 'pointer',
                                background: 'white',
                                borderRadius: '50%'
                            } }
                        >
                            <Avatar color="#E072A4" radius="xl" size={ 45 }>
                                <Icon icon={ config.icon } size="xl" />
                            </Avatar>
                        </Box>
                    )) }

                </Stack>
            </Popover.Dropdown>
        </Popover>
    );
}

SimpleGridControl.propTypes = {
    opened: PropTypes.bool.isRequired,
    setOpened: PropTypes.func.isRequired,
    activeCol: PropTypes.number.isRequired,
    setActiveCol: PropTypes.func.isRequired,
    gridConfig: PropTypes.objectOf(PropTypes.shape({
        cols: PropTypes.number.isRequired,
        icon: PropTypes.string.isRequired
    })).isRequired
};

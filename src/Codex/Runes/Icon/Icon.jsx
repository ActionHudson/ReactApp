import * as TablerIcons from '@tabler/icons-react';
import PropTypes from 'prop-types';

import { FontSize } from '../../ArcaneThreads/Sizes';

export default function Icon ({
    icon = 'IconEyeQuestion',
    stroke = 1.5,
    size = 'md',
    ...props
}) {
    const IconComponent = TablerIcons[icon];

    return (
        <IconComponent
            size={ FontSize[size] }
            stroke={ stroke }
            { ...props }
        />
    );
}

Icon.propTypes = {
    icon: PropTypes.string,
    size: PropTypes.oneOf(Object.keys(FontSize)),
    stroke: PropTypes.number
};

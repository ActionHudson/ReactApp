// Base examples (original three)
export const ReferencesBase = [
    {
        name: 'Small Glass Bowl',
        type: 'bowl',
        domain: ['kitchen'],
        properties: {
            material: 'glass',
            weight: { value: 180, unit: 'g' },
            size: 'small',
            capacity: { value: 350, unit: 'ml' }
        }
    },
    {
        name: 'Medium Glass Bowl',
        type: 'bowl',
        domain: ['kitchen'],
        properties: {
            material: 'glass',
            weight: { value: 300, unit: 'g' },
            size: 'medium',
            capacity: { value: 750, unit: 'ml' }
        }
    },
    {
        name: 'Large Pyrex Mixing Bowl',
        type: 'bowl',
        domain: ['kitchen'],
        properties: {
            material: 'glass',
            weight: { value: 520, unit: 'g' },
            size: 'large',
            capacity: { value: 1500, unit: 'ml' }
        }
    }
];

const types = [ 'bowl', 'plate', 'cup', 'mug', 'jar', 'pan', 'skillet', 'spoon', 'fork', 'knife', 'container' ];
const materials = [ 'glass', 'ceramic', 'porcelain', 'stainless-steel', 'wood', 'plastic', 'cast-iron', 'pyrex' ];
const sizes = [ 'small', 'medium', 'large', 'x-large' ];

function genWeight (base, i) {
    return Math.round(base + i % 7 * 15 );
}

function genCapacity (type, i) {
    if ([ 'cup', 'mug', 'jar', 'bowl', 'container' ].includes(type)) {

        const base = { cup: 200, mug: 350, jar: 500, bowl: 300, container: 750 }[type] || 250;
        return base + i % 10 * 25;
    }
    if ([ 'pan', 'skillet' ].includes(type)) {
        return 0;
    }
    return 0;
}

const generated = Array.from({ length: 97 }).map((_, idx) => {
    const i = idx + 4;
    const type = types[idx % types.length];
    const material = materials[idx % materials.length];
    const size = sizes[idx % sizes.length];
    const weight = genWeight(120, idx);
    const capacityValue = genCapacity(type, idx);

    const item = {
        name: `${ type.charAt(0).toUpperCase() + type.slice(1) } Example ${ i }`,
        type,
        domain: ['kitchen'],
        properties: {
            material: material,
            weight: { value: weight, unit: 'g' },
            size,
            capacity: { value: capacityValue, unit: 'ml' }
        }
    };

    return item;
});

export const References = [ ...ReferencesBase, ...generated ];

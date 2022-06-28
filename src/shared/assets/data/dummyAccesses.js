export const dummyAccesses = [
    {
        _id: '62655d0cb05abedd9e3c0465',
        title: 'Admin',
    },
    {
        _id: '62655d27b05abedd9e3c0467',
        title: 'Chef',
    },
    {
        _id: '62655d3fb05abedd9e3c0469',
        title: 'Deputy Chef',
    },
    {
        _id: '62655e2bb05abedd9e3c046d',
        title: 'Cook',
    },
    {
        _id: '62655e72b05abedd9e3c046f',
        title: 'Employee',
    },
];

export const dummyAccess = {
    _id: '62655d0cb05abedd9e3c0465',
    title: 'Admin',
    permissions: [
        {
            title: 'Recipes',
            path: '/recipes',
            create: true,
            read: true,
            update: true,
            delete: true,
        },
        {
            title: 'Recipe categories',
            path: '/recipes/categories',
            create: true,
            read: true,
            update: true,
            delete: true,
        },
        {
            title: 'Ingredients',
            path: '/ingredients',
            create: true,
            read: true,
            update: true,
            delete: true,
        },
        {
            title: 'Ingredient categories',
            path: '/ingredients/categories',
            create: true,
            read: true,
            update: true,
            delete: true,
        },
        {
            title: 'Statistics',
            path: '/statistics',
            create: true,
            read: true,
            update: true,
            delete: true,
        },
        {
            title: 'Users',
            path: '/users',
            create: false,
            read: true,
            update: true,
            delete: true,
        },
        {
            title: 'Access',
            path: '/access',
            create: true,
            read: true,
            update: true,
            delete: true,
        },
    ],
};

export const dummyRecipes = [
    {
        _id: '6105722a5a7ac23cd08081c5',
        title: 'test updated1',
        description: 'Hello this is the recipe description',
        dateCreated: '2000-06-09T00:00:00.000Z',
        status: 'approved',
        __v: 0,
    },
    {
        _id: '6105722a5a7ac23cd08081c4',
        title: 'test updated2',
        description: 'Hello this is the recipe description',
        dateCreated: '2000-06-09T00:00:00.000Z',
        status: 'edit1',
        __v: 0,
    },
    {
        _id: '6105722a5a7ac23cd08081c3',
        title: 'test updated3',
        description: 'Hello this is the recipe description',
        dateCreated: '2000-06-09T00:00:00.000Z',
        status: 'edit2',
        __v: 0,
    },
];

export const dummyRecipe = {
    _id: '6105722a5a7ac23cd08081c5',
    title: 'test updated',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed amet laboriosam nemo nobis quos placeat vel, laborum ipsum quia dolores suscipit qui nostrum aut, repudiandae quod cumque unde tempore officiis.',
    ingredients: [
        {
            ingredient: {
                _id: '61056d70ee5bb823a4fa3f93',
                title: 'Meh Updated5',
            },
            unit: 'ml',
            quantity: 950,
        },
        {
            ingredient: {
                _id: '61056d70ee5bb823a4fa3f92',
                title: 'Meh Updated5',
            },
            unit: 'g',
            quantity: 980,
        },
        {
            ingredient: {
                _id: '61056d70ee5bb823a4fa3f92',
                title: 'Meh Updated3',
            },
            unit: '',
            quantity: 5,
        },
    ],
    createdBy: {
        _id: '61056d70ee5bb823a4fa3f92',
        firstName: 'Meh',
        lastName: 'Mehich',
    },
    dateCreated: '2000-06-09T00:00:00.000Z',
    status: 'edit1',
    category: {
        title: 'Breakfast',
    },
    __v: 0,
};

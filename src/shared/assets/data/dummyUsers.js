export const dummyUsers = [
    {
        access: 'User',
        _id: '61094530d5989225d0d77e4b',
        username: 'testing bcrypt',
        firstName: 'Meh',
        lastName: 'Mehich',
        phone: '0888888888',
        email: 'meh@test.com',
        dateOfBirth: '2000-06-09T00:00:00.000Z',
        createdRecipes: 3,
        password:
            '$2b$11$QYZ.NOpvltXxYdKSbdGqxOtLsSC/HfY2ZsWqbCRM6lapxlBjnaUG2',
        position: {
            _id: '61055eee965bdb31e0f5baf9',
            title: 'Testing2',
            __v: 0,
        },
        __v: 0,
    },
    {
        access: 'User',
        _id: '610945d0986dec4074872a58',
        username: 'testing bcrypt 1',
        firstName: 'Meh',
        lastName: 'Mehich',
        phone: '0888888888',
        email: 'meh@test.com',
        dateOfBirth: '2000-06-09T00:00:00.000Z',
        createdRecipes: 3,
        password:
            '$2b$11$8HV0l1RF0hXVyu/Tv2bR9eQ.pngtuAGeiISLmwca0YC2K3UeNvr1y',
        position: {
            _id: '61055eee965bdb31e0f5baf9',
            title: 'Testing2',
            __v: 0,
        },
        __v: 0,
    },
];

export const dummyUser = {
    access: 'User',
    _id: '61094530d5989225d0d77e4b',
    username: 'testing bcrypt',
    firstName: 'Meh',
    lastName: 'Mehich',
    phone: '0888888888',
    email: 'meh@test.com',
    dateOfBirth: '2000-06-09T00:00:00.000Z',
    password: '$2b$11$QYZ.NOpvltXxYdKSbdGqxOtLsSC/HfY2ZsWqbCRM6lapxlBjnaUG2',
    position: {
        _id: '61055eee965bdb31e0f5baf9',
        title: 'Testing2',
        __v: 0,
    },
    description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed amet laboriosam nemo nobis quos placeat vel, laborum ipsum quia dolores suscipit qui nostrum aut, repudiandae quod cumque unde tempore officiis.',
    recipes: [
        {
            _id: '6105722a5a7ac23cd08081c5',
            title: 'test updated1',
            description: 'Hello this is the recipe description',
            status: 'approved',
            __v: 0,
        },
        {
            _id: '6105722a5a7ac23cd08081c4',
            title: 'test updated1',
            description: 'Hello this is the recipe description',
            status: 'edit1',
            __v: 0,
        },
    ],
    createdRecipes: 3,
    __v: 0,
};

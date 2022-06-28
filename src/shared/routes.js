import CalculateIcon from '@mui/icons-material/Calculate';
import KitchenIcon from '@mui/icons-material/Kitchen';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ClassIcon from '@mui/icons-material/Class';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';

const home = {
    path: '/',
    title: 'Home',
    icon: <HomeIcon />,
    subpages: [],
};

const calculator = {
    path: '/calculator',
    title: 'Calculator',
    icon: <CalculateIcon />,
    subpages: [],
};

const recipes = {
    title: 'Recipes',
    path: '/recipes',
    icon: <MenuBookIcon />,
    subpages: [
        { title: 'List', path: '', crud: 'r' },
        { title: 'Pending', path: '/pending', crud: 'd' },
        { title: 'Refused', path: '/refused', crud: 'd' },
        { title: 'Create', path: '/new', crud: 'c' },
    ],
};

const ingredients = {
    title: 'Ingredients',
    path: '/ingredients',
    icon: <KitchenIcon />,
    subpages: [
        { title: 'List', path: '', crud: 'r' },
        { title: 'Create', path: '/new', crud: 'c' },
    ],
};

const recipeCategories = {
    title: 'Recipe Categories',
    path: '/recipes/categories',
    icon: <ClassIcon />,
    subpages: [
        { title: 'List', path: '', crud: 'r' },
        { title: 'Create', path: '/new', crud: 'c' },
    ],
};

const ingredientCategories = {
    title: 'Ingredient Categories',
    path: '/ingredients/categories',
    icon: <CategoryIcon />,
    subpages: [
        { title: 'List', path: '', crud: 'r' },
        { title: 'Create', path: '/new', crud: 'c' },
    ],
};

const statisticsOverview = {
    title: 'Overview',
    path: '/statistics',
    icon: <DashboardIcon />,
    subpages: [],
};

const statisticsRecipe = {
    title: 'Recipe Statistics',
    path: '/statistics/recipes',
    icon: <LeaderboardIcon />,
    subpages: [],
};

const employees = {
    title: 'Employees',
    path: '/users',
    icon: <PeopleIcon />,
    subpages: [],
};

const profile = {
    title: 'Profile',
    path: '/users/profile',
    icon: <PersonIcon />,
    subpages: [],
};

const access = {
    title: 'Access',
    path: '/access',
    icon: <KeyIcon />,
    subpages: [
        { title: 'List', path: '', crud: 'r' },
        { title: 'Create', path: '/new', crud: 'c' },
    ],
};

const settings = {
    title: 'Settings',
    path: '/users/settings',
    icon: <SettingsIcon />,
    subpages: [],
};

const routes = [
    home,
    calculator,
    recipes,
    ingredients,
    recipeCategories,
    ingredientCategories,
    statisticsOverview,
    statisticsRecipe,
    employees,
    profile,
    access,
    settings,
];

export default routes;

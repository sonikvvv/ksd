import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';

import Layout from './shared/layout/Layout';

import Error404 from './pages/Errors/Error404';
import Error401 from './pages/Errors/Error401';
import Error500 from './pages/Errors/Error500';

import Pages from './shared/load/Pages';
import Page from './shared/load/Page';
import AuthLoad from './shared/load/AuthLoad';

import RequireAuth from './shared/components/route/RequireAuth';
import PersistLogin from './shared/components/route/PersistLogin';

const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));
const Calculator = lazy(() => import('./pages/Calculator/Calculator'));
const User = lazy(() => import('./pages/User/User'));
const Ingredients = lazy(() => import('./pages/Ingredients/Ingredients'));
const NewOrEditIngredient = lazy(() =>
    import('./pages/Ingredients/NewOrEditIngredient')
);
const Categories = lazy(() => import('./pages/Categories/Categories'));
const NewOrEditCategory = lazy(() =>
    import('./pages/Categories/NewOrEditCategory')
);
const Recipes = lazy(() => import('./pages/Recipes/Recipes'));
const NewOrEditRecipe = lazy(() => import('./pages/Recipes/NewOrEditRecipe'));
const Recipe = lazy(() => import('./pages/Recipes/Recipe'));
const Users = lazy(() => import('./pages/User/Users'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Statistics = lazy(() => import('./pages/Statistics/Statistics'));
const RecipesStatistics = lazy(() =>
    import('./pages/Statistics/RecipesStatistics')
);
const RecipeReview = lazy(() => import('./pages/Recipes/RecipeReview'));
const Accesses = lazy(() => import('./pages/Accesses/Accesses'));
const Access = lazy(() => import('./pages/Accesses/Access'));
const NewOrEditAccess = lazy(() => import('./pages/Accesses/NewOrEditAccess'));
const UserAccess = lazy(() => import('./pages/User/UserAccess'));
const EditStatistics = lazy(() => import('./pages/Statistics/EditStatistics'));

function App() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route index element={<Home />} />
                <Route path="/" element={<Layout />}>
                    <Route element={<RequireAuth />}>
                        <Route
                            path="calculator"
                            element={
                                <Suspense fallback={<Pages subheader />}>
                                    <Calculator />
                                </Suspense>
                            }
                        />

                        <Route path="users">
                            <Route
                                index
                                element={
                                    <Suspense fallback={<Pages card />}>
                                        <Users />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="settings"
                                element={
                                    <Suspense
                                        fallback={<Pages subheader list />}
                                    >
                                        <Settings />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="profile"
                                element={
                                    <Suspense fallback={<Page />}>
                                        <User />
                                    </Suspense>
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <Suspense fallback={<Page />}>
                                        <User />
                                    </Suspense>
                                }
                            />
                            <Route
                                path=":id/access/edit"
                                element={
                                    <Suspense
                                        fallback={<Pages subheader list />}
                                    >
                                        <UserAccess />
                                    </Suspense>
                                }
                            />
                        </Route>

                        <Route path="ingredients">
                            <Route
                                index
                                element={
                                    <Suspense fallback={<Pages list />}>
                                        <Ingredients />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <Suspense fallback={<Pages list />}>
                                        <NewOrEditIngredient />
                                    </Suspense>
                                }
                            />
                            <Route
                                path=":id/edit"
                                element={
                                    <Suspense fallback={<Pages list />}>
                                        <NewOrEditIngredient />
                                    </Suspense>
                                }
                            />

                            <Route path="categories">
                                <Route
                                    index
                                    element={
                                        <Suspense fallback={<Pages list />}>
                                            <Categories />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="new"
                                    element={
                                        <Suspense fallback={<Pages list />}>
                                            <NewOrEditCategory />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path=":id/edit"
                                    element={
                                        <Suspense fallback={<Pages list />}>
                                            <NewOrEditCategory />
                                        </Suspense>
                                    }
                                />
                            </Route>
                        </Route>

                        <Route path="recipes">
                            <Route
                                index
                                element={
                                    <Suspense fallback={<Pages card />}>
                                        <Recipes />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="pending"
                                element={
                                    <Suspense fallback={<Pages card />}>
                                        <Recipes />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="refused"
                                element={
                                    <Suspense fallback={<Pages card />}>
                                        <Recipes />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <Suspense fallback={<Page subheader />}>
                                        <NewOrEditRecipe />
                                    </Suspense>
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <Suspense fallback={<Page />}>
                                        <Recipe />
                                    </Suspense>
                                }
                            />
                            <Route
                                path=":id/edit"
                                element={
                                    <Suspense fallback={<Page subheader />}>
                                        <NewOrEditRecipe />
                                    </Suspense>
                                }
                            />
                            <Route
                                path=":id/review"
                                element={
                                    <Suspense fallback={<Page subheader />}>
                                        <RecipeReview />
                                    </Suspense>
                                }
                            />

                            <Route path="categories">
                                <Route
                                    index
                                    element={
                                        <Suspense fallback={<Pages list />}>
                                            <Categories />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="new"
                                    element={
                                        <Suspense fallback={<Pages list />}>
                                            <NewOrEditCategory />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path=":id/edit"
                                    element={
                                        <Suspense fallback={<Pages list />}>
                                            <NewOrEditCategory />
                                        </Suspense>
                                    }
                                />
                            </Route>
                        </Route>

                        <Route path="statistics">
                            <Route
                                index
                                element={
                                    <Suspense fallback={<Pages card />}>
                                        <Statistics />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="recipes"
                                element={
                                    <Suspense fallback={<Pages list />}>
                                        <RecipesStatistics />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="edit"
                                element={
                                    <Suspense fallback={<Page subheader />}>
                                        <EditStatistics />
                                    </Suspense>
                                }
                            />
                        </Route>

                        <Route path="access">
                            <Route
                                index
                                element={
                                    <Suspense fallback={<Pages list />}>
                                        <Accesses />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <Suspense
                                        fallback={<Pages subheader list />}
                                    >
                                        <NewOrEditAccess />
                                    </Suspense>
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <Suspense fallback={<Page list />}>
                                        <Access />
                                    </Suspense>
                                }
                            />
                            <Route
                                path=":id/edit"
                                element={
                                    <Suspense
                                        fallback={<Pages subheader list />}
                                    >
                                        <NewOrEditAccess />
                                    </Suspense>
                                }
                            />
                        </Route>
                    </Route>
                </Route>
            </Route>

            <Route path="login" element={<Login />} />
            <Route
                path="register"
                element={
                    <Suspense fallback={<AuthLoad />}>
                        <Register />
                    </Suspense>
                }
            />
            <Route
                path="forgot-password"
                element={
                    <Suspense fallback={<AuthLoad />}>
                        <ForgotPassword />
                    </Suspense>
                }
            />
            <Route
                path="reset-password/:userId/:token"
                element={
                    <Suspense fallback={<AuthLoad />}>
                        <ResetPassword />
                    </Suspense>
                }
            />

            <Route path="500" element={<Error500 />} />
            <Route path="401" element={<Error401 />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default App;

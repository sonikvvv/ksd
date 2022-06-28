const searchedRoute = (path) => {
    const splittedPath = path.split('/');
    splittedPath.shift();
    let route = `/${splittedPath[0]}`;

    if (splittedPath.length > 1 && splittedPath[2] === 'access') {
        route = '/access';
    }

    if (splittedPath.length > 1 && splittedPath[1] === 'categories') {
        route = route + `/${splittedPath[1]}`;
    }

    return route;
};

export default searchedRoute;

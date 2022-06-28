const AllowedActions = (pathname) => {
    const newRoute = pathname.includes('new');
    const editRoute = pathname.includes('edit');
    const pendingRoute = pathname.includes('pending');
    const refusedRoute = pathname.includes('refused');
    const reviewRoute = pathname.includes('review');
    const settingsRoute = pathname.includes('settings');
    const statisticsRoute = pathname.includes('statistics');

    let crud = [];

    if (newRoute || statisticsRoute) crud.push('c');

    crud.push('r');

    if (editRoute || settingsRoute) crud.push('u');
    if (pendingRoute || refusedRoute || reviewRoute) crud.push('d');

    return crud;
};

export default AllowedActions;

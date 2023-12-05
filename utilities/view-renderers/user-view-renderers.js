const userViewsPath = 'user';

module.exports.homePageRenderer = ({response, title, products, categories, isAuthenticated = false}) => {
    const view = `${userViewsPath}/index`;
    const params = {
        title,
        products,
        categories,
        isAuthenticated,
    };
    response.render(view, params);
}


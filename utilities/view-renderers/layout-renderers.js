// todo: butun view'lar icin bu renderer olayini hazirla
const layoutsViewsPath = 'layouts';

module.exports.navigationLayoutRenderer = ({response, title}) => {
    const view = `${layoutsViewsPath}/navigation-layout`;
    const params = {
        title,
    };
    response.render(view, params);
}
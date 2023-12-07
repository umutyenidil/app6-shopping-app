// todo: butun view'lar icin bu renderer olayini hazirla
const authViewsPath = 'auth';

module.exports.loginPageRenderer = ({response, title, message}) => {
    const view = `${authViewsPath}/login`;
    const params = {
        title,
        message,
    };
    response.render(view, params);
}

module.exports.registerPageRenderer = ({response, title}) => {
    const view = `${authViewsPath}/register`;
    const params = {
        title,
    };
    response.render(view, params);
}

module.exports.resetPasswordPageRenderer = ({response, title}) => {
    const view = `${authViewsPath}/reset-password`;
    const params = {
        title,
    };
    response.render(view, params);
}
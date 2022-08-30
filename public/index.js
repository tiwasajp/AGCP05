
location.queryString = {};

location.search.substr(1).split('&').forEach(queryParamWithValue => {
    if (queryParamWithValue === '') return;
    var queryParam = queryParamWithValue.split('=');

    $('#' + queryParam[0]).val(queryParam[1]);
    location.queryString[queryParam[0]] = queryParam[1];
});

function updateQueryString() {
    if (location.queryString) {
        const keyValueArray = Object.entries(location.queryString).map(([key, value]) => {
            return key + '=' + value;
        });

        const newQueryString = keyValueArray.reduce((total, currentValue) => {
            const splitAmpersand = total === '' ? '' : '&';
            return total + splitAmpersand + currentValue;
        }, '')

        const newUrlOriginPath = location.origin + location.pathname;
        const queryStringSlash = !newUrlOriginPath.includes('/') ? '/' : '';
        const newUrl = newUrlOriginPath + queryStringSlash + '?' + newQueryString;
        history.pushState({}, 'Rewrite URL with updated query params', newUrl);
    }
}

(function (window, $) {
    'use strict';

    /**
     * Initialize login Controller
     *
     * @type {*|LoginController}
     */
    var loginController = new window.LoginController();

})(window, jQuery);

$('input').change(function() {
    const inputId = $(this).attr('id');
    const inputValue = $(this).val();

    if (inputId!=='callPassword') {
        location.queryString[inputId] = inputValue;
        updateQueryString();
    }
})

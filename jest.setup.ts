require('jest-preset-angular/setup-jest');

(<any>global).ENVIRONMENT = {
    ENVIRONMENT: 'dev',
    AUTH0_NAME: '',
    AUTH0_DOMAIN: '',
    AUTH0_CLIENTID: '',
    CDN_URL: '',
    DOMAIN: 'ziflow.localhost',
    RECAPTCHA: '',
    GEOIP_URL: '',
    WEBAPP_SENTRY_URL: '',
    PV1_SENTRY_URL: '',
    PV2_SENTRY_URL: '',
    INTAKE_FORMS_SENTRY_URL: '',
    CEP_SCOPE: '',
};

(<any>global).GENERATED_VERSION = '';
(<any>global).GENERATED_BUILD = '';
(<any>global).GENERATED_DISTRIBUTION = '';
(<any>global).GENERATED_RELEASE = '';
(<any>global).IS_DEV_ENV = false;
(<any>global).IS_FROM_CDN = false;

Object.defineProperty(window, 'DragEvent', {
    value: class DragEvent {
        preventDefault() {}
        stopPropagation() {}
    },
});

var localStorageMock = (function () {
    var store = {};

    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key) {
            delete store[key];
        },
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

Object.defineProperty(window, 'location', {
    value: {
        hostname: 'location',
        assign: jest.fn(),
    },
});

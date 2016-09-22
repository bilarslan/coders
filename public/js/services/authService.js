var authService = angular.module('authService', []);

authService.factory('auth', ['$http', '$q', 'authToken', function($http, $q, authToken) {
    var authFactory = {};

    authFactory.signIn = function(username, password) {
        return $http.post('/auth/signin', {
            username: username,
            password: password
        }).success(function(response) {
            authToken.setToken(response.token);
            return response;
        }).error(function(error) {
            console.log(error);
        });
    }

    authFactory.signOut = function() {
        authToken.setToken();
    }

    authFactory.isLoggedIn = function() {
        if (authToken.getToken()) {
            return true;
        } else {
            return false;
        }
    }

    return authFactory;
}]);

authService.factory('authToken', ['$window', function($window) {
    var authTokenFactory = {};

    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    }
    authTokenFactory.setToken = function(token) {
        if (token) {
            $window.localStorage.setItem('token', token);
        } else {
            $window.localStorage.removeItem('token');
        }
    }
    return authTokenFactory;
}]);

authService.factory('authInterceptor', ['$location', '$q', 'authToken', function($location, $q, authToken) {
    var interceptorFactory = {};

    interceptorFactory.request = function(config) {
        var token = authToken.getToken();
        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config
    }

    interceptorFactory.responseError = function(response) {
        if (response.status == 403) {
            $location.path('/login');
        }
        return $q.reject(response);
    }
    return interceptorFactory;
}]);

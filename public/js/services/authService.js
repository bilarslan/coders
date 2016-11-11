var authService = angular.module('authService', []);

authService.factory('auth', ['$http', '$q', '$location', 'authToken', function($http, $q, $location, authToken) {
    var authFactory = {};

    authFactory.signUp = function(name, username, email, password) {
        return $http.post('/auth/signup', {
            name: name,
            username: username,
            email: email,
            password: password
        }).success(function(response) {
            authToken.setToken(response.token);
            return response;
        }).error(function(err) {
            console.log(err);
        });
    }


    authFactory.signIn = function(username, password) {
        return $http.post('/auth/signin', {
            username: username,
            password: password
        }).success(function(response) {
            authToken.setToken(response.token);
            return response;
        }).error(function(err) {
            console.log(err);
        });
    }

    authFactory.signOut = function() {
        authToken.setToken();
        $location.path('/');

    }

    authFactory.isLoggedIn = function() {
        if (authToken.getToken()) {
            return true;
        } else {
            return false;
        }
    }

    authFactory.getUser = function() {
        if (authToken.getToken()) {
            return $http.get('/auth/me');
        } else {
            return $q.reject({
                error: 'User has no token'
            });
        }
    }

    authFactory.userName = function(username) {
        if (username) {
            this.username = username;
        } else {
            return this.username;
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
        return config;
    }

    interceptorFactory.responseError = function(response) {
        if (response.status == 403) {
            if (authToken.getToken()) {
                //token is expired
                authToken.setToken();
            }
            $location.path('/login');
        }
        return $q.reject(response);
    }
    return interceptorFactory;
}]);

authService.factory('authUserProfile', ['$http', function($http) {
    var userProfileFactory = {};
    userProfileFactory.getUser = function(username) {
        return $http.get('/auth/profile/' + username);
    }

    userProfileFactory.updateProfilePic = function(fd){
          return $http.post('/auth/updatepic', fd, {
              transformRequest: angular.identity,
              headers: {
                  'Content-Type': undefined
              }
          });
    }

    return userProfileFactory;
}]);

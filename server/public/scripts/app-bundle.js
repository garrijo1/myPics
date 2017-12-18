define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.App = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var App = exports.App = function () {
		function App() {
			_classCallCheck(this, App);
		}

		App.prototype.configureRouter = function configureRouter(config, router) {
			this.router = router;
			config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
			config.map([{
				route: ['', 'home’'],
				moduleId: './modules/home',
				name: 'Home'
			}, {
				route: 'list',
				moduleId: './modules/list',
				name: 'List',
				auth: true
			}]);
		};

		return App;
	}();
});
define('auth-config',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/home'
  };

  exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'regenerator-runtime', './auth-config'], function (exports, _environment, _regeneratorRuntime, _authConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;
  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.users = users;
      this.message = 'Home';
      this.showLogin = true;
    }

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('list');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";
      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.users.save(this.user);

              case 2:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    return Home;
  }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/mypics'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _mypics) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.List = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService, _mypics.mypics), _dec(_class = function () {
    function List(router, auth, mypics) {
      _classCallCheck(this, List);

      this.router = router;
      this.auth = auth;
      this.mypics = mypics;
      this.user = JSON.parse(sessionStorage.getItem('user'));

      this.title = "Joe Has Pics!";
      this.showCompleted = false;
    }

    List.prototype.optionSelected = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(this.showWhat);
                if (this.showWhat == "1") {
                  this.mypics.getUsergalleries(this.user._id);
                  this.showGalleryList = true;
                } else if (this.showWhat == '2') {
                  this.mypics.getUsergalleries(this.user._id);
                  this.mypicsObj = {
                    mypics: "",
                    description: "",
                    picDate: new Date(),
                    userId: this.user._id,
                    galleriesId: ""
                  };
                } else if (this.showWhat == '3') {
                  this.galleriesObj = {
                    galleries: "",
                    description: "",
                    userId: this.user._id
                  };
                }

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function optionSelected() {
        return _ref.apply(this, arguments);
      }

      return optionSelected;
    }();

    List.prototype.createmypics = function createmypics() {
      this.mypicsObj = {
        mypics: "",
        description: "",
        picDate: new Date(),
        userId: this.user._id
      };
    };

    List.prototype.savemypics = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var response, mypicsId;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.mypicsObj) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 3;
                return this.mypics.save(this.mypicsObj);

              case 3:
                response = _context2.sent;

                if (!response.error) {
                  _context2.next = 8;
                  break;
                }

                alert("There was an error creating the mypics");
                _context2.next = 13;
                break;

              case 8:
                mypicsId = response._id;

                if (!(this.filesToUpload && this.filesToUpload.length)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 12;
                return this.mypics.uploadFile(this.filesToUpload, this.user._id, mypicsId);

              case 12:
                this.filesToUpload = [];

              case 13:
                this.showList = true;

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function savemypics() {
        return _ref2.apply(this, arguments);
      }

      return savemypics;
    }();

    List.prototype.creategalleries = function creategalleries() {
      this.galleriesObj = {
        galleries: "",
        description: "",
        userId: this.user._id
      };
    };

    List.prototype.savegalleries = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.galleriesObj) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 3;
                return this.mypics.savegalleries(this.galleriesObj);

              case 3:
                response = _context3.sent;

                if (response.error) {
                  alert("There was an error creating the mypics");
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function savegalleries() {
        return _ref3.apply(this, arguments);
      }

      return savegalleries;
    }();

    List.prototype.showPhotos = function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(gallery) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.mypics.getUsermypics(gallery._id);

              case 2:
                this.showGalleryList = false;

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function showPhotos(_x) {
        return _ref4.apply(this, arguments);
      }

      return showPhotos;
    }();

    List.prototype.editgalleries = function editgalleries(gallery) {
      this.galleriesObj = gallery;
      this.showWhat = '3';
    };

    List.prototype.deletegalleries = function deletegalleries(gallery) {
      this.mypics.deletegalleries(gallery._id);
    };

    List.prototype.editmypics = function editmypics(mypics) {
      this.mypicsObj = mypics;
      this.showWhat = "2";
    };

    List.prototype.deletemypics = function deletemypics(mypics) {
      this.mypics.deletemypics(mypics._id);
    };

    List.prototype.toggleShowCompleted = function toggleShowCompleted() {
      this.showCompleted = !this.showCompleted;
    };

    List.prototype.changeFiles = function changeFiles() {
      this.filesToUpload = new Array();
      this.filesToUpload.push(this.files[0]);
    };

    List.prototype.removeFile = function removeFile(index) {
      this.filesToUpload.splice(index, 1);
    };

    List.prototype.back = function back() {
      this.showList = true;
    };

    List.prototype.logout = function logout() {
      sessionStorage.removeItem('user');
      this.auth.logout();
    };

    return List;
  }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './value-converters/completed', './elements/flatpickr']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DataServices = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
		function DataServices(http) {
			var _this = this;

			_classCallCheck(this, DataServices);

			this.httpClient = http;
			this.BASE_URL = "http://localhost:5000/api/";

			this.httpClient.configure(function (config) {
				config.withBaseUrl(_this.BASE_URL).withDefaults({
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'X-Requested-With': 'Fetch'
					}
				}).withInterceptor({
					request: function request(_request) {
						var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');
						_request.headers.append('Authorization', authHeader);
						console.log('Requesting ${request.method} ${request.url}');
						return _request;
					},
					response: function response(_response) {
						console.log('Received ${response.status} ${response.url}');
						return _response;
					}
				});
			});
		}

		DataServices.prototype.get = function get(url) {
			return this.httpClient.fetch(url).then(function (response) {
				return response.json();
			}).then(function (data) {
				return data;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.post = function post(content, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.put = function put(content, url) {
			return this.httpClient.fetch(url, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.delete = function _delete(url) {
			return this.httpClient.fetch(url, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: files
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		return DataServices;
	}()) || _class);
});
define('resources/data/mypics',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.mypics = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var mypics = exports.mypics = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function mypics(data) {
            _classCallCheck(this, mypics);

            this.data = data;
            this.MYPICS_SERVICE = 'mypics';
            this.GALLERIES_SERVICE = 'galleries';
            this.mypicsArray = [];
            this.galleriesArray = [];
        }

        mypics.prototype.getUsermypics = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.MYPICS_SERVICE + "/galleries/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.mypicsArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUsermypics(_x) {
                return _ref.apply(this, arguments);
            }

            return getUsermypics;
        }();

        mypics.prototype.getUsergalleries = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.get(this.GALLERIES_SERVICE + "/user/" + id);

                            case 2:
                                response = _context2.sent;

                                if (!response.error && !response.message) {
                                    this.galleriesArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getUsergalleries(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getUsergalleries;
        }();

        mypics.prototype.save = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(mypics) {
                var serverResponse, _serverResponse;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (mypics._id) {
                                    _context3.next = 8;
                                    break;
                                }

                                _context3.next = 3;
                                return this.data.post(mypics, this.MYPICS_SERVICE);

                            case 3:
                                serverResponse = _context3.sent;

                                if (!serverResponse.error) {
                                    this.mypicsArray.push(serverResponse);
                                }
                                return _context3.abrupt('return', serverResponse);

                            case 8:
                                _context3.next = 10;
                                return this.data.put(mypics, this.MYPICS_SERVICE + "/" + mypics._id);

                            case 10:
                                _serverResponse = _context3.sent;

                                if (!_serverResponse.error) {}
                                return _context3.abrupt('return', _serverResponse);

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function save(_x3) {
                return _ref3.apply(this, arguments);
            }

            return save;
        }();

        mypics.prototype.savegalleries = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(galleries) {
                var serverResponse, _serverResponse2;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (galleries._id) {
                                    _context4.next = 8;
                                    break;
                                }

                                _context4.next = 3;
                                return this.data.post(galleries, this.GALLERIES_SERVICE);

                            case 3:
                                serverResponse = _context4.sent;

                                if (!serverResponse.error) {
                                    this.galleriesArray.push(serverResponse);
                                }
                                return _context4.abrupt('return', serverResponse);

                            case 8:
                                _context4.next = 10;
                                return this.data.put(galleries, this.GALLERIES_SERVICE + "/" + galleries._id);

                            case 10:
                                _serverResponse2 = _context4.sent;

                                if (!_serverResponse2.error) {}
                                return _context4.abrupt('return', _serverResponse2);

                            case 13:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function savegalleries(_x4) {
                return _ref4.apply(this, arguments);
            }

            return savegalleries;
        }();

        mypics.prototype.deletegalleries = function () {
            var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.data.delete(this.GALLERIES_SERVICE + "/" + id);

                            case 2:
                                response = _context5.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.galleriesArray.length; i++) {
                                        if (this.galleriesArray[i]._id === id) {
                                            this.galleriesArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function deletegalleries(_x5) {
                return _ref5.apply(this, arguments);
            }

            return deletegalleries;
        }();

        mypics.prototype.deletemypics = function () {
            var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.data.delete(this.MYPICS_SERVICE + "/" + id);

                            case 2:
                                response = _context6.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.mypicsArray.length; i++) {
                                        if (this.mypicsArray[i]._id === id) {
                                            this.mypicsArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function deletemypics(_x6) {
                return _ref6.apply(this, arguments);
            }

            return deletemypics;
        }();

        mypics.prototype.uploadFile = function () {
            var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(files, userId, mypicsId) {
                var formData, response;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });

                                _context7.next = 4;
                                return this.data.uploadFiles(formData, this.MYPICS_SERVICE + "/upload/" + userId + "/" + mypicsId);

                            case 4:
                                response = _context7.sent;
                                return _context7.abrupt('return', response);

                            case 6:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function uploadFile(_x7, _x8, _x9) {
                return _ref7.apply(this, arguments);
            }

            return uploadFile;
        }();

        return mypics;
    }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;
            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                altInput: true,
                altFormat: "F j, Y",
                wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }
            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }
            var newDate = this.value ? this.value : undefined;
            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var CompletedValueConverter = exports.CompletedValueConverter = function () {
        function CompletedValueConverter() {
            _classCallCheck(this, CompletedValueConverter);
        }

        CompletedValueConverter.prototype.toView = function toView(array, value) {
            if (!value) {
                return array.filter(function (item) {
                    return !item.completed;
                });
            } else {
                return array;
            }
        };

        return CompletedValueConverter;
    }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DateFormatValueConverter = undefined;

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
		function DateFormatValueConverter() {
			_classCallCheck(this, DateFormatValueConverter);
		}

		DateFormatValueConverter.prototype.toView = function toView(value) {
			if (value === undefined || value === null) {
				return;
			}

			return (0, _moment2.default)(value).format('MMM Do YYYY');
		};

		return DateFormatValueConverter;
	}();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template>    <compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose>    <compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose>    </template>"; });
define('text!resources/css/style.css', ['module'], function(module) { module.exports = ".rightMargin {\r\n    margin-right: 10px;\r\n    }\r\n    "; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<html><template><head><style>#inner{margin-left:50px;margin-right:50px}</style></head><h1 align=\"center\" style=\"color:#00f\"><b>JOE'S PIC GALLERIES</b></h1><div id=\"inner\"><h1>${message}</h1><select value.bind=\"showWhat\" change.trigger=\"optionSelected()\" id=\"myList\"><option>-- What would you like to do? --</option><option value.bind=\"1\">View Galleries</option><option value.bind=\"2\">Add Pic</option><option value.bind=\"3\">Add Gallery</option></select><compose show.bind=\"showWhat === '1'\" view=\"./components/galleriesList.html\"></compose><compose show.bind=\"showWhat === '2'\" view=\"./components/mypicsForm.html\"></compose><compose show.bind=\"showWhat === '3'\" view=\"./components/galleriesForm.html\"></compose></div></template></html>"; });
define('text!modules/navbar.html', ['module'], function(module) { module.exports = ""; });
define('text!modules/components/galleriesForm.html', ['module'], function(module) { module.exports = "<template><div class=\"form-group topMargin\"><label for=\"mypicsInput\"><br>Gallery Title</label><input value.bind=\"galleriesObj.galleries\" type=\"text\" class=\"form-control\" id=\"galleriesInput\" aria-describedby=\"galleriesHelp\" placeholder=\"Enter Gallery Name\"> <small id=\"galleriessHelp\" class=\"form-text text-muted\">Give your gallery a name above</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"galleriesObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">Describe what's in your gallery above</small></div><button click.trigger=\"savegalleries()\" class=\"btn btn-primary topMargin\">Save</button></template>"; });
define('text!modules/components/galleriesList.html', ['module'], function(module) { module.exports = "<template><div show.bind=\"showGalleryList\"><div class=\"card topMargin\"><div class=\"card-body\"><div show.bind=\"mypics.galleriesArray.length\"><table class=\"table\"><thead><tr><th>Gallery Title</th><th>Gallery Description</th></tr></thead><tbody><tr click.trigger=\"showPhotos(gallery)\" repeat.for=\"gallery of mypics.galleriesArray\"><td>${gallery.galleries}</td><td>${gallery.description}</td><td><i click.trigger=\"editgalleries(gallery)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deletegalleries(gallery)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!mypics.galleriesArray.length\"><h1>Apparently, you do not have any galleries!</h1><h2>If you would like to add a gallery, select \"Add Gallery\" in the drop-down box.</h2></div></div></div></div><div show.bind=\"!showGalleryList\"><compose view=\"./mypicsList.html\"></compose></div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><!DOCTYPE html><html lang=\"en\"><head><title>Bootstrap 4 Example</title><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css\"><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></script><script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.6/umd/popper.min.js\"></script><script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js\"></script><style>div.pt1{padding:25px;text-align:center;box-sizing:border-box;background-color:green;font-style:italic}div.pt2{padding:15px;text-align:center;font-size:14px!important}.button{background-color:#0f6b12;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:block;width:20%;margin:0 auto;font-size:16px;cursor:pointer}a:link{color:#000;background-color:transparent;text-decoration:none;display:block;width:40%;margin:0 auto;text-align:center}a:visited{color:pink;background-color:transparent;text-decoration:none;display:block;width:40%;margin:0 auto;text-align:center}a:hover{color:red;background-color:transparent;text-decoration:underline;display:block;width:40%;margin:0 auto;text-align:center}a:active{color:#ff0;background-color:transparent;text-decoration:underline;display:block;width:40%;margin:0 auto;text-align:center}#grad1{height:2000px;background:green;background:-webkit-linear-gradient(left top,green,#ff0);background:-o-linear-gradient(bottom right,green,#ff0);background:-moz-linear-gradient(bottom right,green,#ff0);background:linear-gradient(to bottom right,green,#ff0);background-size:cover}input{width:35%!important;display:block!important;width:40%!important;margin:0 auto!important}</style></head><body><div id=\"grad1\"><h1 style=\"text-align:center;background-color:#ff0;font-family:tahoma;font-weight:700;font-size:26px\">JOSEPH GARRISON'S MY PICS LIST</h1><div class=\"pt1\"><h2 style=\"text-align:center;color:#fff\">Login Page</h2></div><div class=\"container\">    <div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div>    <div class=\"pt2\"><label for=\"email\">Email</label>     <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"email@service.com\">    </div><div class=\"pt2\"><label for=\"password\">Password</label>     <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\">    </div><button class=\"button\" click.trigger=\"login()\">Login</button>  <h2>     <a href=\"registerLink\" click.trigger=\"showRegister()\">First-time user? Click here to register</a></h2></div></div></body></html></template>"; });
define('text!modules/components/mypicsForm.html', ['module'], function(module) { module.exports = "<template><head><style>body{background-color:#b0e0e6}.special{padding-top:10px;padding-bottom:30px}</style></head><div class=\"form-group topMargin\"><label for=\"mypicsInput\"><br>Pic Label</label><input value.bind=\"mypicsObj.mypics\" type=\"text\" class=\"form-control\" id=\"mypicsInput\" aria-describedby=\"mypicsHelp\" placeholder=\"Enter myPics\"> <small id=\"mypicsHelp\" class=\"form-text text-muted\">Give your pic a label</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"mypicsObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small></div><div class=\"special\"><p><b>Select the gallery you want to put this pic in:</b></p><select value.bind=\"mypicsObj.galleriesId\"><option>-- Select and Option --</option><option value.bind=\"gallery._id\" repeat.for=\"gallery of mypics.galleriesArray\">${gallery.galleries}</option></select></div><div class=\"row\"><div class=\"col\"><label class=\"btn btn-secondary\">Browse for files&hellip;<input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload your pic here.</small></div><div class=\"col-8\"><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></div><div class=\"form-group\"><label for=\"dueDateInput\">Pic Date</label><input type=\"date\" class=\"form-control\" value.bind=\"mypicsObj.dateDue\"> <small id=\"dueDateHelp\" class=\"form-text text-muted\">The date the pic was taken</small></div><button click.trigger=\"savemypics()\" class=\"btn btn-primary topMargin\">Save</button></template>"; });
define('text!modules/components/mypicsList.html', ['module'], function(module) { module.exports = "<template>    <div class=\"card topMargin\">        <div class=\"card-body\"><div show.bind=\"mypics.mypicsArray.length\"><table class=\"table\"><thead><tr><th>Pic Description</th><th>Pic Date</th><th>File</th><th>Edit</th></tr></thead><tbody>    <tr class=\"${mypics.priority === 'Critical' ? 'table-secondary' : ' '}\" repeat.for=\"mypics of mypics.mypicsArray | completed:showCompleted\">        <td>${mypics.mypics}</td>        <td>${mypics.dateDue | dateFormat}</td><td><a href=\"http://localhost:5000/uploads/${user._id}/${mypics.file.fileName}\" target=\"_blank\">${mypics.file.originalName}</a></td><td><i click.trigger=\"editmypics(mypics)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deletemypics(mypics)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td>    </tr></tbody></table></div><div show.bind=\"!mypics.mypicsArray.length\"><h2>Apparently, you don't have no pics!</h2></div>        </div>    </div></template>"; });
define('text!modules/components/navbar.html', ['module'], function(module) { module.exports = ""; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\"><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css\"><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></script><script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.6/umd/popper.min.js\"></script><script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js\"></script><style>h1{text-align:center}label{text-align:center}div.pt3{text-align:center;padding:1px 25px!important}.button{background-color:#0f6b12;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:block;width:20%;margin:0 auto;font-size:16px;cursor:pointer}</style></head><body><div class=\"w3-container w3-blue\"><h1>Input Form</h1></div><form class=\"w3-container\"><p>     <input value.bind=\"user.firstName\"></p><div class=\"pt3\"><label>First Name</label><p></p></div><p>     <input value.bind=\"user.lastName\"></p><div class=\"pt3\"><label>Last Name</label><p></p></div><p>     <input value.bind=\"user.email\"></p><div class=\"pt3\"><label>E-mail</label><p></p></div><p>     <input value.bind=\"user.password\"></p><div class=\"pt3\"><label>Password</label><p></p></div>     <button class=\"button\" click.trigger=\"save()\">Save</button></form></body></html></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template>    <require from=\"flatpickr/flatpickr.css\"></require>    <div class=\"input-group aurelia-flatpickr\">        <input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input>     </div></template>"; });
//# sourceMappingURL=app-bundle.js.map
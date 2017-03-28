var app = angular.module('myApp', ['ngRoute']);

app.constant("baseURL", "http://mattlewandowski.com/");

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.service('codes', function($http, baseURL) {
    this.getCodes = function() {
      return $http.get(baseURL + "codes");
    }
});

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "src/templates/home.html",
    controller: "myCtrl"
  })
  .when("/codeList", {
  	templateUrl: "src/templates/codeList.html",
  	controller: "listCtrl"
  })
  .when("/easyAdd", {
  	templateUrl: "src/templates/easyAdd.html",
  	controller: "easyCtrl"
  })
  .otherwise({
    redirectTo: "/"
  });
});

app.controller('myCtrl', function($scope, $http, baseURL, $window, $location) {
  length = words.length;
	amount = 1;
	number = Math.floor((Math.random() * 99) + 1);

	$('.amount').change(function() {
		amount = $(this).val();
		$('.checkbox-inline').hide();
		$('.descriptionContainer').hide();
		$('.save').hide();
		$('.word').html('');
		$('.keep').prop('checked', false);
	});

	$('.random').click(function() {
		random(length, amount);
	});

	random = function(x, y) {
		$('.descriptionContainer').show();
		$('.save').show();
		for (i = 1; i<= y; i++) {
			if (!$('.word' + i + '-check').is(':checked')) {
				index = Math.floor((Math.random() * x) + 1);
				word = words[index];
				$('.word' + i).html(word);
				$('.checkDiv' + i).css('display', 'inline');
			}
		}

		newWord = $('.word1').text() + ' ' + $('.word2').text() + ' ' + $('.word3').text();
		$scope.dprcode.name = 'Code ' + number + ' ' + newWord;
	};

	$scope.dprcode = {
      name: '',
      description: '',
      date: new Date()
    };

    $scope.addCode = function(dprcode) {
      $http.post(baseURL + "codes", dprcode);
      $window.location.href = '#codeList';
    };
});

app.controller('listCtrl', function($scope, codes) {
	codes.getCodes()
    .then(
      function(response) {
        $scope.codes = response.data;
        $scope.showCodes = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );
});

app.controller('easyCtrl', function($scope, $http, baseURL, $window, $location) {

	$scope.easycode = {
 	  id: '',
      name: '',
      description: '',
      date: new moment()
    };

	$scope.addEasyCode = function(easycode) {
		$http.post(baseURL + "codes", easycode);
		$window.location.href = "#codeList";
	};
});

var app = angular.module(
  'customers', 
  [
    'ngRoute',
    'ngResource',
    'ngMessages',
    'templates'
  ]
);

var CustomerSearchController = function($scope) {
	$scope.search = function(searchTerm) {
		$scope.searchedFor = searchTerm;
	}
};

app.config([
         "$routeProvider", 
 function($routeProvider) {
    $routeProvider.when("/", {
      controller: "CustomerSearchController",
      templateUrl: "customer_search.html"
    });

    $routeProvider.when("/:id", {
      controller: "CustomerDetailController",
      templateUrl: "customer_detail.html"
    });
}]);

app.controller("CustomerSearchController", [
		      "$scope","$http","$location",
  function($scope,  $http , $location) {
  	var page = 0;
  	$scope.customers = [];
  	$scope.search = function(searchTerm) {
  		if (searchTerm.length < 3) {
  			return;
  		}

  		$http.get("/customers.json", 
  			      { "params": { "keywords": searchTerm, "page": page } }
  	 	).then(function(response) {
  	 		$scope.customers = response.data;
        //alert("There was a problem: 500");
  	 	}, function(response) {
  	 		alert("There was a problem: " + response.status);
      });
  	}

  	$scope.previousPage = function() {
  		if (page > 0) {
  			page = page - 1;
  			$scope.search($scope.keywords);
  		}
  	}

  	$scope.nextPage = function() {
  		page = page + 1;
  		$scope.search($scope.keywords);
  	}

    $scope.viewDetails = function(customer) {
      $location.path("/" + customer.id);
    }
  }
]);

app.controller("CustomerDetailController", [
          "$scope","$http","$routeParams", "$resource",
  function($scope,  $http,  $routeParams,   $resource) {
    $scope.customerId = $routeParams.id;
    var Customer = $resource('/customers/:customerId.json')

    $scope.customer = Customer.get({ "customerId": $scope.customerId })
    // $scope.customer = {};

    // $http.get("/customers/" + customerId + ".json").
    //   then(function(response) {
    //     $scope.customer = response.data;
    //   }, function(response) {
    //     alert("There was a problem: " + response.status);
    //   });

    $scope.save = function() {
      //alert($scope.form.$valid);
      if ($scope.form.email.$valid) {
        alert("Email is valid");
      } else if ($scope.form.email.$error.required) {
        alert("Email is required");
      } else if ($scope.form.email.$error.email) {
        alert("Email must look like an email");
      }

      if ($scope.form.$valid) {
        alert("Save!");
      }
    };
  }
]);


app.controller("CustomerCreditCardController", [
          "$scope", "$resource", 
  function($scope,   $resource) {
    var CreditCardInfo = $resource('/fake_billing.json');
    $scope.creditCard = CreditCardInfo.get({ "cardholder_id": 42 });
  
    $scope.setCardHolderId = function(cardholderId) {
      $scope.creditCard = CreditCardInfo.get(
        { "cardholder_id": cardholderId }
      )
    };
  }
]);
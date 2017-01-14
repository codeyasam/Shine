describe("CustomerCreditCardController", function() {
	describe("Initialization", function() {
		var scope = null,
			cardHolderId = 42,
			controller = null,
			httpBackend = null,
			cardInfo = {
				lastFour: '1234',
				cardType: 'visa',
				expirationMonth: 3,
				expirationYear: 2018,
				detailsLink: 'http://billing.example.com/foo'
			};

		beforeEach(module("customers"));

		beforeEach(inject(function ($controller,
								    $rootScope,
								    $httpBackend) {
			scope = $rootScope.$new();
			httpBackend = $httpBackend;

			httpBackend.when('GET', '/fake_billing.json?cardholder_id=' + cardHolderId).respond(cardInfo);

			controller = $controller("CustomerCreditCardController", {
				$scope: scope
			});
		}));
		//tests will go here

		it("doest not hit the backend initially", function() {
			expect(scope.creditCard).not.toBeDefined();
		});

		it ("when setCardHolderId is called, hits backend", function() {
			scope.setCardHolderId(cardHolderId);
			expect(scope.creditCard).toBeDefined();
			expect(scope.creditCard.lastFour).not.toBeDefined();
			httpBackend.flush();
			expect(scope.creditCard).toEqualData(cardInfo);
		});
	});
});
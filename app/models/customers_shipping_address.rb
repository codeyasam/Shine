class CustomersShippingAddress < ApplicationRecord
	belongs_to :customer
	belongs_to :address
end
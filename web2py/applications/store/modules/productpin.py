# -*- coding: utf-8 -*-

#
# Api for 
#

from gluon import current
print "check check"
"""
  Alice12 Product Pins API
  @todo: filtering the product data
"""
class ProductPin(object):

    def __init__(self):
        self.db = current.db
        self.session = current.session
        self.request = current.request
        self.response = current.response
        self.cache = current.cache
        self.define_table()
        self.set_validators()

    def pull_products(self, order_by='-id', offset=0):
        
        order = ''
        if order_by == 'id':
            order='self.db.product.'+'sortable'
        else:
            order='self.db.product.'+'-sortable'

        products = self.db(self.db.product & self.db.product.sortable > offset).select(orderby=order) 

        return products

    def apply_brand_filter(self, brand_filter):
        return ""

    def apply_price_filter(self, price_low, price_high):
        return ""

    def apply_type_filter(self, type_filter):
        return ""



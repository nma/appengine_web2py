
from pprint import pprint

def products():
    ''' 
    response = ""
   
    response += request.url + ", "
    response += request.controller + ", "

    for item in request.args:
        if item:
            response += item + ", "

    response += str(len(request.vars)) + ","
    for key, item in request.vars.iteritems():
        if item and key:
            response += "(" +key +"," +item +"), "
    
    '''
    offset_param = request.vars.offset
    if offset_param:
        offset = int(offset_param)
        
        product_rows = db(db.product).select(limitby=(offset, offset+20),orderby=~db.product.sortable)
        #print "HEYYYYYYY CHECK THIS TYPE" + str(type(products))
        #filtered_rows = [field for field in [row for row in product_rows] if field != 'image']
        filtered_models = []
        for field in [row for row in product_rows]:
            item = field.as_dict()

            del item['image']
            del item['image_blob']
            del item['created_on']
            del item['created_by']
            del item['modified_by']
            del item['modified_on']

            filtered_models.append(item)

        import gluon.contrib.simplejson
        return gluon.contrib.simplejson.dumps(filtered_models)
    
    import gluon.contrib.simplejson
    return gluon.contrib.simplejson.dumps([])

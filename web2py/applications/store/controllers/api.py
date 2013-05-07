
from pprint import pprint

def products():
    ''' 
    #DEBUG CODE -- and sample request calls
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
    data_dict={}
    offset_param = request.vars.offset
    if offset_param:
        offset = int(offset_param)
        
        product_rows = db(db.product).select(limitby=(offset, offset+20),orderby=~db.product.sortable)
        #print "HEYYYYYYY CHECK THIS TYPE" + str(type(products))
        #filtered_rows = [field for field in [row for row in product_rows] if field != 'image']
        filtered_models = []
        for field in [row for row in product_rows]:
            item = field.as_dict()
            
            # filtering unwanted information from product model  
            del item['image']
            del item['image_blob']
            del item['created_on']
            del item['created_by']
            del item['modified_by']
            del item['modified_on']

            filtered_models.append(item)

        data_dict['objects'] = filtered_models
       
        response.headers['Content-Type'] = 'application/json'
        import gluon.contrib.simplejson
        return gluon.contrib.simplejson.dumps(data_dict)
   
    # else dump empty json list
    data_dict['objects'] = []
    import gluon.contrib.simplejson
    return gluon.contrib.simplejson.dumps(data_dict)

def product():
    id = request.vars.id
    data_dict = {}

    if id:
        target_id = int(id)
        product = db(db.product).select(db.product.sortable == target_id)
       
        print "TEST --- " + str(len(product))

        product_row = []
        if len(product) > 0:
            print "TEST -- SEXY"
            product_row = product[0] 
       
        
            item = product_row.as_dict()
    
            del item['image']
            del item['image_blob']
            del item['created_on']
            del item['created_by']
            del item['modified_by']
            del item['modified_on']
            
            data_dict = item


    response.headers['Content-Type'] = 'application/json'
    import gluon.contrib.simplejson
    return gluon.contrib.simplejson.dumps(data_dict)

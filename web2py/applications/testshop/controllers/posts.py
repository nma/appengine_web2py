def index():
    posts = db().select(db.pots.ALL)
    return reponse.render('posts/index.html', locals())



/**
 * Lightbox for Pinry -- ported to use on web2py
 * Descrip: A lightbox plugin for pinry so that I don't have to rely on some of
 *          the massive code bases of other lightboxes, this one uses data
 *          fields to acquire the info we need and dynamically loads comments.
 *          It also has a nice parallax view mode where the top scrolls and the
 *          background stays stationary.
 * Authors: Pinry Contributors
 * Updated: Feb 26th, 2013
 * Require: jQuery, Pinry JavaScript Helpers
 */

$(window).load(function() {
    //Start Helper Functions
    function freezeScroll(freeze) {
        freeze = typeof freeze !== 'undefined' ? freeze : true;
        if (freeze) {
            $('body').data('scroll-level', $(window).scrollTop());
            $('#pins').css({
                'position': 'fixed',
                'margin-top':-$('body').data('scroll-level')
            });
            $(window).scrollTop(0);
        } else {
            $('#pins').css({
                'position': 'static',
                'margin-top': 0
            });
            $(window).scrollTop($('body').data('scroll-level'));
        }
    }
    // End Helper Functions
    
    // Start View Functions
    function createBox(context) {
        freezeScroll();
        $('body').append(renderTemplate('#lightbox-template', context));
        var box = $('.lightbox-background');
        box.css('height', $(document).height());
        $('.lightbox-image-wrapper').css('height', 500);
        box.fadeIn(200);
        $('.lightbox-image').load(function() {
            $(this).fadeIn(200);
        });
        $('.lightbox-wrapper').css({
            'width': 300,
            'margin-top': 70,
            'margin-bottom': 70,
            'margin-left': -300/2
        });
        if ($('.lightbox-wrapper').height()+140 > $(window).height())
            $('.lightbox-background').height($('.lightbox-wrapper').height()+140);
        
        box.click(function() {
            $(this).fadeOut(200);
            setTimeout(function() {
                box.remove();
            }, 200);
            feezeScroll(false);
        });
    }
    // End View Functions

    function getPinData(id) {
        var apiUrl = '/store/api/product?id='+String(id);
        return $.get(apiUrl);
    }

    function renderTemplate(templateId,context){var template=Handlebars.compile($(templateId).html());return template(context);}
    
    // Start Global Init Function
    window.lightbox = function() {
        var links = $('body').find('.lightbox');
        return links.each(function() {
            $(this).off('click');
            $(this).click(function(e) {
                e.preventDefault();
                console.log($(this).data('id'));
                var promise = getPinData($(this).data('id'));
                promise.success(function(pin) {
                    createBox(pin);
                });
                promise.error(function() {
                    //message('Problem problem fetching pin data.', 'alert alert-error');
                    alert('failed to load pin data');
                });
            }); 
        });
    }
    // End Global Init Function
});
        

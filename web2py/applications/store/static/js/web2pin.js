$(window).load(function() {
    window.tileLayout = function() {
        var blockContainer = $('#pins'),
            blocks = blockContainer.children('.pin'),
            blockMargin = 15,
            blockWidth = 220,
            rowSize = Math.floor(blockContainer.width()/(blockWidth+blockMargin)),
            colHeights = [],
            rowMargins = [],
            marginLeft = 0;

        // Fill our colHeights array with 0 for each row we have
        for (var i = 0; i < rowSize; i++) colHeights[i] = 0;
        // Fill out our rowMargins with which will be static after this
        for (var i = 0; i < rowSize; i++) {
            // Our first item has a special margin to keep things centered
            if (i == 0) rowMargins[0] = (blockContainer.width()-rowSize*(blockWidth+blockMargin))/2;
            else rowMargins[i] = rowMargins[i-1]+(blockWidth+blockMargin);
        }
        // Loop through every block
        for (var b = 0; b < blocks.length; b++) {
            // Get the jQuery object of the current block
            block = blocks.eq(b);
            // Position our new pin in the shortest column
            var sCol = 0;
            for (var i = 0; i < rowSize; i++) {
                if (colHeights[sCol] > colHeights[i]) sCol = i;
            }
            block.css({
                'margin-left' : rowMargins[sCol],
                'margin-top' : colHeights[sCol],
            });
            block.fadeIn(300);
            colHeights[sCol] += block.height()+(blockMargin);
        }

        // other functions here
        
        $('.spinner').css('display', 'none');
        blockContainer.css('height', colHeights.sort().slice(-1)[0]);
    }

    /**
     * Load our pins using the pins template into our UI, be sure to define a
     * offset outside the function to keep a running tally of your location
     */
    function loadPins() {
        // Show our loadin symbol
        $('.spinner').css('display', 'block');

        // Fetch our pins from the api using our current offset
        //var apiUrl = '/store/default/products_callback/?format=json&order_by=-id&offset='+String(offset);
        var apiUrl = '/store/api/products?offset='+String(offset)
        
        //if (priceLow) apiUrl = apiUrl + '&priceLow=' + priceLow
        //if (priceHigh) apiUrl = apiUrl + '&priceHigh=' + priceHigh
        //if (typeFilter) apiUrl = apiUrl +  '&type=' + typeFilter
        //if (brandFilter) apiUrl = apiUrl + '&brand=' + brandFilter

        $.get(apiUrl, function(pins) {
            // Set which items are editable by the current user
            //for (var i = 0; i < pins.objects.length; i++) {
                // do processing here on editable commands
            //}
             
            console.log(pins);
            // Use the fecthed pins as our context for our pins template 
            var template = Handlebars.compile($('#pins-template').html());
            var html = template({pins: pins.objects});

            // Append the newly compiled data to our container
            $('#pins').append(html);

            // We need to then wait for images to load in and then tile
            tileLayout();
            lightbox();
            $('#pins').ajaxStop(function() {
                $('img').load(function() {
                    $(this).fadeIn(300);
                });
            });
        });

        // Up our offset, it's currently defined as 50 in our settings
        offset += 20;
    }

    var offset = 0;
    loadPins();
    
    // If our window gets resized keep the tiles looking clean and in our window
    $(window).resize(function() {
        tileLayout();
        lightbox();
    });

    // If we scroll to the bottom of the documnet load more pins
    /*$(window).scroll(function() {
        var windowPosition = $(window).scrollTop() + $(window).height();
        var bottom = $(document).height() - 100;
        if (windowPosition > bottom) loadPins();
    });*/
});

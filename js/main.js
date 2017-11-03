function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });

    mapInitData.forEach(function(item, i, arr) {
        var galleryId = item.id;
        var marker = new google.maps.Marker({
            position: item.coordinates,
            map: map
        });

        marker.addListener('click', function() {
            $('.map-gallery__content').removeClass("opened");
            $('.map-gallery__content[data-mapgallery-id="'+galleryId+'"]').addClass("opened");

        });

    });




}


$(document).ready(function() {
    $(".owl-map-gallery").owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        items: 1
    })


    $('.big-carousel').owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        items: 1
    })

    $(".js-gallery-nav").click(function(){
        var thisId = $(this).data("gallery-id");
        $(".big-carousel").find(".owl-dot:eq("+thisId+")").trigger('click');
    })

	// Param selects start
    $(window).click(function(e){
        var paramSelect = e.target.closest(".js-param-select");

        if (!paramSelect) {
            $(".js-param-select").removeClass("opened");
        }
    })

	$(".js-param-select .param-select__open").click(function () {
		var thisElem = $(this).closest(".js-param-select"),
			defaultSelect = thisElem.find(".param-select__default"),
			desktopSelect = thisElem.find(".param-select__desktop");

        if (!thisElem.hasClass("opened")) {
            $(".js-param-select").removeClass('opened');
            thisElem.addClass("opened");
        }

	});

	$(".dropbox-param-list__item").click(function(){
		var thisElem = $(this).closest(".js-param-select"),
			thisText = $(this).text(),
			defaultSelect = thisElem.find(".param-select__default"),
			selectedField = thisElem.find(".param-select__selected"),
			indexNum = $(this).index(),
			defaultOptions = defaultSelect.find('option:eq('+indexNum+')');

		selectedField.text(thisText);
		defaultOptions.prop('selected', true);
		thisElem.addClass("selected");
        thisElem.removeClass("opened");
	});

    $(".param-select__delete").click(function(){
        var thisElem = $(this).closest(".js-param-select"),
            defaultSelect = thisElem.find(".param-select__default"),
            selectedField = thisElem.find(".param-select__selected"),
            defaultOptions = defaultSelect.find('option:eq(0)');

        selectedField.text('');
        defaultOptions.prop('selected', true);
        thisElem.removeClass("selected");
        thisElem.removeClass("opened");
    });

	// Param selects end

	$(".index-page").mousemove(function(e){
		var needX = e.pageX/100,
			needY = e.pageY/100;

		$(".index-page__bg").css("background-position-x", needX)
		$(".index-page__bg").css("background-position-y", needY)
	})



	$(".js-select .js-select-btn").click(function(){
		var thisSelect = $(this).closest('.js-select'),
			optionElems = thisSelect.find(".select-list__item"),
			thisButton = $(this);

		thisSelect.toggleClass("opened");

		optionElems.click(function(){
			var optionName = $(this).find(".select-address-line__name").text();
			thisButton.text(optionName);
			thisSelect.removeClass("opened");
		});

	});

    $(window).click(function(e){
        var jsSelect = e.target.closest('.js-select');

        if (!jsSelect){
            $(".js-select").removeClass('opened');
        }
    })



	//Popups
	$(".js-popup-open").click(function(){
		var thisButton = $(this),
		 	popupName = thisButton.data('popupname'),
			thisPopup = $('.js-popup[data-popupname="'+popupName+'"]');


        $('body').addClass("ovh");
        $(".js-popups").fadeIn(500);

        thisPopup.fadeIn(500).addClass("opened");
        var thisPopHeight = thisPopup.outerHeight();
        console.log(thisPopHeight);

        if ($(document).outerWidth() > 1024) {
            $('.popups__overlay').css('height', thisPopHeight + 300)
        } else {
            $('.popups__overlay').css('height', thisPopHeight + 150)
        }


		if (popupName === "order") {
			var orderSelect = thisPopup.find('.js-select'),
			 	startPrice  = thisButton.data('price'),
				serviceItemIndex = $(this).closest(".service-item").index(),
                needSelect = thisPopup.find('.js-select:eq('+serviceItemIndex+')');

            needSelect.removeClass("hidden");

			$(".js-order-start-price").text(startPrice);
			$(".js-order-total-price").text(startPrice)

			orderSelect.find(".select-list__item").click(function(){
				var morePrice = $(this).data("selectvalue");
				$(".js-order-more-price").text(morePrice);
				var totalPrice = morePrice + startPrice;
				$(".js-order-total-price").text(totalPrice)

                if ($(this).hasClass("js-my-address-open")) {
				    $(".js-my-address").addClass('opened');
                } else {
                    $(".js-my-address").removeClass('opened');
                }
			});
		}

		if (popupName === "video") {
		    var videoSrc = thisButton.data('video-src');
            thisPopup.find('video').attr("src", videoSrc);
        }
	});


	$(".js-popups-overlay, .js-popup-close").click(function(){
		$(".js-popup").fadeOut(500).removeClass("opened");
        $('body').removeClass("ovh");
        $(".js-popups").fadeOut(500);
        setTimeout(function(){
            $(".popup-order_sent").removeClass("popup-order_sent");
        },500);

        $('.js-popup[data-popupname="video"]').find('video').attr("src", '');

    })
	//Popups

    $(".js-order-send").click(function(){
        var thisPopup = $(this).closest(".js-popup");

        thisPopup.addClass('popup-order_send-process');

        setTimeout(function(){
            thisPopup.removeClass('popup-order_send-process');
            thisPopup.addClass('popup-order_sent');
        },1000);
    });

	$(".js-services-video").hover(function(){
		$(this).find('video').trigger('play');
	}, function(){
		$(this).find('video').trigger('pause');
	})

	$(".js-toggle-button").click(function(){
		var thisElem = $(this),
		 	parent = thisElem.data("elem"),
			className = thisElem.data("nameclass");
		if (parent === true) {
			thisElem.closest(".js-toggle-elem").toggleClass(className)
		} else {
			thisElem.toggleClass(className)
		}
	});

	function move_el_init(el) {
		el.each(function(){
			var dur, posX, posY, transform_v, delay;

			if(!$(this).data('dur'))
				dur = 1;
			else
				dur = $(this).data('dur')

			posX = $(this).data('left')+'px';
			posY = $(this).data('top')+'px';

			if($(this).data('transform')) {
				transform_v = $(this).data('transform');
			} else {
				transform_v = '';
			}

			if($(this).data("delay")) {
				delay = $(this).data('delay');
			} else {
				delay = 0;
			}

			$(this).css({'transform': 'translate('+posX+', '+posY+') '+transform_v, opacity:0});
			var bll = $(this);
			setTimeout(function(){
				bll.css({transition:'all '+dur+'s ease', 'transition-delay': delay+'s'});
			}, 100)
		});
	}

	if ($(window).width() > 1024) {
        move_el_init($('.js-anim-elem'));
    }


    function move_el_action(el) {
        el.each(function(){
            $(this).css({'transform':'translate(0,0) scale(1)', opacity:1}).addClass('animation_done__');
        })
    }


	$(".js-catalog-open").click(function(){
	    if ($(document).outerWidth() > 1024) {
            $(".index-page__right, .index-page__left").addClass("hidden")
        }

        setTimeout(function(){
            move_el_action($('.js-anim-elem'));
            $(".wrapper").removeClass("wrapper_index-open");
        },500)
	})


    // Если в проекте используются встроенные js-плагины от Foundation, разкомментировать
    // $(document).foundation();

});
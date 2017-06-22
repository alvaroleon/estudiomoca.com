(function ($) {
    "use strict";


    // MENU MOBILE
    $('a.btn-menu-mobile').on('click', function(event) {
        event.preventDefault();
        if($(this).hasClass('open')){
            $('body').removeClass('no-scroll');
            $(this).removeClass('open');
            $('header.header nav').removeClass('show-menu');
        }
        else{
            $('body').addClass('no-scroll');
            $(this).addClass('open');
            $('header.header nav').addClass('show-menu');
        }
    });

    $('.btn-contact').on('click', function(event){
        event.preventDefault();
        $('.cover-modal').addClass('show-modal');
        $('body').addClass('no-scroll');
    });
    $('.close-modal').on('click', function(event){
        event.preventDefault();
        $('.cover-modal').removeClass('show-modal');
        $('body').removeClass('no-scroll');
    });

    // SCROLLTO MENU
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('header.header nav ul li.page a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top +20
        }, 500);
        //$('header.header nav ul li').removeClass('active');
        //$(this).parent().addClass('active');
        event.preventDefault();
    });

    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('header.header nav ul li.page a').each(function () {
            $('body').removeClass('no-scroll');
            $('.btn-menu-mobile').removeClass('open');
            $('header.header nav').removeClass('show-menu');
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('header.header nav ul li.page').removeClass("active");
                currLink.parent().addClass("active");
            }
            else {
                currLink.parent().removeClass("active");
            }
        });
    }

    // Windows load
    $(window).load(function () {
        // Site loader 

        $(".loader-inner").fadeOut();
        $(".loader").delay(200).fadeOut("slow");
        $('body').removeClass('stop-scroll');

    });

    /* HEADER FIJO */
    $(window).scroll(function () {
        if ($(document).scrollTop() > 60) {
            $('header').addClass('fixed');
        }
        else {
            $('header').removeClass('fixed');
        }
    });

    /* SCROLL BAR */
    $(window).on('load', function(){
        var getMax = function(){
            return $(document).height() - $(window).height();
        }
        var getValue = function(){
            return $(window).scrollTop();
        }
        if('max' in document.createElement('progress')){
            // Browser supports progress element
            var progressBar = $('progress');

            // Set the Max attr for the first time
            progressBar.attr({ max: getMax() });

            $(document).on('scroll', function(){
                // On scroll only Value attr needs to be calculated
                progressBar.attr({ value: getValue() });
            });

            $(window).resize(function(){
                // On resize, both Max/Value attr needs to be calculated
                progressBar.attr({ max: getMax(), value: getValue() });
            });
        }
        else {
            var progressBar = $('progress'),
                max = getMax(),
                value, width;

            var getWidth = function(){
                // Calculate width in percentage
                value = getValue();
                width = (value/max) * 100;
                width = width + '%';
                return width;
            }

            var setWidth = function(){
                progressBar.css({ width: getWidth() });
            }

            $(document).on('scroll', setWidth);
            $(window).on('resize', function(){
                // Need to reset the Max attr
                max = getMax();
                setWidth();
            });
        }
    });

    // Site moca setup
    function mainmocaResize() {
        $(".moca.index").css('height', $(window).height());
    }

    $(function() {
            mainmocaResize()
        }),
        $(window).resize(function() {
            mainmocaResize();
            $('a.btn-menu-mobile').removeClass('open');
            $('header.header nav').removeClass('show-menu');
            $('body').removeClass('no-scroll');
            $('.cover-modal').removeClass('show-modal');
        });


    // Site navigation setup

    $(".toggle-navigation a, .mask-canvas").on("click", function() {

        $(".toggle-navigation").toggleClass("active");
        $('.offest-nav-canvas ').toggleClass('show-nav');
        $('.inner-wrapper ').toggleClass('mask-overlap');
        $('body').toggleClass('stop-scroll');
        return false;
    });


    // Append images as css background

    $('.background-img').each(function () {
        var path = $(this).children('img').attr('src');
        $(this).css('background-image', 'url("' + path + '")').css('background-position', 'initial');
    });
    // Site slider 

    $("#testimonial-carousel, #services-carousel").owlCarousel({
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,
        pagination: true,
        autoPlay: true,
        singleItem: true
    });


    $("#client-carousel").owlCarousel({

        items: 6,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 4],
        itemsTablet: [768, 3],
        itemsTabletSmall: [550, 1],
        itemsMobile: [480, 2],
        pagination: false,
        autoPlay: true
    });


    // Skills bar 

    $(".percentage").each(function () {
        var height = $(this).text();
        $(this).css("height", height);
    });


    // Scroll top

    $("a[href='#top']").on("click", function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });


    // Portfolio setup

    $('.venobox').venobox({
        titleattr: 'data-title',
        numeratio: true
    });


    $('.filter li a').on("click", function () {

        $(this).addClass('active');
        $(this).parent().siblings().find('a').removeClass('active');

        var filters = $(this).attr('data-filter');
        $(this).closest('.works').find('.box.work').removeClass('disable');

        if (filters !== 'all') {
            var selected = $(this).closest('.works').find('.box.work');
            for (var i = 0; i < selected.length; i++) {

                if (!selected.eq(i).hasClass(filters)) {
                    selected.eq(i).addClass('disable');
                }

            }

        }

        return false;

    });


    // Form validation 

    var inputName = $('input#name');
    var inputEmail = $('input#email');
    var textArea = $('textarea#message');
    var contactForm = $('.contact-form');


    $('.submit').on("click", function () {

        inputName.removeClass("errorForm");
        textArea.removeClass("errorForm");
        inputEmail.removeClass("errorForm");

        var error = false;
        var name = inputName.val();
        if (name === "" || name === " ") {
            error = true;
            inputName.addClass("errorForm");
        }


        var msg = textArea.val();
        if (msg === "" || msg === " ") {
            error = true;
            textArea.addClass("errorForm");

        }

        var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        var email = inputEmail.val();
        if (email === "" || email === " ") {
            inputEmail.addClass("errorForm");
            error = true;
        } else if (!email_compare.test(email)) {
            inputEmail.addClass("errorForm");
            error = true;
        }

        if (error === true) {
            return false;
        }

        var data_string = contactForm.serialize();

        $.ajax({
            type: "POST",
            url: contactForm.attr('action'),
            data: data_string,

            success: function (message) {
                if (message === 'SENDING') {
                    $('.success').fadeIn('slow');
                } else {
                    $('.error').fadeIn('slow');
                }
            }

        });

        return false;
    });

    $(".home-down").click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $(".about").offset().top
        }, 500);
    });

})(jQuery);
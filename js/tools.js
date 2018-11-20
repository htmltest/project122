$(document).ready(function() {

    $('.slider-list').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99844 0L7.39844 1.4L2.79844 6L7.39844 10.6L5.99844 12L-0.0015626 6L5.99844 0Z" /></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.4 0L0 1.4L4.6 6L0 10.6L1.4 12L7.4 6L1.4 0Z" /></svg></button>',
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    arrows: false
                }
            }
        ]
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.slider-text-inner li.active').removeClass('active');
        $('.slider-text-inner li').eq(nextSlide).addClass('active');
    });;

    $('.next-link').click(function(e) {
        $('html, body').animate({'scrollTop': $(this).offset().top + $(this).height()});
    });

    var profitTimer = null;
    var profitIndex = 0;
    var profitPeriod = 5000;
    var profitSpeed = 1000;

    $('.profit-photo').each(function() {
        profitTimer = window.setTimeout(profitNextPhoto, profitPeriod);
    });

    $('.profit-photo ul').mouseenter(function(e) {
        e.preventDefault();
        profitNextPhoto();
    });

    $('.profit-photo ul').click(function() {
        profitNextPhoto();
    });

    function profitNextPhoto() {
        window.clearTimeout(profitTimer);
        profitTimer = null;

        var newIndex = profitIndex + 1;
        if (newIndex > $('.profit-photo li').length - 1) {
            newIndex = 0;
        }
        $('.profit-photo li').eq(newIndex).css({'z-index': 1}).show();
        $('.profit-photo li').eq(profitIndex).css({'z-index': 2}).fadeOut(profitSpeed, function() {
            profitTimer = window.setTimeout(profitNextPhoto, profitPeriod);
            profitIndex = newIndex;
        });
    }

    $(window).on('load resize', function() {
        $('.profit-list').each(function() {
            var curList = $(this);
            if ($(window).width() < 1024) {
                if (!curList.hasClass('slick-slider')) {
                    curList.slick({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
                        arrows: false,
                        dots: true
                    });
                    curList.slick('slickRemove', 4);
                }
            } else {
                if (curList.hasClass('slick-slider')) {
                    curList.slick('unslick');
                }
            }
        });
    });

    $('.main-reviews-list').each(function() {
        $('.main-reviews-count').html($('.main-reviews-item').length);
    });

    $('.main-reviews-list').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99844 0L7.39844 1.4L2.79844 6L7.39844 10.6L5.99844 12L-0.0015626 6L5.99844 0Z" /></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.4 0L0 1.4L4.6 6L0 10.6L1.4 12L7.4 6L1.4 0Z" /></svg></button>',
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    }).on('setPosition', function(event, slick) {
        var curIndex = $('.main-reviews-list').slick('slickCurrentSlide');
        $('.main-reviews-current').html(curIndex + 1);
    });

    $('.main-spec-all a').click(function(e) {
        $('.main-spec-all').toggleClass('open');
        $('.main-spec-other').slideToggle(200);
        e.preventDefault();
    });

    $(window).on('load resize', function() {
        $('.main-news .news-list').each(function() {
            var curList = $(this);
            if ($(window).width() < 1024) {
                if (!curList.hasClass('slick-slider')) {
                    curList.slick({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
                        arrows: false,
                        dots: true
                    });
                    curList.slick('slickRemove', 4);
                }
            } else {
                if (curList.hasClass('slick-slider')) {
                    curList.slick('unslick');
                }
            }
        });
    });

    $.validator.addMethod('maskPhone',
        function(value, element) {
            if (value == '') {
                return true;
            }
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curForm = curField.parents().filter('form');
        curField.find('.form-file-name-text').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curForm.find('.form-files').append(curForm.data('filesCode'));
    });

    $('body').on('click', '.form-file-name-remove', function() {
        var curField = $(this).parents().filter('.form-file');
        curField.remove();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.catalogue-header-link .btn').click(function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length > 0) {
            $('html, body').animate({'scrollTop': curBlock.offset().top}, 200);
        }
        e.preventDefault();
    });

    $('.gallery-list').slick({
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.1622 -9.15527e-05L15 2.79991L5.67568 11.9999L15 21.1999L12.1622 23.9999L0 11.9999L12.1622 -9.15527e-05Z" /></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.83784 -9.15527e-05L0 2.79991L9.32432 11.9999L0 21.1999L2.83784 23.9999L15 11.9999L2.83784 -9.15527e-05Z" /></svg></button>',
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });

    $('.gallery-item a').fancybox({
        buttons : [
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                DOWNLOAD    : 'Скачать',
                CLOSE       : 'Закрыть',
                NEXT        : 'Вперед',
                PREV        : 'Назад'
            }
        }
    });

    $('body').on('click', '.price-block h2.title span', function(e) {
        var curBlock = $(this).parents().filter('.price-block').toggleClass('open');
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $(window).resize(function() {
        windowPosition();
    });

    $('body').on('click', '.window-close, .window-thanks-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('click', '.reviews-filter-field-current', function() {
        var curField = $(this).parents().filter('.reviews-filter-field');
        if (!curField.hasClass('open')) {
            $('.reviews-filter-field').removeClass('open');
            curField.addClass('open');
        } else {
            curField.removeClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.reviews-filter-field').length == 0) {
            $('.reviews-filter-field').removeClass('open');
        }
    });

    $('body').on('click', '.reviews-item-text-full-more', function(e) {
        $(this).parents().filter('.reviews-item-text-full').toggleClass('open');
        e.preventDefault();
    });

    $('.header-mobile-menu-link').click(function(e) {
        $('html').toggleClass('mobile-menu-open');
        e.preventDefault();
    });

    $('nav ul li a').click(function(e) {
        if ($(window).width() < 1024) {
            if ($(this).parent().find('ul').length > 0) {
                $(this).parent().toggleClass('open');
                e.preventDefault();
            }
        }
    });

});

$(window).on('load resize scroll', function() {
    $('.reviews-item-text-full').each(function() {
        var curText = $(this);
        curText.removeClass('open');
        curText.find('.reviews-item-text-full-more').remove();
        if (curText.height() < curText.find('.reviews-item-text-full-inner').height()) {
            curText.append('<a href="#" class="reviews-item-text-full-more"></a>');
        }
    });
});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

    if (curForm.find('.form-files').length > 0) {
        curForm.data('filesCode', curForm.find('.form-files').html());
    }

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            if ($(form).hasClass('ajax-form')) {
                windowOpen($(form).attr('action'), $(form).serialize());
            } else {
                form.submit();
            }
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    var curPadding = $('.wrapper').width();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    if ($('.window').length == 0) {
        $('body').append('<div class="window"><div class="window-loading"></div></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').remove();
        }
        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        $('.window-container').removeClass('window-container-load');
        windowPosition();

        $('.window form').each(function() {
            initForm($(this));
        });
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 200) {
            $('.window-container').css({'top': '100px', 'margin-top': 0, 'padding-bottom': 100});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
    }
}
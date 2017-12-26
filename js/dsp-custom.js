!function ($) {
    $(function () {
        $('.slider').slick({
            autoplay: true,
            dots: true,
            asNavFor: '.slider-tx',
            autoplaySpeed: 2000
        });

        $('.slider-tx').slick({
            autoplay: true,
            dots: false,
            arrows: false,
            asNavFor: '.slider',
            autoplaySpeed: 2000
        });

        $('.lottery-slider').slick({
            autoplay: false,
            dots: false,
            arrows: false
        });

        !function (controls) {
            controls.each(function(n,element) {
                var $element = $(element);
                var selector = $element.data('slickControl');
                var slide = $element.data('slideNumber');

                $(element).on('click', function () {
                    $(selector).slick('slickGoTo', slide);
                });

                $(selector).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    $('[data-slick-control=\''+ selector +'\'][data-slide-number='+ currentSlide +']').removeClass('active');
                    $('[data-slick-control=\''+ selector +'\'][data-slide-number='+ nextSlide +']').addClass('active');
                });
            });
        }($('[data-slick-control]'));
    });
}(jQuery);
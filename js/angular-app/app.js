var randomApp = angular.module('random', ['ngRoute', 'ngCookies'])
    .run(function($rootScope, $location, $, $q, $log, Random, web3) {
        $rootScope.Random = Random;
        Random.loadAll();

        window.$web3 = web3;
        window.$daily = Random.lottery('daily');
        window.$q = $q;

        $rootScope.init = function() {
            "use strict";

            // var preloader
            var loader = $('.preloader');
            var bgpreloader = $('.bg-preloader');

            // var navigation
            var Slink = $('.scroll-link');
            var menumobile = $('#main-menu');
            var navdefault = $('.navbar-default');
            var sTick = $(".navbar-fixed-top");
            var Navactive = $("nav a");

            //totop var
            var totop = $('#totop');
            var bodyScroll = $('html,body');

            // start function
            loader.fadeOut('slow', function () {
                "use strict";

                // opening slideup
                bgpreloader.addClass("scale3dpreloader").fadeOut(1000);

                // animated transition & scroll onStep
                onStep();

                // scroll navigation
                if ($win.width() < 1025) {
                    Slink.on('click', function (event) {
                        event.preventDefault();
                        var sectionID = $(this).attr("data-id");
                        scrollToID('#' + sectionID, 600);
                        menumobile.removeClass('menu-show');
                        navdefault.removeClass('fullHeight');
                    });
                } else {
                    Slink.on('click', function (event) {
                        event.preventDefault();
                        var sectionID = $(this).attr("data-id");
                        scrollToID('#' + sectionID, 600);
                    });
                }

                // function active class
                $(function () {
                    Navactive.click(function () {
                        Navactive.removeClass("active");
                        $(this).addClass("active");
                    });
                });

                function scrollToID(id, speed) {
                    var offSet = 50;
                    var targetOffset = $(id).offset().top - offSet;
                    bodyScroll.animate({scrollTop: targetOffset}, speed);
                }


                //mobile icon
                $(".navbar-toggle").on("click", function () {
                    menumobile.toggleClass('menu-show');
                    navdefault.toggleClass('fullHeight');
                });

                // animation block menu
                $win.scroll(function () {
                    if ($(".navbar").offset().top > 50) {
                        sTick.addClass("sticky-nav");
                        totop.fadeIn(100);
                    } else {
                        sTick.removeClass("sticky-nav");
                        totop.fadeOut(100);
                    }
                });

                $(document).height(function () {
                    if ($(".navbar").offset().top > 50) {
                        sTick.addClass("sticky-nav");
                        totop.fadeIn(100);
                    } else {
                        sTick.removeClass("sticky-nav");
                        totop.fadeOut(100);
                    }
                });

            });

            totop.on("click", function (e) {
                e.preventDefault();
                bodyScroll.animate({
                    scrollTop: 0
                }, 800);
            });
            // end function

            // Magnific Popup img
            $('.big-img').magnificPopup({
                delegate: 'a',
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: false,
                mainClass: 'mfp-with-zoom mfp-img-mobile',
                image: {
                    verticalFit: true,
                },
                gallery: {
                    enabled: false
                },
                zoom: {
                    enabled: true,
                    duration: 300, // don't foget to change the duration also in CSS
                    opener: function (element) {
                        return element.find('img');
                    }
                }

            });

            // Magnific Popup dailymotion
            $('.big-video').magnificPopup({
                type: 'iframe',
                iframe: {
                    patterns: {
                        dailymotion: {
                            index: 'dailymotion.com',
                            id: function (url) {
                                var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                                if (m !== null) {
                                    if (m[4] !== undefined) {
                                        return m[4];
                                    }
                                    return m[2];
                                }
                                return null;
                            },
                            src: 'http://www.dailymotion.com/embed/video/%id%'
                        }
                    }
                }
            });

            // Magnific Popup youtube
            $('.big-youtube').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-with-zoom mfp-img-mobile',
                removalDelay: 0,
                preloader: false,
                fixedContentPos: false,
                iframe: {
                    patterns: {
                        youtube: {
                            src: 'http://www.youtube.com/embed/%id%?autoplay=1&rel=0'
                        }
                    }
                }
            });


            // service
            var $container = $('#services');
            $container.isotope({
                itemSelector: '.service',
                filter: '.day1',
                hiddenStyle: {
                    opacity: 0
                },
                visibleStyle: {
                    opacity: 1
                }
            });
            $('.filt-serv').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                if ($this.hasClass('selected')) {
                    return false;
                }
                var $optionSet = $this.parents();
                $optionSet.find('.selected').removeClass('selected');
                $this.addClass('selected');

                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                });
                return false;
            });

            // projects
            var $containerpro = $('#projects-wrap');
            $containerpro.isotope({
                itemSelector: '.item',
                filter: '*'
            });
            $('.filt-projects').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                if ($this.hasClass('actived')) {
                    return false;
                }
                var $optionSetpro = $this.parents();
                $optionSetpro.find('.actived').removeClass('actived');
                $this.addClass('actived');

                var selector = $(this).attr('data-project');
                $containerpro.isotope({
                    filter: selector,
                });
                return false;
            });


            // owlCarousel brand
            var owl = $("#owl-brand");
            owl.owlCarousel({
                items: 5,
                itemsDesktop: [1000, 4],
                itemsDesktopSmall: [900, 3],
                itemsTablet: [600, 2],
                itemsMobile: false,
                autoPlay: 2000,
                stopOnHover: true
            });

            // owl slider home
            var time = 7; // time in seconds
            var $progressBar,
                $bar,
                $elem,
                isPause,
                tick,
                percentTime;

            //Init the carousel
            $("#owl-slider-home").owlCarousel({
                slideSpeed: 500,
                paginationSpeed: 500,
                singleItem: true,
                transitionStyle: "fade",
                afterInit: progressBar,
                afterMove: moved,
                loop: true,
                autoHeight: true,
                touchDrag: false,
                mouseDrag: false,
                navigation: true,
                navigationText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ]
            });

            //Init progressBar where elem is $("#owl-slider-home")
            function progressBar(elem) {
                $elem = elem;
                //build progress bar elements
                buildProgressBar();
                //start counting
                start();
            }

            //create div#progressBar and div#bar then prepend to $("#owl-slider-home")
            function buildProgressBar() {
                $progressBar = $("<div>", {
                    id: "progressBar"
                });
                $bar = $("<div>", {
                    id: "bar"
                });
                $progressBar.append($bar).prependTo($elem);
            }

            function start() {
                //reset timer
                percentTime = 0;
                isPause = false;
                //run interval every 0.01 second
                tick = setInterval(interval, 10);
            }

            function interval() {
                if (isPause === false) {
                    percentTime += 1 / time;
                    $bar.css({
                        width: percentTime + "%"
                    });
                    //if percentTime is equal or greater than 100
                    if (percentTime >= 100) {
                        //slide to next item
                        $elem.trigger('owl.next')
                        $elem.trigger('owl.next')
                    }
                }
            }

            function i() {
                var windowHeight = $(window).innerHeight();
                $(".mainbg").css("min-height", windowHeight);
                $(".imgbg").css("min-height", windowHeight);
            }
            i(), $(window).resize(function() {
                i()
            });

            //moved callback
            function moved() {
                //clear interval
                clearTimeout(tick);
                //start again
                start();
            }
        };

        $rootScope.onPath = function(path) {
            return $location.path() === path
        };

        web3.eth.getSyncing( function (error, result) {
            $log.log("[web3] Syncing:", result);
        });
    });
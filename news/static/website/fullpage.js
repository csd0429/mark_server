
        /* 锟斤拷锟絝ullpage锟斤拷锟斤拷式效锟斤拷JS锟斤拷锟斤拷*/

    $(function () {
        $("#ido").fullpage(
            {
                'verticalCentered': true,//锟斤拷锟斤拷锟角凤拷直锟斤拷锟斤拷
                css3: true,//锟角凤拷使锟斤拷CSS3 transforms锟斤拷锟斤拷
                'sectionsColor': ['white', 'white', 'white', 'white'],
                anchors: ['page1', 'page2', 'page3', 'page4', 'page5','page6','page7','page8','page9','page10'],
                /* menu: '#menu',*/
                'navigation': true,
                scrollingSpeed: 1000,
                responsive: 300,


                onLeave: function (index, newIndex, direction) {
                    if (index == 2 && direction == 'down') {
                        $('#staticImg').removeClass('moveUp1').addClass('moveDown1');
                        $('.fadein').removeClass('animated fadeInRight2').addClass('animated fadeOut');
                        $('.fadein2').removeClass('fadeOut2').addClass('animated fadeInLeft');
                        $('#screen-inner').attr("src","image/screen.gif");


                    }


                    if (index == 3 && direction == 'down') {
                        $('#staticImg').removeClass('moveDown1').addClass('moveDown2');

                        $('.fadein2').removeClass('animated fadeInLeft').addClass('animated fadeOut2');
                        $('.fadein3').removeClass('animated fadeOut4').addClass('animated fadeInRight');


                    }

                    if (index == 4 && direction == 'up') {
                        $('#staticImg').removeClass('moveDown2').addClass('moveDown1');
                        $('.fadein2').removeClass('fadeOut2').addClass('animated fadeInLeft');
                        $('.fadein3').removeClass('animated fadeInRight').addClass('animated fadeOut4');


                    }
                    if (index == 3 && direction == "up") {

                        $('#staticImg').removeClass('moveDown1').addClass('moveUp1');

                        $('.fadein').removeClass('animated fadeOut ').addClass('animated fadeInRight2');
                        $('.fadein2').removeClass('animated fadeInLeft').addClass('animated fadeOut2');
                        $('#screen-inner').attr("src","image/welcome.gif");

                    }
                    if (index == 2 && direction == "up") {

                        $('#staticImg').removeClass('moveUp1');

                        $('.fadein').removeClass('animated fadeInRight2').addClass('animated fadeOut');
                        $('#screen-inner').attr("src","image/welcome.gif");

                    }
                    if (index == 1 && direction == "down") {

                        $('.fadein').removeClass('animated fadeOut').addClass('animated fadeInRight2');
                        $('.logo').removeClass('animated rubberBand');
                    }

                    if (index == 4 && direction == "down") {
                        $('#staticImg').removeClass('moveDown2').addClass('moveDown3');
                        $('.fadein3').removeClass('animated fadeInRight').addClass('animated fadeOut4');
                        $('.fadein4').removeClass('animated fadeOut2').addClass('animated fadeInLeft')


                    }
                    if (index == 5 && direction == "up") {
                        $('#staticImg').removeClass('moveDown3').addClass('moveDown2');
                        $('.fadein3').removeClass('animated fadeOut4').addClass('animated fadeInRight');
                        $('.fadein4').removeClass('animated fadeInLeft').addClass('animated fadeOut2');

                    }
                    if (index == 6 && direction == "up") {
                        $('.content-container1').removeClass('animated fadeInUp').addClass('animated fadeOut3');
                        $('.fadein4').removeClass('animated fadeOut2').addClass('animated fadeInLeft');
                        $('#staticImg').addClass('moveDown3');
                    }

                    if (index == 5 && direction == "down") {
                        $('.content-container1').removeClass('animated fadeOut3').addClass('animated fadeInUp');
                        $('.fadein4').removeClass('animated fadeInLeft').addClass('animated fadeOut2');
                    }
                    if (index == 6 && direction == "down") {

                        $('.content-container1').removeClass('animated fadeInUp').addClass('animated fadeOut3');
                    }
                    if (index == 7 && direction == "up") {
                        $('.content-container1').removeClass('animated fadeOut3').addClass('animated fadeInUp');

                    }
                },

                afterLoad: function (anchorlink, index) {

                    if (index == 1) {


                    }
                    if (index == 2) {

                    }
                    if (index == 3) {


                    }

                    if (index == 4) {


                    }

                    if (index == 5) {


                    }

                }
            }
        );

    });



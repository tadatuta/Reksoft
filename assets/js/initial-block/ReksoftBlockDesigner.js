define(['fabric', "../initial-block/MovingCircle",
        "../initial-block/triangleCrossCircles",
        "../initial-block/sticksAroundCircle",
        "../initial-block/movingArc",
        "../initial-block/blinkingImg",
        "../initial-block/circulatingImg",
        "../initial-block/movingLittleCircle",
        "../initial-block/movingMouseCircle",
        "../initial-block/rotatingObject",
        "../initial-block/fullScreenLines",
        "../initial-block/leftCircles",
        "../initial-block/zigzags",
        "../initial-block/squaresGroup",
        "../initial-block/cloud",
        "../initial-block/rotatingImg",
        "animation/commonAnimation"
],
    function (fabric, MovingCircle, TriangleCrossCircles, SticksAroundCircle, MovingArc, BlinkingImg,
              CirculatingImg, MovingLittleCircle, MovingMouseCircle, RotatingObject, FullScreenLines, LeftCircles,
              Zigzags, SquaresGroup, Cloud, RotatingImg, CommonAnimation) {

        var ReksoftBlockDesigner = (function () {

            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
            var scaleIndex;
            var reksoftImgHeight;
            var planetSize = 26,
                totalPlanets = 3,
                rotationSpeed = 20000;
            var radiusPlus;
            var orbitRadiusBase;
            var reksoftImagePadding;
            var canvas;
			var paddingFromLogoToHorLine = 25;
            var logo;
            var firstHorLine;
            var firstDiagonalLine;
            var secondDiagonalLine;
            var orbits = [];
            var planet0;
            var planet1;
            var planet2;
            var movingArcBottom;
            var movingArcBottom2;
            var movingArcBottom3;
            var sticksAroundCircle0;
            var sticksAroundCircle1;
            var sticksAroundCircle2;
            var circlesAr;
            var topImg;
            var noise;
            var leftCirclesImg;
            var leftCircles;
            var rightCircle;
            var circulatingImgs;
            var movingCircle1;
            var movingCircle2;
            var movingCircle3;
            var movingCircle4;
            var mouse;
            var movingMouseCircle;
            var ieroglifsRightImg;
            var blinkingIeroglif;
            var ieroglifsLeftImg;
            var blinkingIeroglifLeft;
            var blinkingIeroglifLeft1;
            var blinkingIeroglifLeft2;
            var triangleCrossCircles;
            var triangleCrossCircles2;
            var triangleCrossCircles3;
            var triangleCrossCircles4;
            var triangleCrossCircles5;
            var squaresGroup;
            var zigzags;

            var init = function () {
                fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
                fabric.Object.prototype.objectCaching = false; //TURN OFF Cache!!!
                //fabric.Object.prototype.noScaleCache = true; //- не помогает
                canvas = new fabric.StaticCanvas('c1', { //StaticCanvas
                    selection: false
                });
                scaleIndex = CommonAnimation.setScaleIndexOnLoad(width);
                evaluateScaleDependedVars();
                setNewCanvasSize();
                addLines();
                addlogo();
                addClounds();
                _bindUIEvents();
            };

            var _reinit = function () {
                /*if (!$("html").hasClass("tablet") && !$("html").hasClass("mobile")) return;*/
                scaleIndex = CommonAnimation.setScaleIndexOnLoad(width);
                setNewCanvasSize();
                evaluateScaleDependedVars();
                reinitLogo();
                reinitLines();
                redrawCircles();
                reinitPlanets();
                reinitArcs();
                reinitSticksAroundCenterCircle();
                reinitLittleCirclesInCenter();
                reinitLittleTopImg();
                reinitNoise();
                reinitLeftCircles();
                reinitRightCircle();
                reinitMountainCircles();
                reinitMouse();
                reinitIeroglifsRight();
                reinitIeroglifsLeft();
                reinitTriangleCrossCircles();
                reinitSquaresGroup();
                reinitZigzags();
            };

            var _bindUIEvents = function () {
                window.addEventListener('resize', function () {
                    _reinit();
                });

                $(window).on("logo-loaded", function () {
                    setTimeout(function () {
                        var resolution = CommonAnimation.getResolution();
                        drawCircles();
                        addLittleCirclesInCenter();
                        addSticksAroundCenterCircle();
                        addNoise();
                        addSquaresGroup();
                        if (resolution != "mobile_vert" && resolution != "mobile_hor") {
                            addLeftCircles();
                            addRightCircle();
                            addZigzags();
                        }
                        addLittleTopImg();
                        addMountainCircles();
                        addIeroglifsLeft();
                        addIeroglifsRight();
                        addMouse();
                        if (resolution != "desktop_sm1" &&
                            resolution != "tablet_hor"
                            && resolution != "tablet_vert") {
                            addTriangleCrossCircles();
                        }
                        setTimeout(function () {
                            addPlanets();
                        }, 1000);
                    }, 1000);

                });
            };

            var evaluateScaleDependedVars = function () {
                var logoScaleIndex = 0.65;
                radiusPlus = 200 * scaleIndex;
                orbitRadiusBase = 75 * scaleIndex;
                reksoftImagePadding = 20 * scaleIndex;
                reksoftImgHeight = 240 * logoScaleIndex * scaleIndex;
            };

            var setNewCanvasSize = function () {
                width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
                /*var widthn = width;
                 var heightn = height;*/
                canvas.setDimensions({
                    width: width,
                    height: height
                });
            };

            var addLines = function () {
                var length = 900;
                var angle;
                var x1 = width / 2;
                var y1 = height / 2 - reksoftImagePadding - reksoftImgHeight - paddingFromLogoToHorLine * scaleIndex;
                var xIntersectionWithScreenTop;
                var duration = 450;

                var fullScreenLines = new FullScreenLines({
                    canvas: canvas,
                    width: width,
                    height: height,
                    duration: duration
                });

                firstHorLine = fullScreenLines.drawAnimatedHorizontalLine(0, width, height / 2);

                setTimeout(function () {
                    angle = 125;
                    xIntersectionWithScreenTop = getLinesIntersectionByTwoCoord(x1, y1, x1 + length * Math.cos(Math.PI * angle / 180.0),
                        y1 + length * Math.sin(Math.PI * angle / 180.0), 0);
                    firstDiagonalLine = fullScreenLines.drawAnimatedDiagonalLine(angle, xIntersectionWithScreenTop, 0);
                }, duration - 200);

                setTimeout(function () {
                    angle = 57;
                    xIntersectionWithScreenTop = getLinesIntersectionByTwoCoord(x1, y1, x1 + length * Math.cos(Math.PI * angle / 180.0),
                        y1 + length * Math.sin(Math.PI * angle / 180.0), 0);
                    secondDiagonalLine = fullScreenLines.drawAnimatedDiagonalLine(angle, xIntersectionWithScreenTop, 0);
                }, (duration - 200) * 2);

            };

            var reinitLines = function() {
                var value = 4000;
                var length = 900;
                firstHorLine.set({ x1: width, y1: height / 2, x2: 0, y2: height / 2  });
                var angle = 57;
                var x1 = width / 2;
                var y1 = height / 2 - reksoftImagePadding - reksoftImgHeight - paddingFromLogoToHorLine * scaleIndex; // 10: paddings

                var xIntersectionWithScreenTop = getLinesIntersectionByTwoCoord(x1, y1, x1 + length * Math.cos(Math.PI * angle / 180.0),
                    y1 + length * Math.sin(Math.PI * angle / 180.0), 0);
                secondDiagonalLine && secondDiagonalLine.set({
                    x1: xIntersectionWithScreenTop,
                    y1: 0,
                    x2: xIntersectionWithScreenTop + value * Math.cos(Math.PI * angle / 180.0),
                    y2: value * Math.sin(Math.PI * angle / 180.0)
                });

                angle = 125;
                xIntersectionWithScreenTop = getLinesIntersectionByTwoCoord(x1, y1, x1 + length * Math.cos(Math.PI * angle / 180.0),
                    y1 + length * Math.sin(Math.PI * angle / 180.0), 0);
                firstDiagonalLine && firstDiagonalLine.set({
                    x1: xIntersectionWithScreenTop,
                    y1: 0,
                    x2: xIntersectionWithScreenTop + value * Math.cos(Math.PI * angle / 180.0),
                    y2: value * Math.sin(Math.PI * angle / 180.0)
                });
            };

            var addlogo = function () {
                setTimeout(function () {

                    fabric.loadSVGFromURL('../assets/img/Reksoft-logo.svg', function (objects, options) {
                        var logoScaleIndex = 0.65;
                        logo = fabric.util.groupSVGElements(objects, options);
                        logo.scale(logoScaleIndex * scaleIndex);
                        var imgWidth = logo.width * logoScaleIndex * scaleIndex;
                        var imgHeight = logo.height * logoScaleIndex * scaleIndex;
                        var logoTop = height / 2 - reksoftImagePadding - imgHeight;

                        canvas.add(logo.set({
                            left: width / 2 - imgWidth / 2 - 2, //-2, тк неотцентрована немного картинка
                            top: logoTop - 40,
                            originX: "left",
                            originY: "top",
                            opacity: 0
                        }));

                        logo.animate({
                            'top': logoTop,
                            opacity: 1
                        }, {
                            duration: 450,
                            onChange: canvas.renderAll.bind(canvas)
                        });
                    });
                    $(window).trigger("logo-loaded");

                }, 1000);
            };

            var reinitLogo = function () {
                var logoScaleIndex = 0.65;
                if(logo) {
                    var imgWidth = logo.width * logoScaleIndex * scaleIndex;
                    var imgHeight = logo.height * logoScaleIndex * scaleIndex;
                    var logoTop = height / 2 - reksoftImagePadding - imgHeight;
                    logo.scale(logoScaleIndex * scaleIndex);
                    logo.set({
                        left: width / 2 - imgWidth / 2 - 2, //-2, тк неотцентрована немного картинка
                        top: logoTop,
                        originX: "left",
                        originY: "top",
                        opacity: 1
                    });
                }
            };

            var addNoise = function () {
                fabric.loadSVGFromURL('../assets/img/noise.svg', function (objects, options) {
                    noise = fabric.util.groupSVGElements(objects, options);
                    var imgHeight = noise.height * 0.8 * scaleIndex;
                    noise.scale(0.8 * scaleIndex);
                    canvas.add(noise.set({
                        left: width / 2 - 400 * scaleIndex,
                        top: height / 2 - imgHeight / 2,
                        originX: "left",
                        originY: "top",
                        opacity: 0
                    }));

                    noise.animate('opacity', 1, {
                        duration: 1000,
                        easing: fabric.util.ease.easeInOutExpo,
                        onComplete: function () {
                        }
                    });

                });
            };

            var reinitNoise = function () {
                if(noise) {
                    var imgHeight = noise.height * 0.8 * scaleIndex;
                    noise.scale(0.8 * scaleIndex);
                    noise.set({
                        left: width / 2 - 400 * scaleIndex,
                        top: height / 2 - imgHeight / 2,
                    });
                }
            };

            var addLittleTopImg = function () {
                fabric.loadSVGFromURL('../assets/img/top-thing.svg', function (objects, options) {

                    topImg = fabric.util.groupSVGElements(objects, options);
                    var imgHeight = topImg.height * 0.55 * scaleIndex;
                    topImg.scale(0.5 * scaleIndex);
                    canvas.add(topImg.set({
                        left: width / 2,
                        top: -imgHeight,
                        originX: "left",
                        originY: "top",
                        'opacity': 0
                    }));

                    topImg.animate({
                        'top': 0,
                        'opacity': 1
                    }, {
                        duration: 1000,
                        easing: fabric.util.ease.easeOutBounce,
                        onComplete: function () {
                        }
                    });

                });
            };

            var reinitLittleTopImg = function () {
                if(topImg) {
                    topImg.scale(0.5 * scaleIndex);
                    topImg.set({
                        left: width / 2,
                    });
                }
            };

            var addMouse = function () {
                fabric.loadSVGFromURL('../assets/img/mouse.svg', function (objects, options) {
                    mouse = fabric.util.groupSVGElements(objects, options);
                    canvas.add(mouse.set({
                        left: width / 2,
                        top: height - 160 * scaleIndex,
                        originX: "center",
                        originY: "center"
                    }));
                });

                movingMouseCircle = new MovingMouseCircle({
                    left: width / 2,
                    top: height - 155 * scaleIndex,
                    radius: 2,
                    fill: '#000',
                    index: 2,
                    originX: "center",
                    originY: "center"
                }, 500, 1000);
                canvas.add(movingMouseCircle);
                setTimeout(function () {
                    movingMouseCircle.animateTopAndBack();
                }, 2000);
            };

            var reinitMouse = function () {
                if(!mouse) return;
                mouse.set({
                    left: width / 2,
                    top: height - 160 * scaleIndex,
                });
                movingMouseCircle.set({
                    left: width / 2,
                    top: height - 155 * scaleIndex,
                });
            };

            var addLittleCirclesInCenter = function () {
                var def = new $.Deferred;
                var baseDelay = 15000; //время между началом движения обратно и повторного движения
                var delayAnimationOnStart = 5000;//после загрузки через 5с. начинается анимация
                var circle;
                //fabric.Image.fromURL('../assets/img/littleCenterCircle.svg', function (icircle) {
                fabric.loadSVGFromURL('../assets/img/littleCenterCircle.svg', function(objects, options) {
                    var icircle = fabric.util.groupSVGElements(objects, options);
                    icircle.scale(1.53 * scaleIndex);
                    circle = icircle;
                    def.resolve();
                });

                $.when(def).done(function () {
                    circlesAr = [];
                    circlesAr.push(circle);
                    for (var i = 0; i < 4; i++) {
                        circlesAr.push(fabric.util.object.clone(circle));
                    }

                    var mLCircle = new MovingLittleCircle(canvas, width, height, circlesAr[0], 8, 0, baseDelay + 9000, baseDelay, reksoftImgHeight);
                    var mLCircle2 = new MovingLittleCircle(canvas, width, height, circlesAr[1], 16, 1000, baseDelay + 8000, baseDelay, reksoftImgHeight);
                    var mLCircle3 = new MovingLittleCircle(canvas, width, height, circlesAr[2], 24, 2000, baseDelay + 7000, baseDelay, reksoftImgHeight);
                    var mLCircle4 = new MovingLittleCircle(canvas, width, height, circlesAr[3], 32, 3000, baseDelay + 6000, baseDelay, reksoftImgHeight);
                    var mLCircle5 = new MovingLittleCircle(canvas, width, height, circlesAr[4], 40, 4000, baseDelay + 5000, baseDelay, reksoftImgHeight);

                    var mLCirclesAr = [mLCircle, mLCircle2, mLCircle3, mLCircle4, mLCircle5];

                    setTimeout(function () {
                        animateLittleCircles(mLCirclesAr);
                    }, delayAnimationOnStart);

                    $(window).on("little-circles-restart-animation", function () {
                        animateLittleCircles(mLCirclesAr);
                    });
                });

                function animateLittleCircles(mLCirclesAr) {
                    mLCirclesAr[0].animate(1);
                    mLCirclesAr[1].animate();
                    mLCirclesAr[2].animate();
                    mLCirclesAr[3].animate();
                    mLCirclesAr[4].animate();
                }

            };

            var reinitLittleCirclesInCenter = function () {
                for (var i = 0; i <= 4; i++) {
                    if(circlesAr && circlesAr[i]) {
                        circlesAr[i].scale(1.53 * scaleIndex);
                        circlesAr[i].set({
                            left: width / 2,
                            top: height / 2 - reksoftImgHeight / 2,
                        });
                    }
                }
            };

            var addIeroglifsLeft = function () {
                //x1,y1,x2,y2,yLine2
                var angle = 125;
                var length = 1;
                var x1 = width / 2;
                var y1 = height / 2 - reksoftImagePadding - reksoftImgHeight - paddingFromLogoToHorLine * scaleIndex;
                var x2 = x1 + length * Math.cos(Math.PI * angle / 180.0);
                var y2 = y1 + length * Math.sin(Math.PI * angle / 180.0);
                var xIntersection = getLinesIntersectionByTwoCoord(x1, y1, x2, y2, height - height / 3.3);
                var ierLeft = xIntersection + 10 * scaleIndex;
                var ierTop = height - height / 3.3;

                //fabric.Image.fromURL('../assets/img/ieroglifsBase.svg', function (img) {
                fabric.loadSVGFromURL('../assets/img/ieroglifsBase.svg', function(objects, options) {
                    ieroglifsLeftImg = fabric.util.groupSVGElements(objects, options);
                    ieroglifsLeftImg.scale(0.8 * scaleIndex);
                    canvas.add(ieroglifsLeftImg.set({
                        left: ierLeft ,
                        top: ierTop,
                        originX: "left",
                        originY: "top",
                        opacity: 0,
						angle: (angle-90)
                    }));
                    //плавное появление
                    ieroglifsLeftImg.animate('opacity', 100, {
                        duration: 1000,
                        easing: fabric.util.ease.easeInOutExpo,
                        onComplete: function () {
                        }
                    });

                });

                blinkingIeroglifLeft = new BlinkingImg(canvas, width, height, '../assets/img/ieroglifs1.svg', 4000, ierLeft, ierTop, scaleIndex, angle);
                blinkingIeroglifLeft1 = new BlinkingImg(canvas, width, height, '../assets/img/ieroglifs3.svg', 5000, ierLeft, ierTop, scaleIndex, angle);
                blinkingIeroglifLeft2 = new BlinkingImg(canvas, width, height, '../assets/img/ieroglifs4.svg', 7000, ierLeft, ierTop, scaleIndex, angle);
            };

            var reinitIeroglifsLeft = function () {
                var angle = 125;
                var length = 1;
                var x1 = width / 2;
                var y1 = height / 2 - reksoftImagePadding - reksoftImgHeight - paddingFromLogoToHorLine * scaleIndex;
                var x2 = x1 + length * Math.cos(Math.PI * angle / 180.0);
                var y2 = y1 + length * Math.sin(Math.PI * angle / 180.0);
                var xIntersection = getLinesIntersectionByTwoCoord(x1, y1, x2, y2, height - height / 3.3);
                var ierLeft = xIntersection + 10 * scaleIndex;
                var ierTop = height - height / 3.3;
                ieroglifsLeftImg && ieroglifsLeftImg.set({
                    left: ierLeft,
                    top: ierTop,
                    angle: (angle-90)
                });
                blinkingIeroglifLeft && blinkingIeroglifLeft.reinit(ierLeft, ierTop);
                blinkingIeroglifLeft1 && blinkingIeroglifLeft1.reinit(ierLeft, ierTop);
                blinkingIeroglifLeft2 && blinkingIeroglifLeft2.reinit(ierLeft, ierTop);
            };

            var addIeroglifsRight = function () {
                //x1,y1,x2,y2,yLine2
                var angle = 55;
                var length = 1;
                var x1 = width / 2;
                var y1 = height / 2 - reksoftImagePadding - reksoftImgHeight - paddingFromLogoToHorLine * scaleIndex;
                var x2 = x1 + length * Math.cos(Math.PI * angle / 180.0);
                var y2 = y1 + length * Math.sin(Math.PI * angle / 180.0);
                var xIntersection = getLinesIntersectionByTwoCoord(x1, y1, x2, y2, height - height / 3.4);
                var ierLeft = xIntersection - 15 * scaleIndex;
                var ierTop = height - height / 3.4;

                //fabric.Image.fromURL('../assets/img/ieroglifs2Base.svg', function (img) {
                fabric.loadSVGFromURL('../assets/img/ieroglifs2Base.svg', function(objects, options) {
                    ieroglifsRightImg = fabric.util.groupSVGElements(objects, options);
                    ieroglifsRightImg.scale(0.8 * scaleIndex);
                    canvas.add(ieroglifsRightImg.set({
                        left: ierLeft,
                        top: ierTop,
						originX: "left",
						originY: "top",
                        opacity: 0,
						angle: (angle-90)
                    }));
                    //плавное появление
                    ieroglifsRightImg.animate('opacity', 100, {
                        duration: 1000,
                        easing: fabric.util.ease.easeInOutExpo,
                        onComplete: function () {
                        }
                    });

                });

                blinkingIeroglif = new BlinkingImg(canvas, width, height, '../assets/img/ieroglifs21.svg', 6000, ierLeft, ierTop, scaleIndex, angle);
            };

            var reinitIeroglifsRight = function () {
                var angle = 55;
                var length = 1;
                var x1 = width / 2;
                var y1 = height / 2 - reksoftImagePadding - reksoftImgHeight - paddingFromLogoToHorLine * scaleIndex;
                var x2 = x1 + length * Math.cos(Math.PI * angle / 180.0);
                var y2 = y1 + length * Math.sin(Math.PI * angle / 180.0);
                var xIntersection = getLinesIntersectionByTwoCoord(x1, y1, x2, y2, height - height / 3.4);
                var ierLeft = xIntersection - 15 * scaleIndex;
                var ierTop = height - height / 3.4;
                ieroglifsRightImg && ieroglifsRightImg.set({
                    left: ierLeft,
                    top: ierTop,
                    angle: (angle-90)
                });
                blinkingIeroglif && blinkingIeroglif.reinit(ierLeft, ierTop);
            };

            var addMountainCircles = function () {
                var proportiponalParam = width / 1920;//1920 - ширина гор
                var proportionalHeight = 322 * proportiponalParam;
                var showTop = height - proportionalHeight / 2.5;

                movingCircle1 = new MovingCircle({
                    left: width / 6.3,
                    top: height,
                    radius: 10 * scaleIndex,
                    fill: '#00C7C0',
                    index: 2,
                    opacity: 0.3
                }, showTop, canvas, scaleIndex, 0.7);
                canvas.add(movingCircle1);
                $.when(movingCircle1.slideToPosition()).done(function () {
                    movingCircle1.moveTop();
                });

                showTop = height - proportionalHeight / 4;
                movingCircle2 = new MovingCircle({
                    left: width / 2.35,
                    top: height,
                    radius: 10 * scaleIndex,
                    fill: '#00C7C0',
                    index: 2,
                    opacity: 0.3
                }, showTop, canvas, scaleIndex, 0.4);
                canvas.add(movingCircle2);
                $.when(movingCircle2.slideToPosition()).done(function () {
                    movingCircle2.moveBack();
                });

                movingCircle3 = new MovingCircle({
                    left: width / 1.7,
                    top: height,
                    radius: 30 * scaleIndex,
                    fill: '#00C7C0',
                    index: 2,
                    opacity: 0.3
                }, showTop, canvas, scaleIndex, 1);
                canvas.add(movingCircle3);
                $.when(movingCircle3.slideToPosition()).done(function () {
                    movingCircle3.moveTop();
                });

                movingCircle4 = new MovingCircle({
                    left: width - width / 8,
                    top: height,
                    radius: 10 * scaleIndex,
                    fill: '#00C7C0',
                    index: 2,
                    opacity: 0.3
                }, showTop, canvas, scaleIndex, 0.8);
                canvas.add(movingCircle4);
                $.when(movingCircle4.slideToPosition()).done(function () {
                    movingCircle4.moveBack();
                });
            };

            var reinitMountainCircles = function () {
                var proportiponalParam = width / 1920;//1920 - ширина гор
                var proportionalHeight = 322 * proportiponalParam;
                var showTop = height - proportionalHeight / 2.5;
                if(movingCircle1) {
                    movingCircle1.reinit(showTop, scaleIndex);
                    movingCircle1.set({
                        left: width / 6.3,
                        top: showTop,
                        radius: 10 * scaleIndex,
                    });
                }

                showTop = height - proportionalHeight / 4;
                if(movingCircle2) {
                    movingCircle2.reinit(showTop, scaleIndex);
                    movingCircle2.set({
                        left: width / 2.35,
                        top: showTop,
                        radius: 10 * scaleIndex,
                    });
                }

                if(movingCircle3) {
                    movingCircle3.set({
                        left: width / 1.7,
                        top: showTop,
                        radius: 30 * scaleIndex,
                    });
                    movingCircle3.reinit(showTop, scaleIndex);
                }

                if(movingCircle4) {
                    movingCircle4.set({
                        left: width - width / 8,
                        top: showTop,
                        radius: 10 * scaleIndex,
                    });
                    movingCircle4.reinit(showTop, scaleIndex);
                }
            };

            var addSticksAroundCenterCircle = function () {
                var mscaleIndex = 0.65 * scaleIndex;
                fabric.loadSVGFromURL('../assets/img/aroundCircle0.svg', function(objects, options) {
                    sticksAroundCircle0 = fabric.util.groupSVGElements(objects, options);
                    if(sticksAroundCircle0) {
                        sticksAroundCircle0.scale(mscaleIndex);
                        canvas.add(sticksAroundCircle0.set({
                            left: width / 2,
                            top: height / 2 - reksoftImgHeight / 2,
                            originX: "center",
                            originY: "center",
                            opacity: 1
                        }));
                    }
                });
                var sticksAroundCircleObj1 = new SticksAroundCircle(canvas, width, height, '../assets/img/aroundCircle.svg', -15, 10, 15, 2000, mscaleIndex, reksoftImgHeight);
                $.when(sticksAroundCircleObj1.loadImg()).done(function () {
                    sticksAroundCircle1 = sticksAroundCircleObj1.getImg();
                });

                var sticksAroundCircleObj2 = new SticksAroundCircle(canvas, width, height, '../assets/img/aroundCircle2.svg', 12, -5, -12, 2000, mscaleIndex, reksoftImgHeight);
                $.when(sticksAroundCircleObj2.loadImg()).done(function () {
                    sticksAroundCircle2 = sticksAroundCircleObj2.getImg();
                });

                setTimeout(function () {
                    sticksAroundCircleObj1.animateTwoDirection();
                    setTimeout(function () {
                        sticksAroundCircleObj2.animateTwoDirection();
                    }, 350);
                }, 6000);

            };

            var reinitSticksAroundCenterCircle = function(){
                var mscaleIndex = 0.65 * scaleIndex;
                if(sticksAroundCircle0) {
                    sticksAroundCircle0.scale(mscaleIndex);
                    sticksAroundCircle0.set({
                        left: width / 2,
                        top: height / 2 - reksoftImgHeight / 2,
                    });
                }
                if(sticksAroundCircle1) {
                    sticksAroundCircle1.scale(mscaleIndex);
                    sticksAroundCircle1.set({
                        left: width / 2,
                        top: height / 2 - reksoftImgHeight / 2,
                    });
                }
                if(sticksAroundCircle2) {
                    sticksAroundCircle2.scale(mscaleIndex);
                    sticksAroundCircle2.set({
                        left: width / 2,
                        top: height / 2 - reksoftImgHeight / 2,
                    });
                }
            };

            var addTriangleCrossCircles = function () {
				var left = width / 2 + 390 * scaleIndex;
				var top = height / 2 + 20 * scaleIndex;
                triangleCrossCircles = new TriangleCrossCircles(canvas, width, height, left, top, 0, 8000, true, scaleIndex);
                triangleCrossCircles2 = new TriangleCrossCircles(canvas, width, height, left, top + 30* scaleIndex, 1, 21000, false, scaleIndex);
                triangleCrossCircles3 = new TriangleCrossCircles(canvas, width, height, left, top + 60* scaleIndex, 2, 33000, true, scaleIndex);
                triangleCrossCircles4 = new TriangleCrossCircles(canvas, width, height, left, top + 90* scaleIndex, 0, 25000, false, scaleIndex);
                triangleCrossCircles5 = new TriangleCrossCircles(canvas, width, height, left, top + 120* scaleIndex, 1, 30000, true, scaleIndex);
            };

            var reinitTriangleCrossCircles = function () {
                var left = width / 2 + 390 * scaleIndex;
                var top = height / 2 + 20 * scaleIndex;
                triangleCrossCircles && triangleCrossCircles.reinit(left, top, scaleIndex);
                triangleCrossCircles2 && triangleCrossCircles2.reinit(left, top + 30* scaleIndex, scaleIndex);
                triangleCrossCircles3 && triangleCrossCircles3.reinit(left, top + 60* scaleIndex, scaleIndex);
                triangleCrossCircles4 && triangleCrossCircles4.reinit(left, top + 90* scaleIndex, scaleIndex);
                triangleCrossCircles5 && triangleCrossCircles5.reinit(left, top + 120* scaleIndex, scaleIndex);
            };

            var addSquaresGroup = function () {
                squaresGroup = new SquaresGroup(canvas, width, height, scaleIndex);
            };

            var reinitSquaresGroup = function () {
                squaresGroup && squaresGroup.reinit(width, scaleIndex);
            };

            var addLeftCircles = function () {
                var left = width / 20;
                leftCircles = new LeftCircles(canvas, width, height, '../assets/img/circles-left.svg', left, scaleIndex, 0.7);
                $.when(leftCircles.loadImg()).done(function () {
                    leftCirclesImg = leftCircles.getImg();
                });
            };

            var reinitLeftCircles = function () {
                var left = width / 20;
                var curImgScale = 0.7;
                if(leftCirclesImg) {
                    var imgHeight = leftCirclesImg.height * scaleIndex;
                    leftCirclesImg.scale(curImgScale * scaleIndex);
                    leftCirclesImg.set({
                        left: left,
                        top: height / 2 - imgHeight * curImgScale / 2 - 20 * scaleIndex,
                    });
                    leftCircles.reinit(height, scaleIndex);
                    leftCircles.reinitLinesToLeftCircles();
                }
            };

            var addRightCircle = function () {
                var left = width / 1.26;
				if(CommonAnimation.getResolution() != "desktop_sm1") {
					left = width / 1.23;
				}
                var top = height / 2 + 100 * scaleIndex;

                rightCircle = new fabric.Circle({
                    radius: 120 * scaleIndex,
                    fill: '',
                    stroke: '#F1737A',
                    strokeWidth: 1,
                    top: top,
                    left: width,
                    opacity: 0
                });
                canvas.add(rightCircle);
                rightCircle.animate({
                    'left': left, //width - 400, //
                    'opacity': 0.5
                }, {
                    duration: 1000,
                    easing: fabric.util.ease.easeOutBounce,
                    onComplete: function () {
                       circulatingImgs = new CirculatingImg(canvas, '../assets/img/arcRightCircle.svg',
                            '../assets/img/circleRightCircle.svg', left, top, scaleIndex);

                        $.when(circulatingImgs.loadCircle(), circulatingImgs.loadArc()).done(function () {
                            setTimeout(function () {
                                circulatingImgs.animateCircle();
                            }, 4000);
                        });

                    }
                });

            };

            var reinitRightCircle = function () {
                var left = width / 1.26;
                if(CommonAnimation.getResolution() != "desktop_sm1") {
                    left = width / 1.23;
                }
                var top = height / 2 + 100 * scaleIndex;
                rightCircle&& rightCircle.set({
                    radius: 120 * scaleIndex,
                    top: top,
                    left: left,
                });
                if(circulatingImgs) {
                    var circle = circulatingImgs.getCircle();
                    var arc = circulatingImgs.getArc();
                    circle.scale(0.6 * scaleIndex);
                    circle.set({
                        left: left,
                        top: top,
                    });
                    arc.scale(0.6 * scaleIndex);
                    arc.set({
                        left: left,
                        top: top,
                    });
                }
            };

            var addZigzags = function () {
                zigzags = new Zigzags(canvas, width, scaleIndex);
            };

            var reinitZigzags = function () {
                zigzags && zigzags.reinit(width, scaleIndex);
            };

            //lines intersection with y=0 (desktop top)
            //yLine2 - это уравнение прямой, с которой ищем пересечение (y=0 или y=240)
            var getLinesIntersectionByTwoCoord = function (x1, y1, x2, y2, yLine2) {
                var k = (y1 - y2) / (x1 - x2);
                var b = y2 - k * x2;
                return (-b + yLine2) / k;
            };

            /* var setScaleIndexOrientationChange = function () {
                //в этот момент еще старый класс ориентации
                if ($("html").hasClass("desktop") || ($("html").hasClass("tablet") && !$("html").hasClass("landscape"))) {
                    scaleIndex = 1;
                } else {
                    scaleIndex = 1.1;
                }
            };*/

            var addClounds = function () {
                var cloudL1 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_green1.svg',
                    imgScaleParam: 0.7,
                    imgLeft: 430,
                    imgTop: height * 0.1,
                    animationSpeed: 300000,
                    scaleIndex: scaleIndex,
                    linear: CommonAnimation.linear
                });
                var cloudL2 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_green2.svg',
                    imgScaleParam: 0.6,
                    imgLeft: 240,
                    imgTop: height * 0.2,
                    animationSpeed: 180000,
                    scaleIndex: scaleIndex,
                    linear: CommonAnimation.linear
                });
                var cloudL3 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_pale1.svg',
                    imgScaleParam: 0.7,
                    imgLeft: 220,
                    imgTop: height * 0.15,
                    animationSpeed: 500000,
                    scaleIndex: scaleIndex,
                    linear: CommonAnimation.linear
                });
                //right
                var cloudR1 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_pale1.svg',
                    imgScaleParam: 1.4,
                    imgLeft: width / 2 + 400,
                    imgTop: height * 0.15,
                    animationSpeed: 500000,
                    scaleIndex: scaleIndex,
                    linear: CommonAnimation.linear,
                    angle: -180
                });
                var cloudR2 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_pale1.svg',
                    imgScaleParam: 1.1,
                    imgLeft: width / 2 + 600,
                    imgTop: height * 0.1,
                    animationSpeed: 300000,
                    scaleIndex: scaleIndex,
                    linear: CommonAnimation.linear
                });
                var cloudR3 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_green3.svg',
                    imgScaleParam: 0.6,
                    imgLeft: width / 2 + 700,
                    imgTop: height * 0.2,
                    animationSpeed: 180000,
                    scaleIndex: scaleIndex,
                    linear: CommonAnimation.linear
                });
            };

            var drawArcs = function () {
                movingArcBottom = new MovingArc({
                    radius: radiusPlus - 25,
                    left: canvas.getWidth() / 2,
                    top: canvas.getHeight() / 2 - reksoftImgHeight / 2,
                    angle: 0,
                    startAngle: Math.PI * 50 / 180.0,
                    endAngle: Math.PI * 130 / 180.0,
                    stroke: '#FF8B8B',
                    strokeWidth: 1,
                    fill: '',
                    originX: 'center',
                    originY: 'center',
                    duration: 5000,
                    opacity: 0
                });
                canvas.add(movingArcBottom);
                movingArcBottom.animate('opacity', 0.5, {
                    duration: 1000,
                    easing: CommonAnimation.linear,
                    onComplete: function () {
                    }
                });
                movingArcBottom.animateTwoDirections();

                movingArcBottom2 = new MovingArc({
                    radius: radiusPlus - 25,
                    left: canvas.getWidth() / 2,
                    top: canvas.getHeight() / 2 - reksoftImgHeight / 2,
                    angle: 0,
                    startAngle: Math.PI * 160 / 180.0,
                    endAngle: Math.PI * 250 / 180.0,
                    stroke: '#FF8B8B',
                    strokeWidth: 1,
                    fill: '',
                    originX: 'center',
                    originY: 'center',
                    duration: 5000,
                    opacity: 0
                });
                canvas.add(movingArcBottom2);
                movingArcBottom2.animate('opacity', 0.5, {
                    duration: 1000,
                    easing: CommonAnimation.linear,
                    onComplete: function () {
                    }
                });
                movingArcBottom2.animateTwoDirections();

                movingArcBottom3 = new MovingArc({
                    radius: radiusPlus - 25,
                    left: canvas.getWidth() / 2,
                    top: canvas.getHeight() / 2 - reksoftImgHeight / 2,
                    angle: 0,
                    startAngle: Math.PI * 290 / 180.0,
                    endAngle: Math.PI * 20 / 180.0,
                    stroke: '#FF8B8B',
                    strokeWidth: 1,
                    fill: '',
                    originX: 'center',
                    originY: 'center',
                    duration: 5000,
                    opacity: 0
                });
                canvas.add(movingArcBottom3);
                movingArcBottom3.animate('opacity', 0.5, {
                    duration: 1000,
                    easing: CommonAnimation.linear,
                    onComplete: function () {
                    }
                });
                movingArcBottom3.animateTwoDirections();

            };

            var reinitArcs = function() {
                movingArcBottom && movingArcBottom.set({
                    radius: radiusPlus - 25,
                    left: canvas.getWidth() / 2,
                    top: canvas.getHeight() / 2 - reksoftImgHeight / 2,
                });

                movingArcBottom2 && movingArcBottom2.set({
                    radius: radiusPlus - 25,
                    left: canvas.getWidth() / 2,
                    top: canvas.getHeight() / 2 - reksoftImgHeight / 2,
                });

                movingArcBottom2 && movingArcBottom3.set({
                    radius: radiusPlus - 25,
                    left: canvas.getWidth() / 2,
                    top: canvas.getHeight() / 2 - reksoftImgHeight / 2,
                });
            };

            var drawCircles = function () {
                //рисуем 4 орбиты
                for (var i = 1; i < 4; i++) {
                    createOrbit(i);
                }

                drawArcs();
            };

            var createOrbit = function (i) {
                var opacityL = [0, 0.5, 0.7, 1];
                //radiusPlus = 0;
                orbits[i] = new fabric.Circle({
                    radius: orbitRadiusBase * ( i * 0.5) + radiusPlus,
                    left: canvas.getWidth() / 2,
                    top: canvas.getHeight() / 2 - reksoftImgHeight / 2 - (orbitRadiusBase * (i * 0.5) + radiusPlus),
                    fill: '',
                    stroke: 'rgba(255,139,139, 0.9)',
                    hasBorders: false,
                    hasControls: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    index: i,
                    opacity: 0,
                    // originX: 'left',
                    originY: 'top'
                });
                canvas.add(orbits[i]);

                orbits[i].animate('opacity', opacityL[i], {
                    duration: 1000,
                    easing: CommonAnimation.linear,
                    onComplete: function () {
                    }
                });
            };

            var redrawCircles = function(){
                for (var i = 1; i < 4; i++) {
                    orbits[i] && orbits[i].set({
                        radius: orbitRadiusBase * ( i * 0.5) + radiusPlus,
                        left: canvas.getWidth() / 2,
                        top: canvas.getHeight() / 2 - reksoftImgHeight / 2 - (orbitRadiusBase * (i * 0.5) + radiusPlus),
                    });
                }
            };

            var addPlanets = function () {
                var planetLoader = new RotatingImg(
                    canvas,
                    (canvas.getWidth() / 2) - radiusPlus - (planetSize * 1),
                    canvas.getHeight() / 2,
                    CommonAnimation.linear, 3000);

                $.when(planetLoader.loadImg()).done(function () {
                    planet0 = planetLoader.getImg();
                    animatePlanet(planet0, 1);
                });

                planet1 = new fabric.Circle({
                    left: (canvas.getWidth() / 2) - radiusPlus - (planetSize * 1),
                    top: canvas.getHeight() / 2,
                    radius: 5,
                    fill: '#005C53',
                    index: 2,
                    opacity: 0
                });
                canvas.add(planet1);

                animatePlanet(planet1, 2);
                planet1.animate('opacity', 1, {
                    duration: 500,
                    easing: CommonAnimation.linear,
                    onComplete: function () {
                    }
                });

                planet2 = new RotatingObject({
                    left: (canvas.getWidth() / 2) - radiusPlus - (planetSize * 1),
                    top: canvas.getHeight() / 2,
                    width: 14,
                    height: 14,
                    fill: '#025B56',
                    index: 3,
                    opacity: 0,
                    hasBorders: false,
                    hasControls: false
                }, CommonAnimation.linear, 2000);

                canvas.add(planet2);

                planet2.animate('opacity', 1, {
                    duration: 500,
                    easing: CommonAnimation.linear,
                    onComplete: function () {
                    }
                });
                animatePlanet(planet2, 3);
            };

            var reinitPlanets = function(){
                planet0 && planet0.set({
                    left: (canvas.getWidth() / 2) - radiusPlus - (planetSize * 1),
                    top: canvas.getHeight() / 2
                });
            };

            var animatePlanet = function (oImg, planetIndex) {
                // randomize starting angle to avoid planets starting on one line
                var startAngle = fabric.util.getRandomInt(-180, 0);
                var endAngle = startAngle + 359;
                // speed of rotation slows down for further planets
                var duration = (planetIndex + 1) * rotationSpeed;

                (function animate() {
                    fabric.util.animate({
                        startValue: startAngle,
                        endValue: endAngle,
                        duration: duration,
                        // linear movement
                        easing: function (t, b, c, d) {
                            return c * t / d + b;
                        },
                        onChange: function (angle) {
                            var radius = (0.5 * planetIndex) * orbitRadiusBase + radiusPlus;
                            // rotate around reksoft image center
                            var cx = canvas.getWidth() / 2;
                            var cy = canvas.getHeight() / 2 - reksoftImgHeight / 2;

                            angle = fabric.util.degreesToRadians(angle);
                            var x = cx + radius * Math.cos(angle);
                            var y = cy + radius * Math.sin(angle);
                            oImg.set({
                                left: x,
                                top: y
                            }).setCoords();
                            // only render once
                            if (planetIndex === totalPlanets - 1) {
                                canvas.renderAll();
                            }
                        },
                        onComplete: animate
                    });
                })();
            };

            return {
                init: init
            };

        })();

        return ReksoftBlockDesigner;

    });

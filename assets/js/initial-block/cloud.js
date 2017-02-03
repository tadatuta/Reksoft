define([], function () {
	//canvas, width, url, imgScaleParam, imgLeft, imgTop, animationSpeed, scaleIndex, linear
	var Cloud = function (settings) {
		var self = this;
		this.settings = settings;
		this.bindUIEvents();

		fabric.loadSVGFromURL(this.settings.url, function(objects, options) {
			var cloudImg = fabric.util.groupSVGElements(objects, options);
			cloudImg.scale(self.settings.imgScaleParam * self.settings.scaleIndex);
			self.settings.canvas.add(cloudImg.set({
				left: self.settings.imgLeft,
				top: self.settings.imgTop,
				originX: "center",
				originY: "center",
				angle: self.settings.angle
			}));
			self.cloudImg = cloudImg;
		});

	};

	Cloud.prototype.animate = function () {
		this.cloudImg.animate('left', '-=' + this.settings.width, {
			duration: this.settings.animationSpeed,
			easing: this.settings.linear
		});
	};

	Cloud.prototype.bindUIEvents = function () {
		var self = this;
		$(window).on("logo-loaded", function(){
			setTimeout(function(){
				self.animate();
			}, 1000);
		});

	};

	return Cloud;

});
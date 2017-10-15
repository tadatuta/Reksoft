define(['fabric'], function (fabric) {

	var RotatingImg = function (canvas, left, top, linearEasing, duration) {
		this.canvas = canvas;
		this.left = left;
		this.top = top;
		this.linear = linearEasing;
		this.duration = duration;
		//this.loadImg(canvas, left, top);
	};

	RotatingImg.prototype.loadImg = function () {
		var def = new $.Deferred;
		var self = this;

		fabric.loadSVGFromURL('../assets/img/cilindre.svg', function (objects, options) {
			var img = fabric.util.groupSVGElements(objects, options);
			img.scale(0.2);
			self.canvas.add(img.set({
				left: self.left,
				top: self.top,
				originX: "center",
				originY: "center",
				opacity: 0
			}));

			//плавное появление
			img.animate('opacity', 1, {
				duration: 500,
				easing: self.linear,
				onComplete: function () {
				}
			});

			self.img = img;
			self.rotate();
			def.resolve();
		});
		return def;
	};

	RotatingImg.prototype.rotate = function () {
		var self=this;
		self.img.animate('angle', "=720", {
			duration: this.duration*2,
			easing: this.linear,
			onComplete: function () {
				self.rotate()
			}
		});
	};

	RotatingImg.prototype.getImg = function () {
		return this.img;
	};

	return RotatingImg;

});
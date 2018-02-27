define(['fabric'], function (fabric) {

	var FullScreenLines = function (settings) {
		this.settings = settings;
	};

	FullScreenLines.prototype.drawAnimatedHorizontalLine = function(angle, x1, y1){
		var self = this;
		var horizontalLine = new fabric.Line([ x1, y1, x1, y1 ], {
			strokeWidth: 1,
			fill: 'red',
			stroke: '#F28B91',
			originX: 'center',
			originY: 'center'
		});
		this.settings.canvas.add(horizontalLine);

		fabric.util.animate({
			startValue: 0,
			endValue: 4000,
			duration: this.settings.duration + 100,
			onChange: function(value) {
				horizontalLine.set({ x2: x1 - value * Math.cos(Math.PI * angle / 180.0), y2: self.settings.height / 2  });
				self.settings.canvas.renderAll();
			},
			onComplete: function() {
			}
		});
		return horizontalLine;
	};


	FullScreenLines.prototype.drawAnimatedDiagonalLine = function(angle, x1, y1){
		var self = this;
		var diagonalLine = new fabric.Line([ x1, y1, x1, y1 ], {
			strokeWidth: 1,
			fill: 'red',
			stroke: '#F28B91',
			originX: 'center',
			originY: 'center'
		});
		this.settings.canvas.add(diagonalLine);

		fabric.util.animate({
			startValue: 0,
			endValue: 4000,
			duration: this.settings.duration,
			onChange: function(value) {
                diagonalLine.set({ x2: x1 + value * Math.cos(Math.PI * angle / 180.0), y2: value * Math.sin(Math.PI * angle / 180.0)  });
				self.settings.canvas.renderAll();
			},
			onComplete: function() {
			}
		});
		return diagonalLine;
	};


	return FullScreenLines;

});
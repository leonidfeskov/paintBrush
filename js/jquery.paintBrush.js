/*
 * jQuery Paint Brush v1.0.0
 *
 * Copyright 2016-2016 Leonid Feskov
 *
 * Date: 2016.06.30
 *
 */

(function($){
	$.fn.paintBrush = function(options){
		var settings = $.extend({
			color: '#fff'
		}, options);

		var elem = this;
		var width = elem.outerWidth();
		var height = elem.outerHeight();

		function createCanvas() {
			var canvas = {};
			canvas.node = document.createElement('canvas');
			canvas.context = canvas.node.getContext('2d');

			elem.append(canvas.node);
			canvas.node.style.backgroundColor = 'transparent';
			canvas.node.style.position = 'absolute';
			canvas.node.style.left = 0;
			canvas.node.style.top = 0;
			
			canvas.node.width  = width;
			canvas.node.height = height;
			return canvas;
		}

		var canvas = createCanvas();
		if (!canvas) return this;
		var ctx = canvas.context;

		ctx.clearTo = function() {
			ctx.fillStyle = settings.color;
			ctx.fillRect(0, 0, width, height);
		};

		ctx.fillCircle = function(x, y, radius) {
			this.fillStyle = '#ff0000';
			this.beginPath();
			this.moveTo(x, y);
			this.arc(x, y, radius, 0, Math.PI * 2, false);
			this.fill();
		};
		
		ctx.eraserAnimate = function(){
			ctx.fillCircle(x, y, radius);
			x+=dx;
			y+=dy;

			if (x < 0 || x > width) {
				y+=radius;
				dx = -dx;
				dy = -dy;
			} else if (y < 0 || y > height) {
				x+=radius*3;
				dx = -dx;
				dy = -dy;
			}

			if (x > width) x = width;
			if (y > height) y = height;

			if (y >= height && x >= width) {
				clearInterval(eraserInterval);
			}
		};

		ctx.clearTo();

		var radius = parseInt(width/6, 0);
		var speed = parseInt(radius/5, 0);
		ctx.globalCompositeOperation = 'destination-out';

		var x = 0;
		var y = parseInt(speed/3, 0);
		var dx = speed;
		var dy = -y;
		var eraserInterval;

		this.css('opacity', 1);
		eraserInterval = setInterval(ctx.eraserAnimate, 5);

		return this;
	};
})(jQuery);
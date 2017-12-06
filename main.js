var holder = document.getElementById('holder');
var slogan = document.getElementById('slogan');
var x=0;
function scrollDown(){
	if (x<-13000) {
		return false;
	}
	x = x-221;
	holder.style.backgroundPositionY = x+'px';
}
function scrollUp(){
	if (x>-1) {
		return false;
	}
	x = x+221;
	holder.style.backgroundPositionY = x+'px';
};
var preventer = 0;
var dragScroll = document.getElementById('drag-scroll');
var dragStick = document.getElementById('drag-stick');
var counter = 0;
var youtube;
var flash = document.getElementById('flash');
var highlight = document.getElementById('highlight');
var close = document.getElementById('close-ad');
var cover = document.getElementById('cover');
function addYoutube(){
	youtube = document.createElement('iframe');
	youtube.setAttribute('id', 'youtube');
	youtube.setAttribute('src', 'https://www.youtube.com/embed/9xKR8Vcjias?autoplay=1');
	youtube.setAttribute('frameborder', '0');
	var container = document.getElementById('container');
	container.appendChild(youtube);
};
function removeYoutube(){
	container.removeChild(youtube);
};
addYoutube();
dragStick.onmousedown = function(e){
	var dragStickCoords = getCoords(dragStick);
	var shiftY = e.pageY - dragStickCoords.top;
	var dragScrollCoords = getCoords(dragScroll);
	document.onmousemove = function(e) {
		if(document.getElementById('youtube')){
			removeYoutube();
		}
		var currentTop = parseInt(dragStick.style.top);
		var newTop = e.pageY - shiftY - dragScrollCoords.top;
		if (newTop<0) {
			newTop = 0;
		}
		var bottomEdge = dragScroll.offsetHeight - dragStick.offsetHeight;
		if (newTop > bottomEdge) {
			newTop = bottomEdge;
		}
		if(currentTop>newTop){
			counter=counter+1.5;
			if(counter>3){
			 	scrollUp();
			 	counter = 0;
			}
		}else if (currentTop<newTop){
			counter=counter+1.5;
			if(counter>3){
				scrollDown();
				counter=0;
			}
		}
		if(24>newTop&&newTop>0){
			preventer = 0;
			cover.style.visibility = 'hidden';
			if (slogan.innerHTML !=='Rethink what a phone can do') {
				slogan.style.opacity = '0.1';
				slogan.innerHTML = 'Rethink what a phone can do';
				fadeIn(slogan);
			}
		} else if (68>newTop&&newTop>24){
			preventer = 0;
			cover.style.visibility = 'hidden';
			if (newTop==25){
				rain()
			}
			if (slogan.innerHTML !=='Water and dust resistant: Real world ready') {
				slogan.style.opacity = '0.1';
				slogan.innerHTML = 'Water and dust resistant: Real world ready';
				fadeIn(slogan)
			}
		} else if (145>newTop&&newTop>68){
			preventer = 0;
			cover.style.visibility = 'hidden';
			if (slogan.innerHTML !=='Capture picture perfect moments in all conditions') {
				slogan.style.opacity = '0.1';
				slogan.innerHTML = 'Capture picture perfect moments in all conditions';
				fadeIn(slogan);
			}
		} else if (190>newTop&&newTop>145){
			cover.style.visibility = 'hidden';
			if (slogan.innerHTML !=='Expandable memory: Fit more <br>of that you love') {
				slogan.style.opacity = '0.1';
				slogan.innerHTML = 'Expandable memory: Fit more <br>of that you love';
				fadeIn(slogan)
			}
		}
		if (newTop==0){
			if(!document.getElementById('youtube')){
				addYoutube();
			}
			holder.style.backgroundPositionY = 0+'px';
		} else if (newTop==190) {
			highlighting();
			holder.style.backgroundPositionY = -13039+'px';
		}
		if(x==-6630){
			flashlight();
		}
		if (x==-13039){
			cover.style.visibility = 'visible';
		}
		dragStick.style.top = newTop + 'px';
	}
	document.onmouseup = function(){
		document.onmousemove = document.onmouseup = null;
	}
	return false;
};
dragStick.ondragstart = function() {
	return false;
}

function getCoords(elem) {
	var box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
};

function fadeIn(element) {
	var op = 0.1;
	var timer = setInterval(function () {
		if (op >= 1){
			clearInterval(timer);
		}
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op += op * 0.1;
	}, 20);
}
function flashlight() {
	flash.style.display ='block';
	setTimeout('flash.style.display ="none"', 200)
}

function highlighting(){
	if (preventer==1){
		return;
	}
	preventer = 1;
	highlight.style.left = '345px';
	highlight.style.visibility = 'visible';
	var timer = setInterval(function(){
		highlight.style.left = parseInt(highlight.style.left)+1+'px';
	}, 5);
	setTimeout(function(){
		clearInterval(timer);
	}, 250);
	setTimeout(function(){
		higlitingReverse();
	}, 250);
}
function higlitingReverse(){
	var timer1 = setInterval(function(){
		highlight.style.left = parseInt(highlight.style.left)-1+'px';
	}, 5);
	setTimeout(function(){
		clearInterval(timer1);
		highlight.style.visibility = 'hidden';
	}, 250);
}
function rain(){
	var timer = setInterval(function(){
		var raindrop = document.createElement('img');
		raindrop.className = 'raindrop';
		var dropImg = Math.floor(Math.random() * (4 - 1)) + 1;
		var dropLeft = Math.floor(Math.random() * (695 - 360)) + 360+'px';
		var dropTop = Math.floor(Math.random() * (200 - 50)) + 50+'px';
		raindrop.style.left = dropLeft;
		raindrop.style.top = dropTop;
		raindrop.src = 'images/raindrop_'+dropImg+'.png'
		container.appendChild(raindrop);
		setTimeout(function(){
			var timer1 = setInterval(function(){
				raindrop.style.top = parseInt(raindrop.style.top)+1+'px';
			}, 10)
			setTimeout(function(){
				raindrop.style.display = 'none';
				clearInterval(timer1);
			}, 500);
		}, 500);
	}, 500);
	setTimeout(function(){
		clearInterval(timer);
	}, 10000);
}
function remove(){
	container.style.display = 'none';
}
close.addEventListener('click', remove)
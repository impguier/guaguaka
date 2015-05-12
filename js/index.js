/*
* author:impGuier
* function:实现，擦除效果；
* logic：
*       1、初始canvas；
*       2、利用canvas的drawImage在canvas上绘制图片；
*       3、判别window内有无touch系列方法，无就赋于mouse系列操作名；
*       4、touchstart / mousedown ，获取鼠标/手势 位置，将起始点移动到目标位置
*       5、绑定 touchmove/mousemove,从start的(x,y)画一条到(x1,y1)的线，把后一个点作为起始点；
*       6、当touchend / mouseUp时，解除事件，然后计算像素值是否被抹掉
*       备注：算像素值是否被抹掉的算法未搞懂啧啧啧…………
* */


//初始canvas
var $canvas = document.getElementById("canvas");
var ctx = $canvas.getContext("2d");

//利用canvas的drawImage在canvas上绘制图片
var img = new Image();
var timeout,totimes = 100,jiange = 10;
$canvas.width = document.getElementById("wrapper").clientWidth;
$canvas.height = document.getElementById("wrapper").clientHeight;
img.src = "images/cover.png";
img.onload = function(){
    ctx.drawImage(img, 0, 0, $canvas.width ,$canvas.height);
    initCanvas();
}

function initCanvas(){
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 100;
    ctx.globalCompositeOperation = "destination-out";
}

//判别window内有无touch系列方法，无就赋于mouse系列操作名；
var canTouch = "ontouchstart" in window ? true : false;
var touchStart = canTouch ? "touchstart" : "mousedown";
var touchMove = canTouch ? "touchmove" : "mousemove";
var touchEnd = canTouch ? "touchend" : "mouseup";

//touchstart / mousedown ，获取鼠标/手势 位置，将起始点移动到目标位置
$canvas.addEventListener(touchStart,function(e){
    e.preventDefault();
    x = canTouch ? e.targetTouches[0].pageX : e.clientX-$canvas.offsetLeft;
    y = y1 = canTouch ? e.targetTouches[0].pageY : e.clientY-$canvas.offsetTop ;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.restore();
    clearTimeout(timeout);

    //绑定 touchmove/mousemove,从start的(x,y)画一条到(x1,y1)的线，把后一个点作为起始点
    $canvas.addEventListener(touchMove,touchMoverHandle);

    $canvas.addEventListener(touchEnd,function(){
        //当touchend / mouseUp时，解除事件，然后计算像素值是否被抹掉
        canvas.removeEventListener(touchMove,touchMoverHandle);
        timeout = setTimeout(function(){
            var imgData = ctx.getImageData(0,0,canvas.width,canvas.height),j=0;
            var dd = 0;
            for(var i=0;i<imgData.width;i+=jiange){
                if(imgData[i] && imgData[i+1] && imgData[i+2] && imgData[i+3]){
                    j++;
                }
            }
            if(j<=canvas.width*canvas.height*0.5){
                clearTimeout(timeout);
                //在这里添加事件
            }
        },300)
    });
});



function touchMoverHandle(e){
    e.preventDefault();
    var x1 = canTouch ? e.targetTouches[0].pageX : e.clientX-$canvas.offsetLeft;
    var y1 = canTouch ? e.targetTouches[0].pageY : e.clientY-$canvas.offsetTop ;
    ctx.save();
    ctx.moveTo(x,y);
    ctx.lineTo(x1,y1);
    ctx.stroke();
    ctx.restore()
    x = x1;
    y = y1;
}



# guaguaka

刮刮卡效果--DEMO

*       1、初始canvas；
*       2、利用canvas的drawImage在canvas上绘制图片；
*       3、判别window内有无touch系列方法，无就赋于mouse系列操作名；
*       4、touchstart / mousedown ，获取鼠标/手势 位置，将起始点移动到目标位置
*       5、绑定 touchmove/mousemove,从start的(x,y)画一条到(x1,y1)的线，把后一个点作为起始点；
*       6、当touchend / mouseUp时，解除事件，然后计算像素值是否被抹掉
*       备注：算像素值是否被抹掉的算法未搞懂啧啧啧…………

也是看到其他同门的代码参照写的，哈……

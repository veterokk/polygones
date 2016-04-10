first= [
{ x: 60,  y: 60  },
{ x: 180, y: 0   },
{ x: 300, y: 60  },
{ x: 300, y: 300 },
{ x: 240, y: 180 },
{ x: 210, y: 180 },
{ x: 180, y: 240 },
{ x: 150, y: 180 },
{ x: 120, y: 180 },
{ x: 60,  y: 300 },
],
second= [
{ x: 30,  y: 240 },
{ x: 330, y: 240 },
{ x: 330, y: 210 },
{ x: 270, y: 90  },
{ x: 210, y: 270 },
{ x: 210, y: 90  },
{ x: 180, y: 60  },
{ x: 150, y: 90  },
{ x: 150, y: 270 },
{ x: 90,  y: 90  },
{ x: 30,  y: 210 }
]

function crossEdgesCommon (x1, y1, x2, y2, x3, y3, x4, y4) {

	function crossEdgesForPerpendicularsWithCommonEnd(x1, y1, x2, y2, x3, y3, x4, y4) {
		var x;
		var y;
		if ((	(((((x1===x2)&&(x1===x3))||((x1===x2)&&(x1===x4))	)||(((y3===y4)&&(y3===y1))||((y3===y4)&&(y3===y2)))))) ||  
			(((((y1===y2)&&(y1===y3))||((y1===y2)&&(y1===y4))	)||(((x3===x4)&&(x3===x1))||((x3===x4)&&(x3===x2)))))) {
			if ((((((x1===x2)&&(x1===x3))||((x1===x2)&&(x1===x4))
				)||(
				((y3===y4)&&(y3===y1))||((y3===y4)&&(y3===y2)))))) 
			{
				x=x1; 
				y=y3;
			};
			
			if (((((y1===y2)&&(y1===y3))||((y1===y2)&&(y1===y4))
				)||(
				((x3===x4)&&(x3===x1))||((x3===x4)&&(x3===x2)))))
			{
				x=x3; 
				y=y1;
			};
			var point =  {x, y};
		}
		return point;
	}; 
	function crossEdges(x1, y1, x2, y2, x3, y3, x4, y4) {
		var	dx1 = x2 - x1;
		var dy1 = y2 - y1;
		var dx2 = x4 - x3;
		var dy2 = y4 - y3;
		var x0 = dy1 * dx2 - dy2 * dx1;

		if(!x0 ||!dx2) {
			return false;
		} else {
			var y0 = x3* y4 - y3 * x4;
			var x = ((x1 * y2 - y1 * x2) * dx2 - y0 * dx1) / x0;
			var y = (dy2 * x - y0) / dx2;
			if (((x1 <= x && x2 >= x) || (x2 <= x && x1 >= x)) && ((x3 <= x && x4 >= x) || (x4 <= x && x3 >= x))) { 
				var point1={x,y};
				return point1;
			} else {
				return false;
			};
		};
	};
	function trueCrossEdgesForPerpendicularsWithCommonEnd(x1, y1, x2, y2, x3, y3, x4, y4) {
		var	dx1 = x2 - x1;
		var dy1 = y2 - y1;
		var dx2 = x4 - x3;
		var dy2 = y4 - y3;
		var x00 = dx1 * dx2 - dy1 * dy2; 
		if ( ((	(((((x1===x2)&&(x1===x3))||((x1===x2)&&(x1===x4))	)||(((y3===y4)&&(y3===y1))||((y3===y4)&&(y3===y2)))))) ||  
			(((((y1===y2)&&(y1===y3))||((y1===y2)&&(y1===y4))	)||(((x3===x4)&&(x3===x1))||((x3===x4)&&(x3===x2)))))) && (x00===0)) {
			return true;
	} else {
		return false;
	};
};
if (trueCrossEdgesForPerpendicularsWithCommonEnd(x1, y1, x2, y2, x3, y3, x4, y4)) {
	return crossEdgesForPerpendicularsWithCommonEnd(x1, y1, x2, y2, x3, y3, x4, y4); 
} else{
	return crossEdges(x1, y1, x2, y2, x3, y3, x4, y4);
};
};

function checkPointInEdge (pointOf, edge) {
	var check;
	dot = [pointOf];
	console.table(dot);
	console.log ('dot[0].x ', dot[0].x );
	if(((dot[0].x==edge[0].x) && (dot[0].y==edge[0].y))||((dot[0].x==edge[1].x) && (dot[0].y==edge[1].y))) {
		check = false;
		return check;
	} else {
		check = true;
		return check;
	};
};

function crossWithOneEdge(fig1, oneEdge) {
	fig1Clone= fig1.slice();
	fig1Clone1=[100];
	for (var i=0; i<fig1.length; i++){
		var pointNumber1 = i;
		if (i<fig1.length-1) {var edge1 = fig1.slice(pointNumber1, i+2);
		} else {
			var edge1 = fig1.slice(pointNumber1).concat(fig1.slice(0,1));
		};
		x1=edge1[0].x;
		y1=edge1[0].y;
		x2=edge1[1].x;
		y2=edge1[1].y;
		x3=oneEdge[0].x;
		y3=oneEdge[0].y;
		x4=oneEdge[1].x;
		y4=oneEdge[1].y;
		if (crossEdgesCommon (x1, y1, x2, y2, x3, y3, x4, y4)) {
			var pointOfCross = crossEdgesCommon (x1, y1, x2, y2, x3, y3, x4, y4);
			var checkResult =checkPointInEdge(pointOfCross, edge1);
			if (checkResult) {
				arrTemp=[pointOfCross];
				edgeTemp=edge1.slice(1);
				edgeNew =arrTemp.concat(edgeTemp);
				fig1Clone1=fig1Clone1.concat(edgeNew);
			} else {
				edge2=edge1.slice(1);
				fig1Clone1=fig1Clone1.concat(edge2);
			} ;
		} else {
			edge2=edge1.slice(1);
			fig1Clone1=fig1Clone1.concat(edge2);
		};
	}
	fig1Clone2=fig1Clone1.slice(1);
	return fig1Clone2;
}

function crossAllEdges(polygone1, polygone2) {
	firstPolygone=polygone1.slice();
	for (var j=0; j<polygone2.length; j++) {
		var pointNumber2 = j;
		if (j<polygone2.length-1) {var edge2 = polygone2.slice(pointNumber2, j+2);
		} else {
			var edge2 = polygone2.slice(pointNumber2).concat(polygone2.slice(0));
		};
		firstPolygone=crossWithOneEdge(firstPolygone,  edge2);	
	};
	resultPoligone = firstPolygone;
	return resultPoligone;
}
crossAllEdges(first, second);


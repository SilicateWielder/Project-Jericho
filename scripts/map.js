var mapReady = false;

var mapMatrix = []
var mapWidth = 0;
var mapHeight = 0;

var view_offset_X = 0;
var view_offset_Y = 0;

var tile_size = 16;

var mapColors = {};
mapColors['default'] = CreateColor(255, 255, 255);
mapColors['road'] = CreateColor(0, 0, 0);
mapColors['residential'] = CreateColor(50, 200, 50);
mapColors['commercial'] = CreateColor(50, 50, 200);
mapColors['industrial'] = CreateColor(200, 50, 50);


function GenerateMapMatrix(width, height) {
	mapWidth = width;
	mapHeight = height;
	
	for(var column = 0; column < width; column++) {
		mapMatrix[column] = [];
		
		for(var row = 0; row < height; row++) {
			mapMatrix[column][row] = {};
		}
	}
	
	mapReady = true;
}

function setOffset(x, y) {
	view_offset_X = x;
	view_offset_Y = y;
}

function renderTile(x, y) {
	var x_min = view_offset_X + x;
	var y_min = view_offset_X + y;
	var x_max = x_min + tile_size;
	var y_max = y_min + tile_size;
	
	Rectangle(x_min, y_min, tile_size, tile_size, mapColors['default']);
}

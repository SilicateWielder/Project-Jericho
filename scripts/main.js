// Initial startup script.
var font = GetSystemFont();

var version = GetVersion();

RequireScript('map.js');

function game() {
	GenerateMapMatrix(255, 255);
	
    while(true) {
			font.drawText(0, 0, "Version: " + version);
			
			renderTile(0, 10);
			
			FlipScreen();
	}
}

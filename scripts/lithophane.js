////////////////////////////////////////////////////////////////////////
//
// Lithophane.js [W.I.P]
// Last revision December 3rd 2023.
//
////////////////////////////////////////////////////////////////////////
//
// The purpose of this class is to render out models to transparent 
// texture assets for billboarding (in terms of graphics), icons, ect.
// 
// It's primary concern is to quickly render individual models rather
// than whole scenes.
//
////////////////////////////////////////////////////////////////////////

function model() {
	this.rad_ratio = (3.14159265 / 180);
	this.verts = [];
	this.quads = [];
	
	this.rot = {
		x: 0,
		y: 0,
		z: 0,
	};
	
	this.pos = {
		x: 0,
		y: 0,
		z: 0,
	}
	
	// A flat-matrix of all vertices.
	// used for measuring required image dimensions once the 
	// projection step is done. Referenced for file rendering for efficiency.
	this.flatMatrix = [];
	this.color = CreateColor(255, 255, 255);
}

////////////////////////////////////////////////////////////////////////
// Defines a vertice of a model 
////////////////////////////////////////////////////////////////////////
model.prototype.defineVert = function(x_pos, y_pos, z_pos) {
	this.verts.push({
		x: x_pos,
		y: y_pos,
		z: z_pos
	});
	
	return this.verts.length - 1;
}

////////////////////////////////////////////////////////////////////////
// Defines a quadrilateral polygon.
////////////////////////////////////////////////////////////////////////

model.prototype.defineQuad = function(vert1, vert2, vert3, vert4){
	this.quads.push([vert1, vert2, vert3, vert4]);
	
	return this.quads.length - 1;
}

////////////////////////////////////////////////////////////////////////
// Vertex Rotation function.
////////////////////////////////////////////////////////////////////////

model.prototype.rotateVert = function (index, rotation_x, rotation_y, rotation_z){
	var x = this.verts[index].x;
	var y = this.verts[index].y;
	var z = this.verts[index].z;
	
	var xca = Math.cos(rotation_x * this.rad_ratio);
	var xsa = Math.sin(rotation_x * this.rad_ratio);
	
	var yca = Math.cos(rotation_y * this.rad_ratio);
	var ysa = Math.sin(rotation_y * this.rad_ratio);
	
	var zca = Math.cos(rotation_z * this.rad_ratio);
	var zsa = Math.sin(rotation_z * this.rad_ratio);
	
	// Rotate around the Y axis.
	var x1 = (yca * x) - (ysa * z);
	var y1 = y;
	var z1 = (ysa * x) + (yca * z);
	
	// Rotate around the X axis.
	var x2 = x1;
	var y2 = (xca * y1) - (xsa * z1);
	var z2 = (xsa * y1) + (xca * z1);
	
	// Rotate around the Z axis.
	var x3 = (zca * x1) - (zsa * y2);
	var y3 = (zsa * x1) + (zca * y2);
	var z3 = z2;
	
	return {x: x3, y: y3, z: z3};
}

////////////////////////////////////////////////////////////////////////
// Full rotation function.
////////////////////////////////////////////////////////////////////////
model.prototype.flatten = function(rotation_x, rotation_y, rotation_z) {
	for(var vert = 0; vert < this.verts.length - 1; vert++) {
		var cache = this.rotateVert(vert, rotation_x, rotation_y, rotation_z);
		
		this.flatMatrix[vert] = {x: cache.x, y: cache.y};
	}
}

////////////////////////////////////////////////////////////////////////
// Renders on-screen. TO-DO: Render to file destination.
// Ongoing bug seems to be causing issues with geometry definition or retrieval.
////////////////////////////////////////////////////////////////////////

model.prototype.render = function(rx, ry, rz) {
	this.flatten(rx, ry, rz);
	
	var center_x = GetScreenWidth() / 2;
	var center_y = GetScreenHeight() / 2;
	
	for(var quad = 0; quad < this.quads.length - 1; quad++) {
		var quadMap = this.quads[quad];
		
		var vert1 = this.flatMatrix[quadMap[0]];
		var vert2 = this.flatMatrix[quadMap[1]];
		var vert3 = this.flatMatrix[quadMap[2]];
		var vert4 = this.flatMatrix[quadMap[3]];
		
		Line(vert1.x + center_x, vert1.y + center_y, vert2.x + center_x, vert2.y + center_y, this.color);
		Line(vert2.x + center_x, vert2.y + center_y, vert3.x + center_x, vert3.y + center_y, this.color);
		Line(vert3.x + center_x, vert3.y + center_y, vert4.x + center_x, vert4.y + center_y, this.color);
		Line(vert4.x + center_x, vert4.y + center_y, vert1.x + center_x, vert1.y + center_y, this.color);
	}
}

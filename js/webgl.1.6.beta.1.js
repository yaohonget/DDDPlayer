(function(){
function webgl(){
/** global variables **/
//http://glmatrix.googlecode.com/files/glMatrix-0.9.5.min.js
// video
this.videoElement			= null;
// canvas
this.canvasElement			= null;
// how to show the message of error: 1 - console , 0 - alert
errorHandlerType 			= 1;
// the name of fragment shader file
this.fragmentShaderFile		= "js/fragment.shader";
// the name of vertex shader file
this.vertexShaderFile 		= "js/vertex.shader";
// shader program
this.shaderProgram			= null;
// WebGL object
this.gl						= null;
this.status					= true;
this.seq					= true;
this.counter				= 0;
this.feq					= 3;
// true - on , false - off
this.threeDSwitcher			= true;

// 0 - rc
this.redFilter				= [
	1.0, 0.0, 0.0, 0.0,
 	0.0, 0.0, 0.0, 0.0,
 	0.0, 0.0, 0.0, 0.0,
 	0.0, 0.0, 0.0, 1.0
 	
 	
];
this.cyanFilter				= [
	0.0, 0.0, 0.0, 0.0,
 	0.0, 1.0, 0.0, 0.0,
 	0.0, 0.0, 1.0, 0.0,
 	0.0, 0.0, 0.0, 1.0
];
// 1 - gm
this.greenFilter			= [
	0.0, 0.0, 0.0, 0.0,
 	0.0, 1.0, 0.0, 0.0,
 	0.0, 0.0, 0.0, 0.0,
 	0.0, 0.0, 0.0, 1.0
];
this.magentaFilter			= [
	1.0, 0.0, 0.0, 0.0,
 	0.0, 0.0, 0.0, 0.0,
 	0.0, 0.0, 1.0, 0.0,
 	0.0, 0.0, 0.0, 1.0
];
// 2 - yb
this.yellowFilter			= [
	1.0, 0.0, 0.0, 0.0,
 	0.0, 1.0, 0.0, 0.0,
 	0.0, 0.0, 0.0, 0.0,
 	0.0, 0.0, 0.0, 1.0
];
this.blueFilter				= [
	0.0, 0.0, 0.0, 0.0,
 	0.0, 0.0, 0.0, 0.0,
 	0.0, 0.0, 1.0, 0.0,
 	0.0, 0.0, 0.0, 1.0
];
// 9 - rc(half color)
this.redHalfColorFilter		= [
 	0.299, 0.0, 0.0, 0.0,
 	0.587, 0.0, 0.0, 0.0,
 	0.114, 0.0, 0.0, 0.0,
 	0.0, 0.0, 0.0, 1.0
];
// 10 - rc(optimized)
this.redOptiColorFilter		= [
 	0.0, 0.0, 0.0, 0.0,
 	0.7, 0.0, 0.0, 0.0,
 	0.3, 0.0, 0.0, 0.0,
 	0.0, 0.0, 0.0, 1.0
];

// 0 - rc , 1 - gm , 2 - yb
this.defaultEffectType 	= 1;
this.effectType			= 1;
this.uFilter0 	= this.redFilter;
this.uFilter1 	= this.cyanFilter;

/** data buffer **/
// scene
this.sceneTexture						= null;

this.sceneVerticesBuffer0 				= null;
this.sceneVerticesBuffer1 				= null;
this.sceneVerticesIndexBuffer			= null;
this.sceneVerticesTextureCoordBuffer0 	= null;
this.sceneVerticesTextureCoordBuffer1 	= null;

this.mvMatrix							= null;
this.perspectiveMatrix					= null;

this.oriSceneVertices = [
	-1.0,  -1.0,  0.0,
	1.0,  -1.0,  0.0,
	1.0, 1.0,  0.0,
	-1.0, 1.0,  0.0
];
this.rSceneVertices = [	
	0.0,  -1.0,  0.0,
	1.0,  -1.0,  0.0,
	1.0,  1.0,  0.0,
	0.0, 1.0,  0.0
];
this.lSceneVertices = [
	-1.0,  -1.0,  0.0,
	0.0,  -1.0,  0.0,
	0.0,  1.0,  0.0,
	-1.0, 1.0,  0.0
];
this.uSceneVertices = [	
	-1.0,  -1.0,  0.0,
	1.0,  -1.0,  0.0,
	1.0,  0.0,  0.0,
	-1.0, 0.0,  0.0
];
this.aSceneVertices = [
	-1.0,  0.0,  0.0,
	1.0,  0.0,  0.0,
	1.0,  1.0,  0.0,
	-1.0, 1.0,  0.0
];

this.sceneVertices0 = this.oriSceneVertices;
this.sceneVertices1 = this.oriSceneVertices;

this.sceneVertexIndices = [
	0,  1,  2,     0,  2,  3	                 
];

this.oriSceneTextureCoordinates = [
	0.0,  0.0,
	1.0,  0.0,
	1.0,  1.0,
	0.0,  1.0
];

this.leftSceneTextureCoordinates = [
	0.0,  0.0,
	0.5,  0.0,
	0.5,  1.0,
	0.0,  1.0
];

this.rightSceneTextureCoordinates = [
	0.5,  0.0,
	1.0,  0.0,
	1.0,  1.0,
	0.5,  1.0
];

this.aboveSceneTextureCoordinates = [
	0.0,  0.5,
	1.0,  0.5,
	1.0,  1.0,
	0.0,  1.0
];

this.underSceneTextureCoordinates = [
	0.0,  0.0,
	1.0,  0.0,
	1.0,  0.5,
	0.0,  0.5
];
// 0 - mono , 1 - left|right , 2 - above|unter
this.defaultInputType 	= 1;
this.inputType			= 1;
this.currentSceneTextureCoordinates0 = this.leftSceneTextureCoordinates;
this.currentSceneTextureCoordinates1 = this.rightSceneTextureCoordinates;
};


webgl.prototype.get3DMode = function(){
	return this.threeDSwitcher;
}

webgl.prototype.set3DMode = function(mode, init){

	this.threeDSwitcher = mode;
	//if(mode){
	//	this.inputType = this.defaultInputType;
	//	this.effectType = this.defaultEffectType;
	//}	
	//this.setInputType(this.inputType, false);
	//this.setEffectType(this.effectType, false);
	if(init == undefined){ init = true; }
	if(init){
		this.initProcess();
   	}
}

webgl.prototype.initProcess = function(){
	if(!this.initShaders()){ if(this.status) this.status = false; } 	
	if(!this.initBuffers()){ if(this.status) this.status = false; }	   
    if(!this.initTexture()){ if(this.status) this.status = false; } 
    if(!this.initScene()){ if(this.status) this.status = false; }   
   	
}

webgl.prototype.getStatus = function(){
	return this.status;
}

webgl.prototype.getEffectType = function(){
	return this.effectType;
}

webgl.prototype.setEffectType = function(mode, init){
	if(this.threeDSwitcher){
		if(mode == 1){
			this.sceneVertices0 = this.oriSceneVertices;
			this.sceneVertices1 = this.oriSceneVertices;
			this.uFilter0 = this.redFilter;
			this.uFilter1 = this.cyanFilter;
		}
		else if(mode == 2){
			this.sceneVertices0 = this.oriSceneVertices;
			this.sceneVertices1 = this.oriSceneVertices;
			this.uFilter0 = this.greenFilter;
			this.uFilter1 = this.magentaFilter;
		}
		else if(mode == 3){
			this.sceneVertices0 = this.oriSceneVertices;
			this.sceneVertices1 = this.oriSceneVertices;
			this.uFilter0 = this.yellowFilter;
			this.uFilter1 = this.blueFilter;
		}
		else if(mode == 9){
			this.sceneVertices0 = this.oriSceneVertices;
			this.sceneVertices1 = this.oriSceneVertices;
			this.uFilter0 = this.redHalfColorFilter;
			this.uFilter1 = this.cyanFilter;
		}
		else if(mode == 10){
			this.sceneVertices0 = this.oriSceneVertices;
			this.sceneVertices1 = this.oriSceneVertices;
			this.uFilter0 = this.redOptiColorFilter;
			this.uFilter1 = this.cyanFilter;
		}
		else if(mode == 4){
			this.sceneVertices0 = this.rSceneVertices;
			this.sceneVertices1 = this.lSceneVertices;
			//this.uFilter0 = this.redFilter;
			//this.uFilter1 = this.cyanFilter;
		}
		else if(mode == 5){
			this.sceneVertices0 = this.uSceneVertices;
			this.sceneVertices1 = this.aSceneVertices;
			//this.uFilter0 = this.redFilter;
			//this.uFilter1 = this.cyanFilter;
		}
		else if(mode == 6 || mode == 7 ||mode == 8){
			this.sceneVertices0 = this.oriSceneVertices;
			this.sceneVertices1 = this.oriSceneVertices;
			//this.uFilter0 = this.redFilter;
			//this.uFilter1 = this.cyanFilter;
		}
		this.effectType = mode;
	}	
	else{
		this.effectType = 1;
		this.uFilter0 		= this.redFilter;
		this.uFilter1 		= this.cyanFilter;
		this.sceneVertices0 = this.oriSceneVertices;
		this.sceneVertices1 = this.oriSceneVertices;
	}
	if(init == undefined){ init = true; }
	if(init){
		this.initProcess();
   	}
}

webgl.prototype.getSeqType = function(){
	return this.seq;
};

webgl.prototype.setSeqType = function(mode){
	if(typeof(mode) == 'boolean'){
		this.seq = mode;
	}	
};

webgl.prototype.getInputType = function(){
	return this.inputType;
};

webgl.prototype.setInputType = function(mode, init){
	if(this.threeDSwitcher){
		if(mode == 0){
			this.currentSceneTextureCoordinates0 = this.leftSceneTextureCoordinates;
			this.currentSceneTextureCoordinates1 = this.rightSceneTextureCoordinates;
		}
		else if(mode == 1){
			this.currentSceneTextureCoordinates0 = this.leftSceneTextureCoordinates;
			this.currentSceneTextureCoordinates1 = this.rightSceneTextureCoordinates;
		}
		else if(mode == 2){
			this.currentSceneTextureCoordinates0 = this.aboveSceneTextureCoordinates;
			this.currentSceneTextureCoordinates1 = this.underSceneTextureCoordinates;
		}
		this.inputType = mode;
	}
	else{
		this.inputType = 1;
		this.currentSceneTextureCoordinates0 = this.oriSceneTextureCoordinates;
		this.currentSceneTextureCoordinates1 = this.oriSceneTextureCoordinates;
	}	
		
	if(init == undefined){ init = true; }
	if(init ){
		this.initProcess();
   	}
}



// start webgl
webgl.prototype.init = function(canvasId, videoId){
	try{
	    // Initialize the WebGL environment
	    this.canvasElement	= document.getElementById(canvasId);
		this.videoElement	= document.getElementById(videoId);
	    this.initWebGL();
	    this.set3DMode(this.threeDSwitcher);
	    
	    this.initShaders();
		this.initBuffers(); 
    	this.initTexture(); 
   		//this.initScene();
	    
	    if(this.gl){
	    	// See [W]2.1
	    	// Set clear color to black, fully opaque
	    	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	    	// Clear everything
	        this.gl.clearDepth(1.0);
	     	// Enable depth testing, to ensure the Hide. If you want to have the blend Effect,
	        // depth testing mast be shut down
	    	//gl.enable(gl.DEPTH_TEST);
	        this.gl.disable(this.gl.DEPTH_TEST);
	        this.gl.enable(this.gl.BLEND);
	        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);	        
	    	// Near things obscure far things
	        this.gl.depthFunc(this.gl.LEQUAL);
	    	// Clear the buffers of color and depth
	        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	    	// Get Information of the context, see [W]5.14.2
	    }
	    else{
	    	throw("Unable to initialize WebGL. Your browser may not support it.");
	    }
	}
    catch(e){
		this.errorHandler(errorHandlerType, e);
	}
}

//
//	initWebGL
//	Initialize WebGL, returning the GL context or null if 
//	WebGL isn't available or could not be initialized. 
//
webgl.prototype.initWebGL = function(){
	try{
		// See [W]5.2.1
		this.gl = this.canvasElement.getContext("webgl") || this.canvasElement.getContext("experimental-webgl");
		this.setGLViewport(this.canvasElement);
		if(!this.gl){
			throw("Unable to initialize WebGL. Your browser may not support it.");
			return false;
		}
		return true;
	}
	catch(e){
		this.errorHandler(errorHandlerType, e);
	}	
}

webgl.prototype.setGLViewport = function(canvas){
	this.gl.viewportWidth 	= canvas.width;
    this.gl.viewportHeight 	= canvas.height;
    this.initViewport();
}

webgl.prototype.initViewport = function(){
	this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
	return true;
}
//
//initShaders
//
//Initialize the shaders, so WebGL knows how to light our scene.
//
webgl.prototype.initShaders = function(){
	try{
		var fragmentShader = this.getShader(this.fragmentShaderFile);
		var vertexShader   = this.getShader(this.vertexShaderFile);
		// create the left shader program
		this.shaderProgram = this.gl.createProgram();	
		this.gl.attachShader(this.shaderProgram, vertexShader);
		this.gl.attachShader(this.shaderProgram, fragmentShader);
		this.gl.linkProgram(this.shaderProgram);			
		// If creating the shader program failed, alert
		if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)){
	    	throw("Unable to initialize the shader program.");
	    	return false;
	    }
	    
		// configuration of the shader program for the scene
		this.shaderProgram.uThreeDSwitcher	= this.gl.getUniformLocation(this.shaderProgram, "u3DSwitcher");	
		this.shaderProgram.uEffectType 		= this.gl.getUniformLocation(this.shaderProgram, "uEffectType");		
		this.shaderProgram.uSeq 			= this.gl.getUniformLocation(this.shaderProgram, "uSeq");		
		//this.shaderProgram.uOutputType		= this.gl.getUniformLocation(this.shaderProgram, "uOutputType");
		this.shaderProgram.uStageHeight		= this.gl.getUniformLocation(this.shaderProgram, "uStageHeight");
		this.shaderProgram.uStageWidth		= this.gl.getUniformLocation(this.shaderProgram, "uStageWidth");			
		this.shaderProgram.uFilter0 		= this.gl.getUniformLocation(this.shaderProgram, "uFilter0");		
		this.shaderProgram.uFilter1 		= this.gl.getUniformLocation(this.shaderProgram, "uFilter1");				
		this.shaderProgram.pMatrixUniform 	= this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
        this.shaderProgram.mvMatrixUniform 	= this.gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
        this.shaderProgram.samplerUniform 	= this.gl.getUniformLocation(this.shaderProgram, "uSampler");
				
		this.shaderProgram.vertexPositionAttribute 		= this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");			
		this.shaderProgram.textureCoordAttribute0 		= this.gl.getAttribLocation(this.shaderProgram, "aTextureCoord0");
		this.shaderProgram.textureCoordAttribute1 		= this.gl.getAttribLocation(this.shaderProgram, "aTextureCoord1");
		return true;
	}
	catch(Exception){
		this.errorHandler(errorHandlerType, Exception);
	}
}



//
//getShader
//
//Loads a shader program by scouring the current document,
//looking for a script with the specified ID.
//
webgl.prototype.getShader = function(file){
	try{
		var theSource = this.a(file, {}, "post", false, false);				
		// Didn't find an element with the specified ID; abort.
		if(!theSource){
			return null;
		}
		// Now figure out what type of shader script we have,
		// based on its MIME type.
		var shader;
		if(file == this.fragmentShaderFile){
			shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		}
		else if(file == this.vertexShaderFile){
			shader = this.gl.createShader(this.gl.VERTEX_SHADER);
		}
		else {
			// Unknown shader type
			return null;  
		}
		// Send the source to the shader object
		// See [W]5.14.9 and [S]2.10.1
		this.gl.shaderSource(shader, theSource);
		// Compile the shader program
		this.gl.compileShader(shader);
		// See if it compiled successfully
		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
		    //debug("An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(shader));
		    return null;
		}  
		return shader;
	}
	catch(e){
		this.errorHandler(errorHandlerType, e);
	}
}

//
// changeBuffers
//
// modify the buffers when necessary
//



//
//initBuffers
//
//Initialize the buffers we'll need.
//
webgl.prototype.initBuffers = function(){
	try{
		this.sceneVerticesBuffer0 = this.gl.createBuffer();		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sceneVerticesBuffer0);		
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.sceneVertices0), this.gl.STATIC_DRAW);
		if((this.effectType == 4 ||this.effectType == 5) && this.threeDSwitcher){
			this.sceneVerticesBuffer1 = this.gl.createBuffer();		
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sceneVerticesBuffer1);		
			this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.sceneVertices1), this.gl.STATIC_DRAW);
		}
		
		this.sceneVerticesIndexBuffer = this.gl.createBuffer();		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.sceneVerticesIndexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.sceneVertexIndices), this.gl.STATIC_DRAW);
		
		if(this.threeDSwitcher){		
			this.sceneVerticesTextureCoordBuffer0 	= this.gl.createBuffer();	
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sceneVerticesTextureCoordBuffer0);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.currentSceneTextureCoordinates0), this.gl.STATIC_DRAW);
			this.gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute0, 2, this.gl.FLOAT, false, 0, 0);
			this.gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute0);
			this.sceneVerticesTextureCoordBuffer1 	= this.gl.createBuffer();	
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sceneVerticesTextureCoordBuffer1);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.currentSceneTextureCoordinates1), this.gl.STATIC_DRAW);
			this.gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute1, 2, this.gl.FLOAT, false, 0, 0);
			this.gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute1);
			this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);	
		}
		else{
			this.sceneVerticesTextureCoordBuffer0 	= this.gl.createBuffer();	
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sceneVerticesTextureCoordBuffer0);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.currentSceneTextureCoordinates0), this.gl.STATIC_DRAW);
			this.gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute0, 2, this.gl.FLOAT, false, 0, 0);
			this.gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute0);	
		}
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
		
		return true;
	}
	catch(e){
		this.errorHandler(errorHandlerType, e);
	}
}


webgl.prototype.initScene = function(){
	try{
		this.mvMatrix			= mat4.create();	// The Model-View matrix
		this.perspectiveMatrix 	= mat4.create();    // The projection matrix
		this.normalMatrix = mat4.create();

		mat4.perspective(90, 1, 0.1, 100.0, this.perspectiveMatrix);
		mat4.identity(this.mvMatrix);
		mat4.translate(this.mvMatrix, [0.0, 0.0, -1.0]);	
		
		this.gl.useProgram(this.shaderProgram);		
		return true;
	}
	catch(e){
		this.errorHandler(errorHandlerType, e);
	}
}


// initial of the texture
webgl.prototype.initTexture = function() {
	try{
		// create the texture for scene
				
		this.sceneTexture 	= this.gl.createTexture();
		this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);	
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.sceneTexture);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);		
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
		return true;
	}
	catch(e){
		this.errorHandler(errorHandlerType, e);
	}
}

// update the content of the texture
webgl.prototype.updateTexture =  function(image){
	try{		
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.sceneTexture);
		if(image){
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
			//return true;
		}
		else if(this.videoElement){
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.videoElement);
			//return true;		
		}
		else{
			//return false;
		}
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);		
	}
	catch(e){
		this.errorHandler(errorHandlerType, e);
	}
}

//
//drawScene
//
//Draw the scene.
//
webgl.prototype.drawScene = function(image){
	try{	
		this.updateTexture(image);
		
		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		
		this.mvMatrix			= mat4.create();	// The Model-View matrix
		this.perspectiveMatrix 	= mat4.create();    // The projection matrix
		
		mat4.perspective(90, 1, 0.1, 100.0, this.perspectiveMatrix);
		mat4.identity(this.mvMatrix);
		mat4.translate(this.mvMatrix, [0.0, 0.0, -1.0]);
		
		this.gl.useProgram(this.shaderProgram);		
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sceneVerticesBuffer0);		
		this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sceneVerticesTextureCoordBuffer0);
		this.gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute0, 2, this.gl.FLOAT, false, 0, 0);
		
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.sceneTexture);
		this.gl.uniform1i(this.shaderProgram.samplerUniform, 0);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.sceneVerticesIndexBuffer);
		
		this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.perspectiveMatrix );
		this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);	
		
		this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
		
		return true;		
	}
	catch(e){
		this.errorHandler(errorHandlerType, e);
	}
}

webgl.prototype.a = function(url, data, type, async, cache) {
	try {
		var self = this;
		var _response = "";
		if (!type || (type.toLowerCase() != "post" && type.toLowerCase() != "get")) {
			type = "get";
		}
		if (!data || data instanceof Object) {
			data = {};
		}
		if (cache != false && cache != true) {
			cache = true;
		}

		var _async;
		if (async != false && async != true) {
			_async = true;
		} else {
			_async = async == true ? true : false;
		}

		if ( typeof jQuery == 'undefined') {
			var _xmlHttp;
			var _url = url;
			var _parameters = "";

			try {
				// Firefox, Opera 8.0+, Safari, IE7
				_xmlHttp = new XMLHttpRequest();
			} catch(e) {
				// Old IE
				try {
					_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					self.errorHandler(errorHandlerType, "Your browser does not support XMLHTTP!");
					return null;
				}
			}

			for (var _parameterKey in data) {
				if ( typeof (data[_parameterKey]) == "function") {
					data[_parameterKey]();
				} else {
					_parameters += _parameterKey + "=" + data[_parameterKey] + "&";
				}
			}
			if (type == 'get') {
				if (_parameters !== "undefined" && _parameters != null) {
					_url += '?' + _parameters;
				}
				_parameters = null;
			}
			_xmlHttp.onreadystatechange = function() {
				if (_xmlHttp.readyState == 4 && _xmlHttp.status == 200) {
					_response = _xmlHttp.responseText;
				}
			};
			_xmlHttp.open(type, _url, _async);
			_xmlHttp.send(_parameters);
		} else {
			$.ajax({
				type : type,
				url : url,
				async : async,
				data : data,
				beforeSend : function() {
				},
				success : function(data) {
					_response = data;
				},
				complete : function() {
				},
				error : function() {
					self.errorHandler(errorHandlerType, "ajax error");
					return null;
				}
			});
		}
		return _response;
	} catch(e) {
		this.errorHandler(errorHandlerType, e);
	}
};

//error handler
webgl.prototype.errorHandler = function(type, e, emsg) {
	try {
		if (!type) {
			type = !errorHandlerType ? 0 : errorHandlerType;
		}
		var msg = "";
		if(e){
			if (typeof(e) == 'object') {			
				if(e.line){
					msg += " - line : " + e.line;
				}
				if(e.lineNumber){
					msg += " - line : " + e.lineNumber;
				}
				if(e.message){
					msg += " - Message : " + e.message;
				}
			}
			else{
				msg += " - Message : " + e;
			}
		}
		if(emsg){
			msg += emsg;
		}

		var _timer = new Date();
		if (!_timer) {
			throw ("Initailize the Date()-Object failed.");
		}
		var _msg = "!Error!<br /> -Time : " + _timer.getFullYear() + "/" + (_timer.getMonth() + 1) + "/" + _timer.getDate() + "  " + _timer.getHours() + ":" + _timer.getMinutes() + ":" + _timer.getSeconds();// + ":" + _timer.getMilliseconds();
		_msg += '<br />' + msg;

		if (type == 0) {
			alert(_msg);
		} else if (type == 1) {
			console.log(_msg);
		}
	} catch(e) {
		alert(arguments.callee.name + " - line : " + e.line + " - message : " + e.message);
	}
};
window['__'] = new webgl;
})();
// Vertex shader program
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord0;
attribute vec2 aTextureCoord1;

uniform bool u3DSwitcher;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord0;
varying vec2 vTextureCoord1;

void main(void) {	
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	if(u3DSwitcher){
		vTextureCoord0 = aTextureCoord0;
		vTextureCoord1 = aTextureCoord1;
	}
	else{
		vTextureCoord0 = aTextureCoord0;
	}
}
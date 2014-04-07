// Fragment shader program 
precision mediump float;
varying vec2 vTextureCoord0;
varying vec2 vTextureCoord1;

uniform bool u3DSwitcher;
uniform int uEffectType;
uniform bool uSeq;
uniform float uStageHeight;
uniform float uStageWidth;
uniform mat4 uFilter0;
uniform mat4 uFilter1;
uniform sampler2D uSampler;

const float pi = 180.0;
const float steps = 2.0;

void main(void) {
	vec4 tempColor; 
	if(u3DSwitcher){			
		vec4 color0 = texture2D(uSampler, vTextureCoord0.st);
		vec4 color1 = texture2D(uSampler, vTextureCoord1.st);
		if(uEffectType == 4 || uEffectType == 5){
			if(uSeq){
				tempColor = color0;
			}
			else{
				tempColor = color1;
			}
		}
		else if(uEffectType == 6){
			float i = sin(vTextureCoord0.x * 2000.0 * 1.5 / 3.14);
			if(i > 0.0){
				if(uSeq){
					tempColor = color0;
				}
				else{
					tempColor = color1;
				}
			}
			else{
				if(uSeq){
					tempColor = color1;
				}
				else{
					tempColor = color0;
				}
			}
		}
		else if(uEffectType == 7){
			float i = sin(vTextureCoord0.y * 1000.0 * 1.5 / 3.14);
			if(i > 0.0){
				if(uSeq){
					tempColor = color0;
				}
				else{
					tempColor = color1;
				}
			}
			else{
				if(uSeq){
					tempColor = color1;
				}
				else{
					tempColor = color0;
				}
			}
		}
		else if(uEffectType == 8){			
			if(uSeq){
				tempColor = color0;
			}
			else{
				tempColor = color1;
			}			
		}
		else if(uEffectType == 9){			
			if(uSeq){
				tempColor = uFilter0 * color0 + uFilter1 * color1;
			}
			else{
				tempColor = uFilter0 * color1 + uFilter1 * color0;
			}
			tempColor.x = pow(tempColor.x, 1.5);
		}
		else {
			if(uSeq){
				tempColor = uFilter0 * color0 + uFilter1 * color1;
			}
			else{
				tempColor = uFilter0 * color1 + uFilter1 * color0;
			}
		}		
	}
	else{
		tempColor = texture2D(uSampler, vTextureCoord0.st);
	} 
	gl_FragColor = clamp(tempColor, 0.0, 1.0);   
	
}
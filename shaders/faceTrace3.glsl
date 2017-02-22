
uniform float time;
uniform sampler2D t_audio;

uniform sampler2D t_cube;
uniform sampler2D t_normal;
uniform sampler2D t_logo;

uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

varying vec3 vPos;
varying vec3 vCam;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;
varying float vNoise;

uniform float noiseSize1;
uniform float noiseSize2;


$uvNormalMap
$semLookup


// Branch Code stolen from : https://www.shadertoy.com/view/ltlSRl
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License

const float MAX_TRACE_DISTANCE = 1.0;             // max trace distance
const float INTERSECTION_PRECISION = 0.001;        // precision of the intersection
const int NUM_OF_TRACE_STEPS = 15;
const float PI = 3.14159;



vec3 hsv(float h, float s, float v)
{
    
  return mix( vec3( 1.0 ), clamp( ( abs( fract(
    h + vec3( 3.0, 2.0, 1.0 ) / 3.0 ) * 6.0 - 3.0 ) - 1.0 ), 0.0, 1.0 ), s ) * v;
}


$smoothU
$pNoise


float fNoise( vec3 pos ){
    float n = pNoise( pos * 200. * noiseSize1 + .1 * vec3( 0.,0.,10.*time ));
    float n2 = pNoise( pos * 40. * noiseSize2 + .1 * vec3( 0.,0.,10.*time ));
    return n * .005 + n2 * .01;
}



// green fur
vec3 col1( vec3 ro , vec3 rd ){

  vec3 col = vec3( 0. );
  for( int i = 0; i<10; i++){
    vec3 p = ro + rd * .5 * float( i );

   float n = 200.*fNoise( p  * .05);
    //float n =  200. * fNoise( p  * .2);

    //n *= .3;
    if( n > 1.3){

      col += n  * hsv( float(i) /10. + time * .2, 1. , 1. ) ;
      break;
    }


  }

  return col;

}



void main(){




  vec3 ro = vPos;
  vec3 rd = normalize( vPos - vCam );

  vec3 p = vec3( 0. );
  vec3 col =  vec3( 0. );




  col = col1( ro , rd );
  


  gl_FragColor = vec4( col , 1. );

}

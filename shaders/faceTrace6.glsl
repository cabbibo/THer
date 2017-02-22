
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


$uvNormalMap
$semLookup


// Branch Code stolen from : https://www.shadertoy.com/view/ltlSRl
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License

const float MAX_TRACE_DISTANCE = 100.0;             // max trace distance
const float INTERSECTION_PRECISION = 0.1;        // precision of the intersection
const int NUM_OF_TRACE_STEPS = 15;
const float PI = 3.14159;



$smoothU
$pNoise

// Taken from https://www.shadertoy.com/view/4ts3z2
float tri(in float x){return abs(fract(x)-.5);}
vec3 tri3(in vec3 p){return vec3( tri(p.z+tri(p.y*1.)), tri(p.z+tri(p.x*1.)), tri(p.y+tri(p.x*1.)));}
                                 

// Taken from https://www.shadertoy.com/view/4ts3z2
float triNoise3D(in vec3 p, in float spd)
{
    float z=1.4;
  float rz = 0.;
    vec3 bp = p;
  for (float i=0.; i<=3.; i++ )
  {
        vec3 dg = tri3(bp*2.);
        p += (dg+time*.1*spd);

        bp *= 1.8;
    z *= 1.5;
    p *= 1.2;
        //p.xz*= m2;
        
        rz+= (tri(p.z+tri(p.x+tri(p.y))))/z;
        bp += 0.14;
  }
  return rz;
}



//--------------------------------
// Modelling 
//--------------------------------
vec2 map( vec3 pos ){  

    vec2 res = vec2( 1000000. , 0. );



    vec3 mpos = mod( pos , vec3( .2)) - vec3(.1);



    vec2 centerBlob = vec2( length( pos + vec3( 0. , 3. , 2. )  ) - 3. , 2. );
    centerBlob.x += triNoise3D( pos * .5 , 1. ) * .3;

    res =smoothU( res , centerBlob , .2 );
    res =smoothU( res , vec2( length( pos + vec3( 1. , 0. , 2. )  ) - .7 , 1. ) , .4 );
    res =smoothU( res , vec2( length( pos + vec3( 0. , -.8 , 1. )  ) - .4 , 1. ) , .4 );
    res =smoothU( res , vec2( length( pos + vec3( -1. , -.4 , 4. )  ) - 1. , 1. ) , .4 );
    res =smoothU( res , vec2( length( pos + vec3( 0. , 0, 10. )  ) - 5. , 1. ) , .4 );

    return res;
    
}


$calcIntersection
$calcNormal
$calcAO





void main(){

  //vec3 fNorm = uvNormalMap( t_normal , vPos , vUv * 20. , vNorm , .6 , -.1 );
 /* vec4 logoCol = texture2D( t_logo , vUv );

  if( logoCol.a < .5 ){
    discard;
  }*/



  vec3 ro = vPos;
  vec3 rd = normalize( vPos - vCam );

  vec3 p = vec3( 0. );
  vec3 col =  vec3( 0. );

  //float m = max(0.,dot( -rd , fNorm ));

  //col += fNorm * .5 + .5;

 // vec3 refr = refract( rd , fNorm , 1. / 1.) ;

 
  vec2 res = calcIntersection( ro , rd );

//  col = fNorm * .5 + .5;


  col = vec3( 0. , 0. , 0.);// texture2D(t_cube, vUv).rgb;

  if( res.y > -.5 ){

    p = ro + rd * res.x;
    vec3 n = calcNormal( p );

    //col += n * .5 + .5;

    col +=  texture2D( t_cube, semLookup( rd , n , modelViewMatrix , normalMatrix ) ).xyz;

    if( res.y >1.){

      col = mix(col * vec3( 1. , .3 , .3 ) , col * vec3( 1. , .6 , .2 ) , res.y - 1.);
      
    }

    col *= 1.4;

    //if( logoCol.g > .5 ){ col *= 2.; }
    //col *= texture2D( t_audio , vec2(  abs( n.x ) , 0. ) ).xyz;

  }




  gl_FragColor = vec4( col , 1. );

}
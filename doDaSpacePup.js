
var G = {}

G.loading = {

      loaded:0,
      neededToLoad:0

    },

G.SpacePups =[];

G.models = {}

G.shaders = new ShaderLoader( 'shaders' , 'shaders/chunks' );

G.init = function(){



  G.logoData = G.doLogoData(G.logo.image);

  G.uniforms = {
    time: {type:"f", value:0},
    iModelMat:{type:"m4", value:new THREE.Matrix4()},
    t_cube:{type:"t", value:G.cube},
    t_logo:{type:"t",value:G.logo},
    noiseSize1:{type:"f", value:1},
    noiseSize2:{type:"f", value:1},
  }

  //G.uniforms.t_cube.value = G.skyMap;

  var ar = window.innerWidth / window.innerHeight;

  G.three = {

    scene           : new THREE.Scene(),
    camera          : new THREE.PerspectiveCamera( 40 , ar , .01 , 100 ),
    renderer        : new THREE.WebGLRenderer(),
    clock           : new THREE.Clock(),
    stats           : new Stats()

  }

  G.three.renderer.setSize( window.innerWidth * 2, window.innerHeight * 2 );
  G.three.renderer.setClearColor( 0x000000, 1 )
  G.three.renderer.domElement.id = "renderer"
  G.three.renderer.domElement.style.width = "100%"
  G.three.renderer.domElement.style.height = "100%"
  G.three.renderer.setPixelRatio(  20 );
  document.body.appendChild( G.three.renderer.domElement );

  G.three.stats.domElement.style.position = "absolute";
  G.three.stats.domElement.style.left = "0px";
  G.three.stats.domElement.style.bottom = "-30px";
  G.three.stats.domElement.style.zIndex = "999";
  //document.body.appendChild( G.three.stats.domElement );



  G.objectControls = new ObjectControls( G.three.camera );


  //G.controls = new THREE.TrackballControls( G.three.camera );
  G.controls = new ScrollControls( G.three.camera );

  G.controls.minPos     = -30.7;
  G.controls.maxPos     =  .04;
  G.controls.multiplier =  .0000003;// * textParticles.totalHeight;
  G.controls.dampening  = .96;
  //G.controls.noZoom = true;
  //.G.controls.noPan = true;
  //G.controls.noRoll = true;
  G.three.camera.position.z = .23;

  console.log( G.shaders.vs );

  var passage1 = `Hello TH-er! 

We are so glad you could make it here.

And wanted to tell you a bit about our new project. Its something between a magazine, a gallery, and outlandish exploration. All in VR. `

    var passage2 = `This is the second test at a logo. Its got the lil cookie cutter thing attached, but since it is barely grey, it looks a bit weird. Its even weirder when its pure black though, so I kept it as is. 

I think it might make sense in VR, especially if it is like built *into* the wall, instead of out of it?`

var passage3 = `The next few sections are just going to be super crazy tests of how the text could look, but keep in mind, it can be just about anything! This one, is a 'step' based approach, meaning that there are quantized 'steps' moving through the object. This one has volumetric ( aka it keeps info from all the steps )`
var passage4 = `Unlike the last one, this version stops the ray once it has hit a level, making each step much more of an actual step!`
var passage5 = `This one has a lil bit of depth, but makes the depth less important as is goes back. making it look a bit flatter, but a hint of weirdness`
var passage6 = `One more with 'step' based approached trying to use some rainbow to make something interesting!`
var passage7 = `Last but definitely not least, I wanted to just show the fact that all of these where thrown together in like 20 seconds. We have the opportunity to do anything we want, not jsut that which is trippy. We could even make it so every time you load the page its a different shader. This is what a more 'polished' shader can look like. Unlike all the other ones which only took about 2min each to create, this is more on the 20 minute side of things!`

  G.rayTraced1 = G.doDaSpacePup(passage1,G.shaders.vs.trace,G.shaders.fs.f_trace);
  G.rayTraced2 = G.doDaSpacePup(passage2,G.shaders.vs.trace,G.shaders.fs.f_trace,true);
  G.rayTraced3 = G.doDaSpacePup(passage3,G.shaders.vs.trace,G.shaders.fs.f_trace2);
  G.rayTraced4 = G.doDaSpacePup(passage4,G.shaders.vs.trace,G.shaders.fs.f_trace3);
  G.rayTraced5 = G.doDaSpacePup(passage5,G.shaders.vs.trace,G.shaders.fs.f_trace4);
  G.rayTraced6 = G.doDaSpacePup(passage6,G.shaders.vs.trace,G.shaders.fs.f_trace5);
  G.rayTraced7 = G.doDaSpacePup(passage7,G.shaders.vs.trace,G.shaders.fs.f_trace6);


  G.rayTraced1.setPosition( new THREE.Vector3( 0, 0,0));
  G.rayTraced2.setPosition( new THREE.Vector3( 0, -.16,0));
  G.rayTraced3.setPosition( new THREE.Vector3( 0, -.32,0));
  G.rayTraced4.setPosition( new THREE.Vector3( 0, -.48,0));
  G.rayTraced5.setPosition( new THREE.Vector3( 0, -.64,0));
  G.rayTraced6.setPosition( new THREE.Vector3( 0, -.8,0));
  G.rayTraced7.setPosition( new THREE.Vector3( 0, -.96,0));
 // G.rayTraced7.setPosition( new THREE.Vector3( 0, -1.2,0));

/*
  var vs = G.shaders.vs.text;
  var fs = G.shaders.fs.text;

  
   G.textParticles1 = new TextParticles( passage1 , G.font , vs , fs , {
     letterWidth: .003,
     lineLength: 50,
     uniforms:{
      time: G.uniforms.time,
     }  
    });

   G.textParticles1.position.y = -.03;
    
    G.three.scene.add( G.textParticles1 );
    G.textParticles1.position.x = -G.textParticles1.totalWidth / 2;




    
   G.textParticles2 = new TextParticles( passage1 , G.font , vs , fs , {
     letterWidth: .003,
     lineLength: 50,
     uniforms:{
      time: G.uniforms.time,
     }  
    });
    G.textParticles2.position.y = -.2;
    G.three.scene.add( G.textParticles2 );
    G.textParticles2.position.x = -G.textParticles2.totalWidth / 2;*/

       // scene.add( title );

        //textParticles.material.uniforms.time.value = 1.;

  

  
}

G.animate = function(){

  requestAnimationFrame( G.animate );
  G.controls.update();
  G.objectControls.update();


  /*var h = G.objectControls.raycaster.intersectObject( G.sp , G.objectControls.raycaster );
  //console.log( h );

  if( h[0] ){

    G.getColor( h[0].uv.x , h[0].uv.y );
    //console.log( h[0] )
  }*/

  G.uniforms.time.value += G.three.clock.getDelta();
  //G.sp.rotation.y = .3 * Math.sin( G.uniforms.time.value * 1.);
  //G.sp.rotation.x = .2 * Math.sin( G.uniforms.time.value * 1.3);

  //G.sp.position.x = Math.sin( G.uniforms.time.value * .1 ) * .01;
  //G.uniforms.iModelMat.value.getInverse( G.sp.matrixWorld );

  for(var i = 0; i< G.SpacePups.length; i++ ){
    G.SpacePups[i].update();
  }

  G.three.renderer.render( G.three.scene , G.three.camera );
  G.three.stats.update();



  
}

G.doDaSpacePup = function(text,vs,fs,addCookie){

  //console.log( vs);


  var mat = new THREE.ShaderMaterial({
    uniforms: {
      iModelMat:{type:"m4", value:new THREE.Matrix4()},
      time : G.uniforms.time,
      t_cube : G.uniforms.t_cube,
      t_logo : G.uniforms.t_logo,
      noiseSize1 : G.uniforms.noiseSize1,
      noiseSize2 : G.uniforms.noiseSize2,
    },
    vertexShader:vs,
    fragmentShader:fs,
    side: THREE.DoubleSide
  });


  var mesh = new THREE.Mesh( G.models.face.geometry , mat );
  mesh.scale.multiplyScalar( .04 )
  mesh.rotation.x = 0;///Math.PI / 2;

  var cookie = new THREE.Mesh( G.models.cookie.geometry ,new THREE.MeshBasicMaterial({color:0x3f3f3f,side: THREE.DoubleSide}));
  cookie.scale.z *= 2;
  //cookie.position.z += ;
 
  if( addCookie == true ){
    mesh.add( cookie );
  }

  mesh.hovering = function(){
    console.log("yello");
  }

  mesh.update = function(){
    //console.log( this );
     this.material.uniforms.iModelMat.value.getInverse( this.matrixWorld );
  }

  mesh.setPosition = function( pos ){
    this.position.copy( pos );
    this.textParticles.position.copy( pos );
    this.textParticles.position.add( new THREE.Vector3( 0 , -.035, 0));
    this.textParticles.position.x = -textParticles.totalWidth / 2;
  }

  
  var vs = G.shaders.vs.text;
  var fs = G.shaders.fs.text;

  var textParticles = new TextParticles( text , G.font , vs , fs , {
   letterWidth: .003,
   lineLength: 50,
   uniforms:{
    time: G.uniforms.time,
   }  
  });
  
  textParticles.position.y = 0;
  G.three.scene.add( textParticles );
  //textParticles.scale.multiplyScalar( 20 / .04);
  textParticles.position.x = -textParticles.totalWidth / 2;


  mesh.textParticles = textParticles;


  G.SpacePups.push( mesh );


  G.objectControls.add( mesh );
  G.three.scene.add( mesh );

  return mesh;

}

G.getColor = function( u , v ){

  var tx = Math.min(emod(u, 1) * G.logoData.width  | 0, G.logoData.width - 1);
  var ty = Math.min(emod(v, 1) * G.logoData.height | 0, G.logoData.height - 1);
  var offset = (ty * G.logoData.width + tx) * 4;
  var r = G.logoData.data[offset + 0];
  var g = G.logoData.data[offset + 1];
  var b = G.logoData.data[offset + 2];
  var a = G.logoData.data[offset + 3];

  //console.log( r );

}

G.doLogoData = function(img){
  console.log( img );

  var canvasElement = $("<canvas></canvas>");
  console.log( canvasElement );
  G.canvas = canvasElement.get(0).getContext("2d");
  // make the canvas same size as the image
  canvasElement.width  = img.width;
  canvasElement.height = img.height;
// draw the image into the canvas
  G.canvas.drawImage(img, 0, 0);
// copy the contents of the canvas
  var texData = G.canvas.getImageData(0, 0, img.width, img.height);

  console.log( texData );
  return texData;
}

// this is only needed if your UV coords are < 0 or > 1
// if you're using CLAMP_TO_EDGE then you'd instead want to
// clamp the UVs to 0 to 1.
function emod(n, m) {
  return ((n % m) + m) % m;
}


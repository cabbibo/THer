function beginLoad(){

  G.font = PTMono( 'font/PTMono.png' );
  loadShaders();
  loadAudio();
  loadOBJS();
  G.logo = loadImage("THer.png");
  G.cube = loadImage("rough-aluminium.jpg");


  
  //loadCubeMap();
}

function loadShaders(){

  //shaders.load( 'ss-curlFront'    , 'sim'    , 'simulation' );

  G.loading.neededToLoad ++;

  G.shaders.load( 'fs-trace2'  , 'trace' , 'fragment' );
  G.shaders.load( 'faceTrace'  , 'f_trace' , 'fragment' );
  G.shaders.load( 'faceTrace2'  , 'f_trace2' , 'fragment' );
  G.shaders.load( 'faceTrace3'  , 'f_trace3' , 'fragment' );
  G.shaders.load( 'faceTrace4'  , 'f_trace4' , 'fragment' );
  G.shaders.load( 'faceTrace5'  , 'f_trace5' , 'fragment' );
  G.shaders.load( 'faceTrace6'  , 'f_trace6' , 'fragment' );
  G.shaders.load( 'vs-trace'   , 'trace' , 'vertex'   );
  G.shaders.load( 'vs-text'   , 'text' , 'vertex'   );
  G.shaders.load( 'fs-text'   , 'text' , 'fragment'   );

  
  G.shaders.shaderSetLoaded = function(){
    onLoad();
  }

}

function loadOBJS(){
  G.modelLoader = new THREE.OBJLoader();
  loadOBJ( "face" , "face.obj" );
  loadOBJ( "cookie" , "therCookie.obj" );
}


function loadOBJ(name, url){

  G.loading.neededToLoad ++;


  G.modelLoader.load(url, function ( object ) {
    object.traverse( function ( child ) {
      //if ( child instanceof THREE.Mesh ) {
        //child.material.map = texture;
        
        G.models[name] = child;
        //print("hels");
      //}
    } );

    onLoad();

  }, onProgress, onError );

}

function onProgress(){}
function onError(){}


function loadImage(url){

  G.loading.neededToLoad ++;
  var r = THREE.RepeatWrapping;

  var t = THREE.ImageUtils.loadTexture(url, r , onLoad, onError);
  t.wrapT = t.wrapS = THREE.RepeatWrapping;
  return t;

}


function loadAudio(){

  //loadBuffer( "loveLoopBuffer"  , "audio/love.mp3"      );
  //loadBuffer( "painLoopBuffer"  , "audio/pain.mp3"      );
  //loadBuffer( "normLoopBuffer"  , "audio/norm.mp3"      );
//
  //loadBuffer( "clickNoteBuffer" , "audio/switch.mp3"    );
  //loadBuffer( "startNoteBuffer" , "audio/startNote.mp3" );
  //loadBuffer( "jestNoteBuffer"  , "audio/jest.mp3" );



}

function loadBuffer(name , bufferFile){

  var aBuff = new AudioBuffer( G.audio , bufferFile);
  G[name] = aBuff;
  G.loading.neededToLoad += 1;
  aBuff.addLoadEvent(function(){
    onLoad();
  })

}

function onLoad(){

  G.loading.loaded ++;

  console.log( G.loading );


  if( G.loading.loaded == G.loading.neededToLoad ){

    finishedLoading();

  }

}

// TODO: these catch?
function onProgress(e){
  console.log( e );
}

function onError(e){
  console.log( e );
}

function finishedLoading(){

  console.log("WFTASAD");
  G.init(); 
  G.animate();
}
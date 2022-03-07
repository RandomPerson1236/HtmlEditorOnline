  import * as THREE from '../threejs/three.module.js';
  import {OrbitControls} from '../threejs/orbit/OrbitControls.js';
  import {EffectComposer} from '../threejs/post-process/EffectComposer.js';
  import {RenderPass} from '../threejs/post-process/shaders/RenderPass.js';
  import {UnrealBloomPass} from '../threejs/post-process/UnrealBloomPass.js';

  var auto_spin = true;
  var spinSpeed = 0.00025;
  var spinSpeedEarth = 0.000025;

  var composer;
  var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // add the automatically created canvas element to the page
  document.body.appendChild( renderer.domElement );
  var scene = new THREE.Scene();
  
  // create a PerspectiveCamera
  var fov = 80;
  var aspect = window.innerWidth / window.innerHeight;
  var nearClippingPlane = 0.1;
  var farClippingPlane = 2500;
  var camera = new THREE.PerspectiveCamera( fov, aspect, nearClippingPlane, farClippingPlane );

  const controls = new OrbitControls(camera, renderer.domElement)
  camera.position.set(0,0,20);
  controls.update();

  const textureLoader = new THREE.TextureLoader();

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass({x: 1024, y: 1024}, 2.0, 0.0, 0.75));
  

  //moon texture
  var normalTextMoon = textureLoader.load('textures/moon/Moon_001_NORM.jpg');
  var albedoTextMoon = textureLoader.load('textures/moon/Moon_001_COLOR.jpg');
  var displaceTextMoon = textureLoader.load('textures/moon/Moon_001_DISP.png');
  var materialSphere = new THREE.MeshStandardMaterial({
    map: albedoTextMoon,
    normalMap: normalTextMoon,
    displacementMap: displaceTextMoon,
    displacementScale: 0.25,
    roughness: 1,
    metalness: 0.6,
  });
  var moonTextureScale1 = 6;
  var moonTextureScale2 = 2.5;
  albedoTextMoon.wrapS = THREE.RepeatWrapping;
  albedoTextMoon.wrapT = THREE.RepeatWrapping;
  normalTextMoon.wrapS = THREE.RepeatWrapping;
  normalTextMoon.wrapT = THREE.RepeatWrapping;
  displaceTextMoon.wrapS = THREE.RepeatWrapping;
  displaceTextMoon.wrapT = THREE.RepeatWrapping;
  albedoTextMoon.repeat.set(moonTextureScale1,moonTextureScale2);
  normalTextMoon.repeat.set(moonTextureScale1,moonTextureScale2);
  displaceTextMoon.repeat.set(moonTextureScale1,moonTextureScale2);

  var moon_base = new THREE.SphereGeometry(3, 16, 40, 40);
  var moon_mesh = new THREE.Mesh(moon_base, materialSphere);
  //scene.add(moon_mesh);

  var earthAlbedo = textureLoader.load('textures/earth/earth.jpg');
  var earthNormal = textureLoader.load('textures/earth/8k_earth_normal_map.png');
  var earthAlpha = textureLoader.load('textures/earth/earth_clouds.jpg');
  var earthMaterial = new THREE.MeshStandardMaterial({
  map: earthAlbedo,
  normalMap: earthNormal,
  roughness: 1,
  
  });
  var earth_base = new THREE.SphereGeometry(25, 16, 75, 75);
  var earth_mesh = new THREE.Mesh(earth_base, earthMaterial);
  earth_mesh.position.x = 0;
  earth_mesh.position.y = -0;
  earth_mesh.position.z = -40;
  earth_mesh.rotation.y = 10;
  scene.add(earth_mesh);

  var sunMaterial = new THREE.MeshLambertMaterial({
  color: 'orange',
  emissive: 'orange',
  emissiveIntensity: 2,
  });
  var sun_base = new THREE.SphereGeometry(50, 16, 75, 75);
  var sun_mesh = new THREE.Mesh(earth_base, sunMaterial);
  scene.add(sun_mesh);
  sun_mesh.position.y = 1000;
  sun_mesh.position.x = 1000;

  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.35 );
  directionalLight.position.set( 2, 10, 5 );
  directionalLight.castShadow = true;
  scene.add( directionalLight );

  function automatic_rotate(){
      if(auto_spin === false){ 
          auto_spin = true;
      } else{
          auto_spin = false;
      }
  }
  //object controls
    document.onkeydown = function(e){
        switch(e.which){
            case 97:
            spinSpeed = 0.005;
            spinSpeedEarth = 0.0005;
            break; 
            case 98:
            spinSpeed = 0.01;
            spinSpeedEarth = 0.001;
            break; 
            case 96:
            spinSpeed = 0.00025;
            spinSpeedEarth = 0.000025;
            break; 
            default: return;
        }
    };
  document.getElementById("fovText").addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
      
      }
  });
  function animate() {
    requestAnimationFrame( animate );
    if(auto_spin){
        moon_mesh.rotation.y += spinSpeed;

        earth_mesh.rotation.x += spinSpeedEarth;
    };
    controls.update();
    // render a frame
    composer.render();
  }
  animate();
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Materials
const jointMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const boneMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

// Helper function to create joints
function createJoint(x, y, z) {
    const jointGeometry = new THREE.SphereGeometry(0.1);
    const joint = new THREE.Mesh(jointGeometry, jointMaterial);
    joint.position.set(x, y, z);
    return joint;
}

// Helper function to create bones
function createBone(start, end) {
    const direction = new THREE.Vector3().subVectors(end.position, start.position);
    const length = direction.length();
    const boneGeometry = new THREE.CylinderGeometry(0.05, 0.05, length);
    const bone = new THREE.Mesh(boneGeometry, boneMaterial);
    
    // Position and rotate bone to connect joints
    bone.position.copy(start.position);
    bone.position.addScaledVector(direction, 0.5);
    bone.lookAt(end.position);
    bone.rotateX(Math.PI / 2);
    
    return bone;
}

// Create skeleton structure
const skeleton = new THREE.Group();

// Create joints
const head = createJoint(0, 2, 0);
const neck = createJoint(0, 1.7, 0);
const torso = createJoint(0, 1, 0);
const leftShoulder = createJoint(-0.5, 1.5, 0);
const rightShoulder = createJoint(0.5, 1.5, 0);
const leftElbow = createJoint(-0.8, 1.2, 0);
const rightElbow = createJoint(0.8, 1.2, 0);
const leftHand = createJoint(-1, 0.8, 0);
const rightHand = createJoint(1, 0.8, 0);
const leftHip = createJoint(-0.3, 0.7, 0);
const rightHip = createJoint(0.3, 0.7, 0);
const leftKnee = createJoint(-0.3, 0.4, 0);
const rightKnee = createJoint(0.3, 0.4, 0);
const leftFoot = createJoint(-0.3, 0, 0);
const rightFoot = createJoint(0.3, 0, 0);

// Create bones
const bones = [
    createBone(head, neck),
    createBone(neck, torso),
    createBone(leftShoulder, leftElbow),
    createBone(rightShoulder, rightElbow),
    createBone(leftElbow, leftHand),
    createBone(rightElbow, rightHand),
    createBone(torso, leftHip),
    createBone(torso, rightHip),
    createBone(leftHip, leftKnee),
    createBone(rightHip, rightKnee),
    createBone(leftKnee, leftFoot),
    createBone(rightKnee, rightFoot)
];

// Add everything to skeleton
[head, neck, torso, leftShoulder, rightShoulder, leftElbow, rightElbow,
 leftHand, rightHand, leftHip, rightHip, leftKnee, rightKnee, leftFoot, rightFoot,
 ...bones].forEach(part => skeleton.add(part));

scene.add(skeleton);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 2);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Camera position
camera.position.z = 5;
camera.position.y = 1;

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    // Simple swaying animation
    skeleton.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
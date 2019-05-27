var CameraClass = function () {

    this.m_Camera = null; 
};
CameraClass.prototype.test = function () {
    //alert(this.m_tt);
};

///// 透视摄影机
var PerspeCamera = function (Cx, Cy, Cz) {

    CameraClass.call(this);
    
    this.m_Camera = new THREE.PerspectiveCamera(45, width / height, 1, 20000);
    this.m_Camera.position.x = Cx;
    this.m_Camera.position.y = Cy;
    this.m_Camera.position.z = Cz;
    this.m_Camera.up.x = 0;
    this.m_Camera.up.y = 1;
    this.m_Camera.up.z = 0; 
    this.m_Camera.lookAt({ x: 0, y: 0, z: 0 });
    

};
PerspeCamera.prototype = Object.create(CameraClass.prototype);
PerspeCamera.prototype.test = function () {
    //alert(this.m_Camera.position.z);

};
PerspeCamera.prototype.lookAtPos = function (point) {
    this.m_Camera.lookAt(point);       

};
//用于渲染立方体镜头
var CubeCamera = function (near, far, cubeResolution) {
    CameraClass.call(this);
    this.m_Camera = new THREE.CubeCamera(near, far, cubeResolution);
    this.m_Camera.lookAt({ x: 0, y: 0, z: 0 });

}
CubeCamera.prototype = Object.create(CameraClass.prototype);


/////其他摄影机

var OrthoCamera = function (Cx, Cy, Cz) {
    CameraClass.call(this);
}
OrthoCamera.prototype = Object.create(CameraClass.prototype);
var LightClass = function () {

    this.m_light = null;
    this.m_light_Shadow = null;

};
LightClass.prototype.SetPostion = function (x, y, z) {

    this.m_light.position.set(x, y, z);
    if (this.m_light_Shadow) {
        //  alert(this.m_light_Shadow);
        this.m_light_Shadow.position.set(x, y, z);
    }

};
LightClass.prototype.CreateLightBox = function (distance) {
 
    var m_material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: true });
    m_material.transparent = true;

    var geometry = null;
    if (distance) {
         alert(distance);
        m_material.opacity = 0.5;
       
        geometry = new THREE.CubeGeometry(distance, distance, distance);
    } else {
        geometry = new THREE.CubeGeometry(50, 50, 50);
    }
    this.m_light_Shadow = new THREE.Mesh(geometry, m_material);
    Obj_Add(this.m_light_Shadow);

};
//环境光
var AmbientLight = function (color) {

    LightClass.call(this);
    this.m_light = new THREE.AmbientLight(color);
    this.m_light.name = "Sys_Light" + this.m_light.id;

    Obj_Add(this.m_light);
};
AmbientLight.prototype = Object.create(LightClass.prototype);
///平行光 color 颜色 inten 强度
var DirectionLight = function (color, inten) {
    LightClass.call(this);
    this.m_light = new THREE.DirectionalLight(color, inten);
    //  alert(this.m_light.id);
    this.m_light.name = "Sys_Light" + this.m_light.id;
    this.m_light.shadowCameraLeft = 7360 / 4
    this.m_light.shadowCameraRight = -7360 / 4;
    this.m_light.shadowCameraTop = 4960 / 4;
    this.m_light.shadowCameraBottom = -4960 / 4;
    //  this.m_light.shadowCameraVisible = true;
    this.m_light.shadowDarkness = 0.3;
    this.m_light.castShadow = true;
 
    Obj_Add(this.m_light);
};
DirectionLight.prototype = Object.create(LightClass.prototype);


///点光源  color 颜色 inten 强度 distance 距离
var PointLight = function (color, inten, showbox, distance) {

    LightClass.call(this);
    this.m_light = new THREE.PointLight(color, inten, distance);
    this.m_light.name = "Sys_Light" + this.m_light.id;
    // this.m_light.shadowCameraVisible = true;
    if (showbox) {
       
        this.CreateLightBox(distance);
    }
    // this.m_light.position.copy(m_VarGlobal.m_Camera.m_Camera.position);
    Obj_Add(this.m_light);
};
PointLight.prototype = Object.create(LightClass.prototype);


///聚光灯源
//intensity 光线密度
//distance 光线距离
//angle 光线距离
//exponent衰减速度指数,默认是10
var SpotLight = function (color, intensity, distance, angle, exponent, targetPos) {
    LightClass.call(this);

    this.m_light = new THREE.SpotLight(color, intensity, distance, angle, exponent);

    this.m_light.name = "Sys_Light" + this.m_light.id;
    this.m_light.shadowCameraVisible = true;
    var posflag = (targetPos !== undefined) ? 0 : 1;
    //alert(posflag);
    if (posflag) {
        this.m_light.add(this.m_light.target);
    }

    Obj_Add(this.m_light);
};
SpotLight.prototype = Object.create(LightClass.prototype);
SpotLight.prototype.SetLightShadow = function (flag) {//设置阴影
    this.m_light.castShadow = flag;
}
SpotLight.prototype.SetCameraArea = function (near, far) {//    阴影的平截头体区域属性 
    this.m_light.shadowCameraNear = near;
    this.m_light.shadowCameraFar = far;
}
SpotLight.prototype.SetCameraFov = function (fov) {//    阴影的平截头体区角度 
    this.m_light.shadowCameraFov = fov;

}
SpotLight.prototype.SetTargetPos = function (x, y, z) {//    设置灯光目标位置
    this.m_light.target.position.set(x, y, z);

}

//////////平面光
var AreaLight = function (color, intensity) {
    LightClass.call(this);

    this.m_light = new THREE.AreaLight(0xff0000, 1);    //创建平面灯光对象 
    this.m_light.position.set(0, 0, 1);   //设置位置 
    // this.m_light.rotation.set(-0.3, 0.3, 0.002); //设置角度 
    this.m_light.width = 10;   //设置宽度 
    this.m_light.height = 1;   //设置高度 

    // this.m_light.add(this.m_light.target);
    //  this.m_light.target.position.set(0,0, -1);
    // alert(this.m_light.target);
    // this.m_light.shadowCameraVisible = true;
    this.m_light.name = "Sys_Light" + this.m_light.id;




    Obj_Add(this.m_light);
    var geometry = new THREE.PlaneGeometry(1, 1);
    var material = new THREE.MeshBasicMaterial({ color: this.m_light.color.getHex(), vertexColors: THREE.FaceColors });
    var emitter = new THREE.Mesh(geometry, material);
    emitter.scale.set(this.m_light.width * 2, 1.0, this.m_light.height * 2);
    this.m_light.add(emitter);


};
AreaLight.prototype = Object.create(LightClass.prototype);
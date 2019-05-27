var MaterialClass = function () {



};

//材料
var BaseMaterial = function () {


};
BaseMaterial.prototype = Object.create(MaterialClass.prototype);


//颜色
var BaseColor = function () {

    this.m_color = 0xff00ff;
    this.m_DoubleSide = THREE.DoubleSide;
    this.m_Alpha = 1;
};
BaseColor.prototype = Object.create(MaterialClass.prototype);
//创建基本颜色
BaseColor.prototype.BasicMaterial = function (color, Alpha, DoubleSide) {//颜色,透明度,(双面 1 单面 0)

    this.m_color = color || 0x000000;
    this.m_DoubleSide = DoubleSide || THREE.DoubleSide;
    this.m_Alpha = Alpha || 1;

    var Material = new THREE.MeshBasicMaterial({ color: this.color, side: this.m_DoubleSide });
    Material.transparent = true;
    Material.opacity = this.m_Alpha;

    return Material;

}
BaseColor.prototype.LambertMaterial = function (color, Alpha, DoubleSide) {//颜色,透明度,(双面 1 单面 0)

    this.m_color = color || 0x000000;
    this.m_DoubleSide = DoubleSide || THREE.DoubleSide;
    this.m_Alpha = Alpha || 1;

    var Material = new THREE.MeshLambertMaterial({ color: this.color, side: this.m_DoubleSide });
    Material.transparent = true;
    Material.opacity = this.m_Alpha;

    return Material;

}

// color 漫射颜色,默认初始化为0xffffff,白色  
// ambient环境色 ,默认初始化为0xffffff, 白色, 乘以环境光对象的颜色  
// emissive 自发光(荧光)颜色, 默认初始化为0x000000,黑色, 实体颜色,不受其他灯光的影响.  
// specular高光色, 默认初始化为0x111111,灰色, 材质发光区域的颜色,比如设置为漫射颜色,亮度加大,材质更像金属,设成灰色,使材质更像塑料.默认是灰色的.  
// shininess 高光的强度,默认是30, 数值越小,高光越大，高光呈现出一个亮点. 
// metal 是否是金属 true false
// wrapAround  是否遮罩 true false
BaseColor.prototype.PhongMaterial = function (color, Alpha, DoubleSide) {//颜色,透明度,(双面 1 单面 0)

    this.m_color = color || 0x000000;
    this.m_DoubleSide = DoubleSide || THREE.DoubleSide;
    this.m_Alpha = Alpha || 1;

    var Material = new THREE.MeshPhongMaterial({ color: 0x00ffff, ambient: 0xff0000, emissive: 0xff00ff,specular:0xffff000, shininess: 30,perPixel:false ,skinning :false});
    Material.metal = true;
    Material.transparent = true;
    Material.opacity = this.m_Alpha;

    return Material;

}
BaseColor.prototype.PhongInfoMaterial = function (codenum) {//颜色,透明度,(双面 1 单面 0)
    if (codenum == "") {
        codenum = "code_init";
    }

    var Material = null;
    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {
        var m_arr = m_VarGlobal.m_XMLWall[i];

        if (m_arr != "") {
            if (m_arr[0] == "Material" && m_arr[1] == codenum) {

                if (m_arr[12] == true) {
                   
                    Material = new THREE.MeshPhongMaterial({ opacity: m_arr[15], color: m_arr[2], emissive: m_arr[4], specular: m_arr[5], shininess: m_arr[6], skinning: m_arr[8], envMap: m_VarGlobal.m_BaseSence.m_TextureCube,  refractionRatio: m_arr[14] });

                    //   Material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, envMap: m_VarGlobal.m_BaseSence.m_TextureCube, combine: THREE.MultiplyOperation })
                    //   Material = new THREE.MeshPhongMaterial({ color: 0xaa9944, specular: 0xbbaa99, shininess: 50, envMap: m_VarGlobal.m_BaseSence.m_TextureCube, combine: THREE.MultiplyOperation })
                } else {

                    Material = new THREE.MeshPhongMaterial({ opacity: m_arr[15], color: m_arr[2], emissive: m_arr[4], specular: m_arr[5], shininess: m_arr[6], skinning: m_arr[8] });

                }
                
                Material.metal = true;
                Material.transparent = true;
                Material.opacity = m_arr[9];
                // alert(THREE.DoubleSide);
                Material.side = m_arr[10];
                var textureLoader = new THREE.TextureLoader();

                if (m_arr[15] != "") {

                    Material.normalMap = textureLoader.load(m_arr[15])
                }
                if (m_arr[16] != "") {
                    Material.emissiveMap = textureLoader.load(m_arr[16])
                }
                if (m_arr[17] != "") {

                    Material.specularMap = textureLoader.load(m_arr[17]);

                }

                return Material

            }
        }
    }



    return Material;

}
//贴图
var BasePic = function () {
    this.m_Image = new Image_JPG();

};
BasePic.prototype = Object.create(MaterialClass.prototype);
BasePic.prototype.ImageMaterial = function (path) {
    
    this.m_Image.load(path);
    // alert(this.m_Image.texture);
    return this.m_Image.texture;
}

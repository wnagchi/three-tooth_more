// JavaScript Document
var Create3dText = function (str, size, font, height, cure) {




    if (str == "") {
        this.theText = '请输入文字';
    } else {
        this.theText = str;
    }
    this.size = size || 40;
    this.height = height || 1;
    this.cure = cure || 1;
    this.font = font || 'gentilis';

    var text3d = new THREE.TextGeometry(this.theText, {

        size: this.size,

        height: this.height,

        curveSegments: this.cure,

        font: this.font

    });

    text3d.computeBoundingBox();
  
    var text = new THREE.Mesh(text3d, new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
    text.position.set(0, 0,0);
    text.name = "Text_" + this.theText;
   // Obj_Add(text);
   
    return text;
    //  VariableClass.m_SceneClass.m_dis.add(this.text);

}
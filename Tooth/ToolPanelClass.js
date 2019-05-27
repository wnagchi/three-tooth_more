var ToolPanelClass = function () {

};
var ToothPanel_Top = function () { //派生类
    ToolPanelClass.call(this);


};
ToothPanel_Top.prototype = Object.create(ToolPanelClass.prototype);
ToothPanel_Top.prototype.OnSelObj = function (obj, point, num) {
    point = obj.worldToLocal(point);
   // alert("ToothPanel_Top:" + obj.name + "|" + point.x + "|" + point.y + "|" + point.z);

    //    var m_Min = new THREE.Vector3(0, 0, 0);
    //    var m_Max = new THREE.Vector3(0, 0, 0);

    //    obj.geometry.computeBoundingBox();
    //    var m_DisMin = child.geometry.boundingBox.min;
    //    var m_DisMax = child.geometry.boundingBox.max;
    //    m_Max.max(m_DisMax);
    //    m_Min.min(m_DisMin);
    //  alert(m_VarGlobal.m_ToothPanel_Top.setCube)
    var m_cube = m_VarGlobal.m_ToothPanel_Top.setCube(obj);
}
ToothPanel_Top.prototype.setCube = function (obj) {
    var m_Min = new THREE.Vector3(0, 0, 0);
    var m_Max = new THREE.Vector3(0, 0, 0);
    m_Max.copy(obj.geometry.vertices[0]);
    m_Min.copy(obj.geometry.vertices[0]);

    for (var i = 0; i < obj.geometry.vertices.length; i++) {
        if (m_Max.x < obj.geometry.vertices[i].x) {
            m_Max.x = obj.geometry.vertices[i].x;
        }
        if (m_Max.y < obj.geometry.vertices[i].y) {
            m_Max.y = obj.geometry.vertices[i].y;
        }
        if (m_Max.z < obj.geometry.vertices[i].z) {
            m_Max.z = obj.geometry.vertices[i].z;
        }

        if (m_Min.x > obj.geometry.vertices[i].x) {
            m_Min.x = obj.geometry.vertices[i].x;
        }
        if (m_Min.y > obj.geometry.vertices[i].y) {
            m_Min.y = obj.geometry.vertices[i].y;
        }
        if (m_Min.z > obj.geometry.vertices[i].z) {
            m_Min.z = obj.geometry.vertices[i].z;
        }

    }
    //alert(m_Max.y + "|" + m_Min.y);
    var material = new THREE.MeshBasicMaterial({ color: 0x0ff000, side: THREE.DoubleSide });
    material.transparent = true;
    material.opacity = 0.5;

    var m_cube = new THREE.Mesh(new THREE.BoxGeometry(m_Max.x - m_Min.x, m_Max.y - m_Min.y, m_Max.z - m_Min.z), material);
    m_cube.position.x= (m_Max.x + m_Min.x) / 2;
    m_cube.position.y= (m_Max.y + m_Min.y) / 2;
    m_cube.position.z = (m_Max.z + m_Min.z) / 2;


     obj.add(m_cube);
    return m_cube;
}
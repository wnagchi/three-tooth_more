var AnimationClass = function () {
    this.m_fps = 5;
    // this.animationGroup = new THREE.AnimationObjectGroup();
    this.m_animations = [];
 //   this.m_animationGroup = new THREE.AnimationObjectGroup();


};
AnimationClass.prototype.init = function (mesh) {
    var m_AnimationArr = [];
   
    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {

        var m_arr = m_VarGlobal.m_XMLWall[i];

        if (m_arr != "") {
         
            if (m_arr[0] == "Animation" && m_arr[1] == mesh.name) {
                //  if (m_arr[0] == "Animation") {
             
                if (m_arr[2] == ".position") {
                    var m_times = m_arr[3].split(",");
                    var m_position = m_arr[4].split(",");
                    var positionKF = new THREE.VectorKeyframeTrack(mesh.name + m_arr[2], m_times, m_position);
                    //  var positionKF = new THREE.VectorKeyframeTrack(m_arr[1] + m_arr[2], m_times, m_position);
                    m_AnimationArr.push(positionKF);
                } else if (m_arr[2] == ".scale") {
                    var m_times = m_arr[3].split(",");
                    var m_scale = m_arr[4].split(",");
                    var scaleKF = new THREE.VectorKeyframeTrack(mesh.name + m_arr[2], m_times, m_scale);
                    m_AnimationArr.push(scaleKF);
                } else if (m_arr[2] == ".material.color") {
                    var m_times = m_arr[3].split(",");
                    var m_color = m_arr[4].split(",");
                    var colorKF = new THREE.VectorKeyframeTrack(mesh.name + m_arr[2], m_times, m_color);
                    m_AnimationArr.push(colorKF);
                } else if (m_arr[2] == ".material.opacity") {
                    var m_times = m_arr[3].split(",");
                    var m_color = m_arr[4].split(",");
                    var opacityKF = new THREE.VectorKeyframeTrack(mesh.name + m_arr[2], m_times, m_color);
                    m_AnimationArr.push(opacityKF);
                } else if (m_arr[2] == ".quaternion") {
                    var m_rotation = mesh.rotation.clone();
                    var m_position = mesh.position.clone()

                    mesh.rotation.x = 0;
                    mesh.rotation.y = 0;
                    mesh.rotation.z = 0;

                    mesh.position.x = 0;
                    mesh.position.y = 0;
                    mesh.position.z = 0;


                    var m_times = m_arr[3].split(",");
                    var m_value = m_arr[4].split(",");
                    var m_Direction = m_arr[5].split(",");
                    var Axis = new THREE.Vector3(m_Direction[0], m_Direction[1], m_Direction[2]);
                    var m_Quaternion = [];
                    // alert(m_value);
                    for (var j = 0; j < m_value.length; j++) {
                        var m_angle = Num_Radian(Number(m_value[j]))
                        //alert(m_angle)
                        var qInitial = new THREE.Quaternion().setFromAxisAngle(Axis, m_angle);
                        qInitial.multiply(mesh.quaternion)
                        // alert(qInitial.x)
                        m_Quaternion.push(qInitial.x);
                        m_Quaternion.push(qInitial.y);
                        m_Quaternion.push(qInitial.z);
                        m_Quaternion.push(qInitial.w);
                    }
                    var m_qua = new THREE.Group();
                    m_qua.name = mesh.name + "_group";
                    m_qua.rotation.copy(m_rotation);
                    m_qua.position.copy(m_position);
                    //  m_qua.useQuaternion = true;
                    // m_qua.quaternion = mesh.quaternion;


                    // alert(m_AnimationArr[0].name)
                    //mesh.name += "_QueChild";



                    mesh.quaternion = new THREE.Quaternion();

                    Obj_Parent(mesh).remove(mesh);
                    m_qua.add(mesh);
                    Obj_Add(m_qua)

                    var quaternionKF = new THREE.QuaternionKeyframeTrack(mesh.name + m_arr[2], m_times, m_Quaternion);
                    m_AnimationArr.push(quaternionKF);

                    //  alert(m_AnimationArr[1].name)

                }

             
                
                // alert(this.m_animations.length);

                /// this.m_animationGroup.add(mesh);


            }

        }
    }
    for (var i = 0; i < m_AnimationArr.length; i++) {
        if (m_AnimationArr[i].name == mesh.name + ".quaternion") {
            //alert(m_AnimationArr[i].name);
            for (j = 0; j < m_AnimationArr.length; j++) {
                if (m_AnimationArr[j].name == mesh.name + ".position") {

                    m_AnimationArr[j].name = mesh.name + "_group.position"
                }
            }
        }
    }

    var clip = new THREE.AnimationClip('Action', this.m_fps, m_AnimationArr);

    this.m_animations.push(clip);


};
var PsarticleClass = function () {
    //THREE.ImageLoader.call(this);
    this.m_QuaternionW = 0;
    this.obj = null;
    this.m_InterNum = 0;
    this.m_InterTimeOut = 5000;
    this.m_InterIntervalMax = 5000;
    this.m_InterIntervalNum = 0;
    this.m_tpx = 0;
    this.m_tpy = 0;
    this.m_tpz = 0;
    this.m_velx = 0;
    this.m_vely = 0;
    this.m_velz = 0;
    this.m_dpx = 0;
    this.m_dpy = 0;
    this.m_dpz = 0;
    this.m_type=0;

};
//旋转CLass
var Psarticle_Effect = function () {
    PsarticleClass.call(this);

};
Psarticle_Effect.prototype = Object.create(PsarticleClass.prototype);
Psarticle_Effect.prototype.Create = function (m_dis, arr, x, y, z, rx, ry, rz, velx, vely, velz, tpx, tpy, tpz, img, size, count, name, color, transparent, alpha, type) {

    this.m_type = Number(type);

    var particleCount = count;

    var particles = new THREE.Geometry();


    particles.verticesNeedUpdate = true;
    var m_Object = new THREE.Object3D();
    //  var textureLoader = new THREE.TextureLoader();

    var sprite = THREE.ImageUtils.loadTexture(img);

    var pMaterial = new THREE.MeshBasicMaterial({ color: color, size: size, blending: THREE.AdditiveBlending, transparent: transparent, side: THREE.DoubleSide });

    pMaterial.opacity = alpha;


    this.m_dpx = arr[17];
    this.m_dpy = arr[18];
    this.m_dpz = arr[19];
    this.m_tpx = tpx;
    this.m_tpy = tpy;
    this.m_tpz = tpz;
    this.m_velx = velx;
    this.m_vely = vely;
    this.m_velz = velz;
    // 依次创建单个粒子 
    // var m_tp = 20;

    if (type < 32) {
        pMaterial = new THREE.PointsMaterial({ size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: true, transparent: transparent, side: THREE.DoubleSide });
        if (count > 1) {
            for (var p = 0; p < particleCount; p++) {
                // 粒子范围在-250到250之间 

                var pX = Math.random() * tpx,
                    pY = Math.random() * tpy,
                    pZ = Math.random() * tpz,
                    particle = new THREE.Vector3(pX, pY, pZ);

                particles.vertices.push(particle);

                particle.velocity = new THREE.Vector3(velx, vely, velz);

            }

        } else {
            var pX = x,
                pY = y,
                pZ = z,
                particle = new THREE.Vertex(new THREE.Vector3(pX, pY, pZ));
            // 将粒子加入粒子geometry 
            particles.vertices.push(particle);
            particle.velocity = new THREE.Vector3(velx, vely, velz);
        }
    } else if (type < 64) {

        if (count > 1) {
            var m_px = (arr[17] - tpx) / particleCount;
            var m_py = (arr[18] - tpy) / particleCount;
            var m_pz = (arr[19] - tpz) / particleCount;
            for (var p = 0; p < particleCount; p++) {
                // 粒子范围在-250到250之间 

                var pX = p * m_px,
                    pY = p * m_py,
                    pZ = p * m_pz,
                    particle = new THREE.Vertex(new THREE.Vector3(pX, pY, pZ));
                // 将粒子加入粒子geometry 
                particles.vertices.push(particle);
                particle.velocity = new THREE.Vector3(velx, vely, velz);
            }
        } else {
            var pX = x,
                pY = y,
                pZ = z,
                particle = new THREE.Vertex(new THREE.Vector3(pX, pY, pZ));
            // 将粒子加入粒子geometry 
            particles.vertices.push(particle);
            particle.velocity = new THREE.Vector3(velx, vely, velz);
        }

    } else if (type < 96) {

        if (count > 1) {
            var material = new THREE.SpriteMaterial({
                map: THREE.ImageUtils.loadTexture(img),
                blending: THREE.AdditiveBlending
            });
            for (var p = 0; p < particleCount; p++) {
                // 粒子范围在-250到250之间 

                var pX = 0,
                    pY = 0,
                    pZ = 0,
                    particle = new THREE.Vertex(new THREE.Vector3(pX, pY, pZ));
                //  this.initParticle(particle,p*10);
                // 将粒子加入粒子geometry 
                particles.vertices.push(particle);

                // 将粒子加入粒子geometry 
                // m_dis.add(particle);
                // particles.vertices.push(particle);
                particle.velocity = new THREE.Vector3(Math.random() * 4 - 2, Math.random() * 2, Math.random() * 4 - 2);

            }
        }
    } else if (type < 128) {

        if (count > 1) {
            var m_px = (arr[17] - tpx) / particleCount;
            var m_py = (arr[18] - tpy) / particleCount;
            var m_pz = (arr[19] - tpz) / particleCount;

            for (var p = 0; p < particleCount; p++) {
                //                // 粒子范围在-250到250之间 

                var pX = p * m_px,
                    pY = p * m_py,
                    pZ = p * m_pz,
                    Pos = new THREE.Vector3(pX, pY, pZ);
                //                // 将粒子加入粒子geometry 
                //               // particles.vertices.push(particle);
                //               // particle.velocity = new THREE.Vector3(velx, vely, velz);
                var Ydir = new THREE.Vector3(0, 1, 0);
                var origin = new THREE.Vector3(0, 0, 0);


                var m_Arrow = new THREE.ArrowHelper(Ydir, origin, size, color);


                m_Arrow.children[0].material = pMaterial;
                m_Arrow.children[1].material = pMaterial;
                m_Arrow.name = name + "_child" + p;
                m_Arrow.position.x = Pos.x;
                m_Arrow.position.y = Pos.y;
                m_Arrow.position.z = Pos.z;
                m_Object.add(m_Arrow);

                //particles.add(m_Arrow);
            }
        } else {
            var pX = x,
                pY = y,
                pZ = z,
                Pos = new THREE.Vertex(new THREE.Vector3(pX, pY, pZ));
            // 将粒子加入粒子geometry 
            var Ydir = new THREE.Vector3(0, -1, 0);
            var origin = new THREE.Vector3(0, 0, 0);
            var m_Arrow = new THREE.ArrowHelper(Ydir, origin, size, color);
            m_Arrow.name = name + "_child1";
            m_Arrow.position = Pos;
            m_Object.add(m_Arrow);
        }
    }
    // alert(333);

    // 创建粒子系统 

    if (type < 96) {



        // pMaterial.color.setHSL(1, 0.2, 0.5);
        var particles = new THREE.Points(particles, pMaterial);
        particles.name = name;
        particles.position.x = x;
        particles.position.y = y;
        particles.position.z = z;
        particles.rotation.x = Num_Radian(rx);
        particles.rotation.y = Num_Radian(ry);
        particles.rotation.z = Num_Radian(rz);
        this.obj = particles;
      //  particles.visible = false;
        m_dis.add(this.obj);

        //   this.SeachNode(particles);


    } else if (type < 128) {

        m_Object.name = name;
        m_Object.position.x = x;
        m_Object.position.y = y;
        m_Object.position.z = z;
        m_Object.rotation.x = Num_Radian(rx);
        m_Object.rotation.y = Num_Radian(ry);
        m_Object.rotation.z = Num_Radian(rz);
        m_dis.add(m_Object);
        this.obj = m_Object;

        this.SeachNode(m_Object);

    }




};



Psarticle_Effect.prototype.Psarticle_Animation_96 = function (obj, m_arr, Animation_Radian) {

    for (var i = 0; i < obj.children.length; i++) {
        child = obj.children[i];


        if (child.position.x > m_arr[17]) {

            child.position.x = m_arr[11];



        }
        if (child.position.y > m_arr[18]) {
            child.position.y = m_arr[12];

        }
        if (child.position.z > m_arr[19]) {
            child.position.z = m_arr[13];

        }

        child.position.x += m_arr[8];
        child.position.y += m_arr[9];
        child.position.z += m_arr[10];

    }


};
Psarticle_Effect.prototype.Psarticle_Animation_97 = function (obj, m_arr, Animation_Radian) {

    for (var i = 0; i < obj.children.length; i++) {
        child = obj.children[i];


        if (child.position.x > m_arr[17]) {

            child.position.x = 0;



        }
        if (child.position.y > m_arr[18]) {
            child.position.y = 0;

        }
        if (child.position.z > m_arr[19]) {
            child.position.z = 0;

        }

        child.position.x += (Math.random() * 10) * m_arr[8];
        child.position.y += (Math.random() * 10) * m_arr[9];
        child.position.z += (Math.random() * 10) * m_arr[10];

    }


};


Psarticle_Effect.prototype.Psarticle_SetInterval = function (obj, m_arr) {
    if (m_arr[22] == 96) {

        this.m_InterNum = setInterval(this.Psarticle_Animation_96, 100, obj, m_arr, this);
    } else if (m_arr[22] == 97) {

        this.m_InterNum = setInterval(this.Psarticle_Animation_97, 100, obj, m_arr, this);
    }

};
Psarticle_Effect.prototype.SeachNode = function (obj) {
   
    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {
        if (m_VarGlobal.m_XMLWall[i] != "") {
            var m_arr = m_VarGlobal.m_XMLWall[i];

            if (m_arr[0] == "Psarticle" && obj.name == m_arr[1]) {
                // alert(m_arr[19])
                if (m_arr[19] > 0 && m_arr[18] > 0 && m_arr[17] > 0) {
                    
                    this.Psarticle_SetInterval(obj, m_arr);
                }
            }

        }
    }
}
Psarticle_Effect.prototype.updata = function () {
   // alert(this.m_type);
    if (this.m_type < 96) {

        if (this.obj) {

            this.obj.geometry.verticesNeedUpdate = true;

            var pCount = this.obj.geometry.vertices.length;

            while (pCount--) {
                // 获取单个粒子 
                // alert(obj.geometry.vertices.length);
                var particle = this.obj.geometry.vertices[pCount];
                //  alert(23);
                if (particle.x > this.m_dpx) {

                    particle.x = Math.random() * this.m_tpx;



                }
                if (particle.y > this.m_dpy) {
                    particle.y = Math.random() * this.m_tpy;


                }
                if (particle.z > this.m_dpz) {
                    particle.z = Math.random() * this.m_tpz;

                }

                particle.x += this.m_velx;
                particle.y += this.m_vely;
                particle.z += this.m_velz;
                //  alert(particle.y);

            }
        }
    } else if (this.m_type < 128) {

//        for (var i = 0; i < this.obj.children.length; i++) {
//            child = this.obj.children[i];
//            //  alert(child);

//            if (child.position.x > this.m_dpx) {

//                child.position.x = this.m_tpx;



//            }
//            if (child.position.y > this.m_dpy) {
//                child.position.y = this.m_tpy;

//            }
//            if (child.position.z > this.m_dpz) {
//                child.position.z = this.m_tpz;

//            }

//            child.position.x += this.m_velx;
//            child.position.y += this.m_vely;
//            child.position.z += this.m_velz;

//        }
    }
}
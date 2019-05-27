var LoadObjClass = function () {
    THREE.EventDispatcher.call(this);
  
    this.m_dis = null;
};
//STL 加载模型
var LoadObj_STL = function () {
    LoadObjClass.call(this);
  
}
LoadObj_STL.prototype = Object.create(LoadObjClass.prototype);
///加载 STL文件
LoadObj_STL.prototype.load = function (url, callback) {
   
    var scope = this;
    var request = new XMLHttpRequest();
  
    function onloaded(event) {
      
        if (event.target.status === 200 || event.target.status === 0) {
            
            var geometry = scope.parse(event.target.response);

          //  alert(callback);

            if (callback) callback(geometry);
        } else {

            scope.dispatchEvent({ type: 'error', message: 'Couldn\'t load URL [' + url + ']',
                response: event.target.responseText
            });

        }

    }
    request.addEventListener('load', onloaded, false);
    request.addEventListener('progress', function (event) {

        scope.dispatchEvent({ type: 'progress', loaded: event.loaded, total: event.total });

    }, false);

    request.addEventListener('error', function () {

        scope.dispatchEvent({ type: 'error', message: 'Couldn\'t load URL [' + url + ']' });

    }, false);
   
    request.open('GET', url, true);
    request.responseType = "arraybuffer";
    request.send(null);

};
///转码 STL文件
LoadObj_STL.prototype.parse = function (buf) {

    if (this.isASCII(buf)) {
        var str = this.bin2str(buf);
        
        return this.parseASCII(str);
    }
    else {
        return this.parseBinary(buf);

    }


};
///转码 数组->String
LoadObj_STL.prototype.bin2str=function (buf) {

    var array_buffer = new Uint8Array(buf);
    var str = '';
    for (var i = 0; i < buf.byteLength; i++) {
        str += String.fromCharCode(array_buffer[i]); // implicitly assumes little-endian
    }
    return str

}
///转码 ASC2转码
LoadObj_STL.prototype.isASCII=function (buf) {

    var dv = new DataView(buf);
    var str = '';
    for (var i = 0; i < 5; i++) {
        str += String.fromCharCode(dv.getUint8(i, true)); // assume little-endian
    }
    return (str.toLowerCase() === 'solid'); // All ASCII stl files begin with 'solid'

}
///转码 设置STL 文本格式
LoadObj_STL.prototype.parseASCII= function (data) {

    var geometry = new THREE.Geometry();

    var patternFace = /facet([\s\S]*?)endfacet/g;
    var result;
    
    while ((result = patternFace.exec(data)) != null) {

        var text = result[0];

        // Normal
        var patternNormal = /normal[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g;

        while ((result = patternNormal.exec(text)) != null) {

            var normal = new THREE.Vector3(parseFloat(result[1]), parseFloat(result[3]), parseFloat(result[5]));

        }

        // Vertex
        var patternVertex = /vertex[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g;

        while ((result = patternVertex.exec(text)) != null) {

            geometry.vertices.push(new THREE.Vector3(parseFloat(result[1]), parseFloat(result[3]), parseFloat(result[5])));

        }

        var len = geometry.vertices.length;
        geometry.faces.push(new THREE.Face3(len - 3, len - 2, len - 1, normal));

    }
   
    geometry.computeCentroids();
    geometry.computeBoundingSphere();
   
    return geometry;

}
///转码 设置STL 二进制流格式
LoadObj_STL.prototype.parseBinary= function (buf) {

   
    
    var geometry = new THREE.Geometry();

    var headerLength = 80;
    var dataOffset = 84;
    var faceLength = 12 * 4 + 2;

    var le = true; // is little-endian  // This might be processor dependent...

    // var header = new Uint8Array(buf, 0, headerLength); // not presently used
    var dvTriangleCount = new DataView(buf, headerLength, 4);
    var numTriangles = dvTriangleCount.getUint32(0, le);
   
    for (var i = 0; i < numTriangles; i++) {

        var dv = new DataView(buf, dataOffset + i * faceLength, faceLength);

        var normal = new THREE.Vector3(dv.getFloat32(0, le), dv.getFloat32(4, le), dv.getFloat32(8, le));

        for (var v = 3; v < 12; v += 3) {

            geometry.vertices.push(new THREE.Vector3(dv.getFloat32(v * 4, le), dv.getFloat32((v + 1) * 4, le), dv.getFloat32((v + 2) * 4, le)));

        }
        var len = geometry.vertices.length;
        geometry.faces.push(new THREE.Face3(len - 3, len - 2, len - 1, normal));
    }
  
    geometry.computeCentroids();
    geometry.computeBoundingSphere();
    
    return geometry;
}
//OBJ 加载模型
var LoadObj_OBJ = function () {
    
    LoadObjClass.call(this);

    
}
LoadObj_OBJ.prototype = Object.create(LoadObjClass.prototype);

LoadObj_OBJ.prototype.load = function (name, url, callback) {

    var scope = this;
    var request = new XMLHttpRequest();

    request.addEventListener('load', function (event) {

        var content = event.target.response;
       
        var newZip = new JSZip();

        var m = newZip.loadAsync(content).then(function (content) {
          
            var m_zipname = url;
            for (var i = 0; ; i++) {
                if (m_zipname.indexOf("/") == -1) {
                    break;
                }

                m_zipname = m_zipname.substring(m_zipname.indexOf("/") + 1, m_zipname.length);

            }

            m_zipname = m_zipname.replace(".zlf", ".obj");
           
            var newContent = newZip.file(m_zipname).async("string").then(function (content) {
//                var loader = new THREE.OBJLoader();
                //                alert(THREE.OBJLoader)

                var hierarchy = new THREE.OBJLoader().parse(content);
               
                this.m_dis = hierarchy;

                if (callback) callback(hierarchy, url, name);
                // document.getElementById("test_div").innerHTML = content;
            });
        });
        return;


    }, false);

    request.addEventListener('progress', function (event) {

        scope.dispatchEvent({ type: 'progress', loaded: event.loaded, total: event.total });

    }, false);

    request.addEventListener('error', function () {

        scope.dispatchEvent({ type: 'error', message: 'Couldn\'t load URL [' + url + ']' });

    }, false);

    request.open('GET', url, true);
    request.responseType = "arraybuffer";
    request.send(null);

};

///转码 OBJ文件格式
LoadObj_OBJ.prototype.parse = function (data) {

    // fixes

    data = data.replace(/\ \\\r\n/g, ''); // rhino adds ' \\r\n' some times.

    //

    function vector(x, y, z) {

        return new THREE.Vector3(x, y, z);

    }

    function uv(u, v) {

        return new THREE.Vector2(u, v);

    }

    function face3(a, b, c, normals) {

        return new THREE.Face3(a, b, c, normals);

    }

    function face4(a, b, c, d, normals) {

        return new THREE.Face4(a, b, c, d, normals);

    }

    function meshN(meshName, materialName) {

        if (geometry.vertices.length > 0) {

            geometry.mergeVertices();
           
           // geometry.computeCentroids();
          
            geometry.computeFaceNormals();

            geometry.computeBoundingSphere();

            object.add(mesh);

            geometry = new THREE.Geometry();
            mesh = new THREE.Mesh(geometry, material);

            verticesCount = 0;

        }

        if (meshName !== undefined) mesh.name = meshName;

        if (materialName !== undefined) {

            material = new THREE.MeshLambertMaterial();
            material.name = materialName;

            mesh.material = material;

        }

    }

    var group = new THREE.Object3D();
    var object = group;

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshLambertMaterial();
    var mesh = new THREE.Mesh(geometry, material);

    var vertices = [];
    var verticesCount = 0;
    var normals = [];
    var uvs = [];

    // v float float float

    var vertex_pattern = /v( +[\d|\.|\+|\-|e]+)( [\d|\.|\+|\-|e]+)( [\d|\.|\+|\-|e]+)/;

    // vn float float float

    var normal_pattern = /vn( +[\d|\.|\+|\-|e]+)( [\d|\.|\+|\-|e]+)( [\d|\.|\+|\-|e]+)/;

    // vt float float

    var uv_pattern = /vt( +[\d|\.|\+|\-|e]+)( [\d|\.|\+|\-|e]+)/;

    // f vertex vertex vertex ...

    var face_pattern1 = /f( +[\d]+)( [\d]+)( [\d]+)( [\d]+)?/;

    // f vertex/uv vertex/uv vertex/uv ...

    var face_pattern2 = /f( +([\d]+)\/([\d]+))( ([\d]+)\/([\d]+))( ([\d]+)\/([\d]+))( ([\d]+)\/([\d]+))?/;

    // f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...

    var face_pattern3 = /f( +([\d]+)\/([\d]+)\/([\d]+))( ([\d]+)\/([\d]+)\/([\d]+))( ([\d]+)\/([\d]+)\/([\d]+))( ([\d]+)\/([\d]+)\/([\d]+))?/;

    // f vertex//normal vertex//normal vertex//normal ...

    var face_pattern4 = /f( +([\d]+)\/\/([\d]+))( ([\d]+)\/\/([\d]+))( ([\d]+)\/\/([\d]+))( ([\d]+)\/\/([\d]+))?/;

    //

    var lines = data.split("\n");

    for (var i = 0; i < lines.length; i++) {

        var line = lines[i];
        line = line.trim();

        var result;

        if (line.length === 0 || line.charAt(0) === '#') {

            continue;

        } else if ((result = vertex_pattern.exec(line)) !== null) {

            // ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

            vertices.push(vector(
					parseFloat(result[1]),
					parseFloat(result[2]),
					parseFloat(result[3])
				));

        } else if ((result = normal_pattern.exec(line)) !== null) {

            // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

            normals.push(vector(
					parseFloat(result[1]),
					parseFloat(result[2]),
					parseFloat(result[3])
				));

        } else if ((result = uv_pattern.exec(line)) !== null) {

            // ["vt 0.1 0.2", "0.1", "0.2"]

            uvs.push(uv(
					parseFloat(result[1]),
					parseFloat(result[2])
				));

        } else if ((result = face_pattern1.exec(line)) !== null) {

            // ["f 1 2 3", "1", "2", "3", undefined]

            if (result[4] === undefined) {

                geometry.vertices.push(
						vertices[parseInt(result[1]) - 1],
						vertices[parseInt(result[2]) - 1],
						vertices[parseInt(result[3]) - 1]
					);

                geometry.faces.push(face3(
						verticesCount++,
						verticesCount++,
						verticesCount++
					));

            } else {

                geometry.vertices.push(
						vertices[parseInt(result[1]) - 1],
						vertices[parseInt(result[2]) - 1],
						vertices[parseInt(result[3]) - 1],
						vertices[parseInt(result[4]) - 1]
					);

                geometry.faces.push(face4(
						verticesCount++,
						verticesCount++,
						verticesCount++,
						verticesCount++
					));

            }

        } else if ((result = face_pattern2.exec(line)) !== null) {

            // ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]

            if (result[10] === undefined) {

                geometry.vertices.push(
						vertices[parseInt(result[2]) - 1],
						vertices[parseInt(result[5]) - 1],
						vertices[parseInt(result[8]) - 1]
					);

                geometry.faces.push(face3(
						verticesCount++,
						verticesCount++,
						verticesCount++
					));

                geometry.faceVertexUvs[0].push([
						uvs[parseInt(result[3]) - 1],
						uvs[parseInt(result[6]) - 1],
						uvs[parseInt(result[9]) - 1]
					]);

            } else {

                geometry.vertices.push(
						vertices[parseInt(result[2]) - 1],
						vertices[parseInt(result[5]) - 1],
						vertices[parseInt(result[8]) - 1],
						vertices[parseInt(result[11]) - 1]
					);

                geometry.faces.push(face4(
						verticesCount++,
						verticesCount++,
						verticesCount++,
						verticesCount++
					));

                geometry.faceVertexUvs[0].push([
						uvs[parseInt(result[3]) - 1],
						uvs[parseInt(result[6]) - 1],
						uvs[parseInt(result[9]) - 1],
						uvs[parseInt(result[12]) - 1]
					]);

            }

        } else if ((result = face_pattern3.exec(line)) !== null) {

            // ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]

            if (result[13] === undefined) {

                geometry.vertices.push(
						vertices[parseInt(result[2]) - 1],
						vertices[parseInt(result[6]) - 1],
						vertices[parseInt(result[10]) - 1]
					);

                geometry.faces.push(face3(
						verticesCount++,
						verticesCount++,
						verticesCount++,
						[
							normals[parseInt(result[4]) - 1],
							normals[parseInt(result[8]) - 1],
							normals[parseInt(result[12]) - 1]
						]
					));

                geometry.faceVertexUvs[0].push([
						uvs[parseInt(result[3]) - 1],
						uvs[parseInt(result[7]) - 1],
						uvs[parseInt(result[11]) - 1]
					]);

            } else {

                geometry.vertices.push(
						vertices[parseInt(result[2]) - 1],
						vertices[parseInt(result[6]) - 1],
						vertices[parseInt(result[10]) - 1],
						vertices[parseInt(result[14]) - 1]
					);

                geometry.faces.push(face4(
						verticesCount++,
						verticesCount++,
						verticesCount++,
						verticesCount++,
						[
							normals[parseInt(result[4]) - 1],
							normals[parseInt(result[8]) - 1],
							normals[parseInt(result[12]) - 1],
							normals[parseInt(result[16]) - 1]
						]
					));

                geometry.faceVertexUvs[0].push([
						uvs[parseInt(result[3]) - 1],
						uvs[parseInt(result[7]) - 1],
						uvs[parseInt(result[11]) - 1],
						uvs[parseInt(result[15]) - 1]
					]);

            }

        } else if ((result = face_pattern4.exec(line)) !== null) {

            // ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]

            if (result[10] === undefined) {

                geometry.vertices.push(
						vertices[parseInt(result[2]) - 1],
						vertices[parseInt(result[5]) - 1],
						vertices[parseInt(result[8]) - 1]
					);

                geometry.faces.push(face3(
						verticesCount++,
						verticesCount++,
						verticesCount++,
						[
							normals[parseInt(result[3]) - 1],
							normals[parseInt(result[6]) - 1],
							normals[parseInt(result[9]) - 1]
						]
					));

            } else {

                geometry.vertices.push(
						vertices[parseInt(result[2]) - 1],
						vertices[parseInt(result[5]) - 1],
						vertices[parseInt(result[8]) - 1],
						vertices[parseInt(result[11]) - 1]
					);

                geometry.faces.push(face4(
						verticesCount++,
						verticesCount++,
						verticesCount++,
						verticesCount++,
						[
							normals[parseInt(result[3]) - 1],
							normals[parseInt(result[6]) - 1],
							normals[parseInt(result[9]) - 1],
							normals[parseInt(result[12]) - 1]
						]
					));

            }

        } else if (/^o /.test(line)) {

            // object

            object = new THREE.Object3D();
            object.name = line.substring(2).trim();
            group.add(object);

        } else if (/^g /.test(line)) {

            // group

            meshN(line.substring(2).trim(), undefined);

        } else if (/^usemtl /.test(line)) {

            // material

            meshN(undefined, line.substring(7).trim());

        } else if (/^mtllib /.test(line)) {

            // mtl file

        } else if (/^s /.test(line)) {

            // smooth shading

        } else {

            // console.log( "THREE.OBJLoader: Unhandled line " + line );

        }

    }

    // add the last group
    
    meshN(undefined, undefined);
   
    return group;

}


THREE.OBJLoader = (function () {

    // o object_name | g group_name
    var object_pattern = /^[og]\s*(.+)?/;
    // mtllib file_reference
    var material_library_pattern = /^mtllib /;
    // usemtl material_name
    var material_use_pattern = /^usemtl /;

    function ParserState() {

        var state = {
            objects: [],
            object: {},

            vertices: [],
            normals: [],
            colors: [],
            uvs: [],

            materialLibraries: [],

            startObject: function (name, fromDeclaration) {

                // If the current object (initial from reset) is not from a g/o declaration in the parsed
                // file. We need to use it for the first parsed g/o to keep things in sync.
                if (this.object && this.object.fromDeclaration === false) {

                    this.object.name = name;
                    this.object.fromDeclaration = (fromDeclaration !== false);
                    return;

                }

                var previousMaterial = (this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined);

                if (this.object && typeof this.object._finalize === 'function') {

                    this.object._finalize(true);

                }

                this.object = {
                    name: name || '',
                    fromDeclaration: (fromDeclaration !== false),

                    geometry: {
                        vertices: [],
                        normals: [],
                        colors: [],
                        uvs: []
                    },
                    materials: [],
                    smooth: true,

                    startMaterial: function (name, libraries) {

                        var previous = this._finalize(false);

                        // New usemtl declaration overwrites an inherited material, except if faces were declared
                        // after the material, then it must be preserved for proper MultiMaterial continuation.
                        if (previous && (previous.inherited || previous.groupCount <= 0)) {

                            this.materials.splice(previous.index, 1);

                        }

                        var material = {
                            index: this.materials.length,
                            name: name || '',
                            mtllib: (Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : ''),
                            smooth: (previous !== undefined ? previous.smooth : this.smooth),
                            groupStart: (previous !== undefined ? previous.groupEnd : 0),
                            groupEnd: -1,
                            groupCount: -1,
                            inherited: false,

                            clone: function (index) {

                                var cloned = {
                                    index: (typeof index === 'number' ? index : this.index),
                                    name: this.name,
                                    mtllib: this.mtllib,
                                    smooth: this.smooth,
                                    groupStart: 0,
                                    groupEnd: -1,
                                    groupCount: -1,
                                    inherited: false
                                };
                                cloned.clone = this.clone.bind(cloned);
                                return cloned;

                            }
                        };

                        this.materials.push(material);

                        return material;

                    },

                    currentMaterial: function () {

                        if (this.materials.length > 0) {

                            return this.materials[this.materials.length - 1];

                        }

                        return undefined;

                    },

                    _finalize: function (end) {

                        var lastMultiMaterial = this.currentMaterial();
                        if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {

                            lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
                            lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
                            lastMultiMaterial.inherited = false;

                        }

                        // Ignore objects tail materials if no face declarations followed them before a new o/g started.
                        if (end && this.materials.length > 1) {

                            for (var mi = this.materials.length - 1; mi >= 0; mi--) {

                                if (this.materials[mi].groupCount <= 0) {

                                    this.materials.splice(mi, 1);

                                }

                            }

                        }

                        // Guarantee at least one empty material, this makes the creation later more straight forward.
                        if (end && this.materials.length === 0) {

                            this.materials.push({
                                name: '',
                                smooth: this.smooth
                            });

                        }

                        return lastMultiMaterial;

                    }
                };

                // Inherit previous objects material.
                // Spec tells us that a declared material must be set to all objects until a new material is declared.
                // If a usemtl declaration is encountered while this new object is being parsed, it will
                // overwrite the inherited material. Exception being that there was already face declarations
                // to the inherited material, then it will be preserved for proper MultiMaterial continuation.

                if (previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function') {

                    var declared = previousMaterial.clone(0);
                    declared.inherited = true;
                    this.object.materials.push(declared);

                }

                this.objects.push(this.object);

            },

            finalize: function () {

                if (this.object && typeof this.object._finalize === 'function') {

                    this.object._finalize(true);

                }

            },

            parseVertexIndex: function (value, len) {

                var index = parseInt(value, 10);
                return (index >= 0 ? index - 1 : index + len / 3) * 3;

            },

            parseNormalIndex: function (value, len) {

                var index = parseInt(value, 10);
                return (index >= 0 ? index - 1 : index + len / 3) * 3;

            },

            parseUVIndex: function (value, len) {

                var index = parseInt(value, 10);
                return (index >= 0 ? index - 1 : index + len / 2) * 2;

            },

            addVertex: function (a, b, c) {

                var src = this.vertices;
                var dst = this.object.geometry.vertices;

                dst.push(src[a + 0], src[a + 1], src[a + 2]);
                dst.push(src[b + 0], src[b + 1], src[b + 2]);
                dst.push(src[c + 0], src[c + 1], src[c + 2]);

            },

            addVertexLine: function (a) {

                var src = this.vertices;
                var dst = this.object.geometry.vertices;

                dst.push(src[a + 0], src[a + 1], src[a + 2]);

            },

            addNormal: function (a, b, c) {

                var src = this.normals;
                var dst = this.object.geometry.normals;

                dst.push(src[a + 0], src[a + 1], src[a + 2]);
                dst.push(src[b + 0], src[b + 1], src[b + 2]);
                dst.push(src[c + 0], src[c + 1], src[c + 2]);

            },

            addColor: function (a, b, c) {

                var src = this.colors;
                var dst = this.object.geometry.colors;

                dst.push(src[a + 0], src[a + 1], src[a + 2]);
                dst.push(src[b + 0], src[b + 1], src[b + 2]);
                dst.push(src[c + 0], src[c + 1], src[c + 2]);

            },

            addUV: function (a, b, c) {

                var src = this.uvs;
                var dst = this.object.geometry.uvs;

                dst.push(src[a + 0], src[a + 1]);
                dst.push(src[b + 0], src[b + 1]);
                dst.push(src[c + 0], src[c + 1]);

            },

            addUVLine: function (a) {

                var src = this.uvs;
                var dst = this.object.geometry.uvs;

                dst.push(src[a + 0], src[a + 1]);

            },

            addFace: function (a, b, c, ua, ub, uc, na, nb, nc) {

                var vLen = this.vertices.length;

                var ia = this.parseVertexIndex(a, vLen);
                var ib = this.parseVertexIndex(b, vLen);
                var ic = this.parseVertexIndex(c, vLen);

                this.addVertex(ia, ib, ic);

                if (ua !== undefined) {

                    var uvLen = this.uvs.length;

                    ia = this.parseUVIndex(ua, uvLen);
                    ib = this.parseUVIndex(ub, uvLen);
                    ic = this.parseUVIndex(uc, uvLen);

                    this.addUV(ia, ib, ic);

                }

                if (na !== undefined) {

                    // Normals are many times the same. If so, skip function call and parseInt.
                    var nLen = this.normals.length;
                    ia = this.parseNormalIndex(na, nLen);

                    ib = na === nb ? ia : this.parseNormalIndex(nb, nLen);
                    ic = na === nc ? ia : this.parseNormalIndex(nc, nLen);

                    this.addNormal(ia, ib, ic);

                }

                if (this.colors.length > 0) {

                    this.addColor(ia, ib, ic);

                }

            },

            addLineGeometry: function (vertices, uvs) {

                this.object.geometry.type = 'Line';

                var vLen = this.vertices.length;
                var uvLen = this.uvs.length;

                for (var vi = 0, l = vertices.length; vi < l; vi++) {

                    this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));

                }

                for (var uvi = 0, l = uvs.length; uvi < l; uvi++) {

                    this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));

                }

            }

        };

        state.startObject('', false);

        return state;

    }

    //

    function OBJLoader(manager) {

        this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;

        this.materials = null;

    }

    OBJLoader.prototype = {

        constructor: OBJLoader,

        load: function (url, onLoad, onProgress, onError) {

            var scope = this;

            var loader = new THREE.FileLoader(scope.manager);
            loader.setPath(this.path);
            loader.load(url, function (text) {

                //var content = text;
                var newZip = new JSZip();

                var content = text;
                // alert(content.length);
                alert(newZip.loadAsync(content))
                var m = newZip.loadAsync(content).then(function (content) {
                    alert(123);
                    //                    var m_zipname = url;
                    //                    for (var i = 0; ; i++) {
                    //                        if (m_zipname.indexOf("/") == -1) {
                    //                            break;
                    //                        }

                    //                        m_zipname = m_zipname.substring(m_zipname.indexOf("/") + 1, m_zipname.length);

                    //                    }

                    //                    m_zipname = m_zipname.replace(".zlf", ".obj");

                    //                    var newContent = newZip.file(m_zipname).async("string").then(function (content) {

                    //                        var hierarchy = scope.parse(content);

                    //                        this.m_dis = hierarchy;

                    //                        if (callback) callback(hierarchy, url, name);
                    //                        // document.getElementById("test_div").innerHTML = content;
                    //                    });
                });
                alert(22222);
                onLoad(scope.parse(text));

            }, onProgress, onError);

        },

        setPath: function (value) {

            this.path = value;

        },

        setMaterials: function (materials) {

            this.materials = materials;

            return this;

        },

        parse: function (text) {

            console.time('OBJLoader');

            var state = new ParserState();

            if (text.indexOf('\r\n') !== -1) {

                // This is faster than String.split with regex that splits on both
                text = text.replace(/\r\n/g, '\n');

            }

            if (text.indexOf('\\\n') !== -1) {

                // join lines separated by a line continuation character (\)
                text = text.replace(/\\\n/g, '');

            }

            var lines = text.split('\n');
            var line = '', lineFirstChar = '';
            var lineLength = 0;
            var result = [];

            // Faster to just trim left side of the line. Use if available.
            var trimLeft = (typeof ''.trimLeft === 'function');

            for (var i = 0, l = lines.length; i < l; i++) {

                line = lines[i];

                line = trimLeft ? line.trimLeft() : line.trim();

                lineLength = line.length;

                if (lineLength === 0) continue;

                lineFirstChar = line.charAt(0);

                // @todo invoke passed in handler if any
                if (lineFirstChar === '#') continue;

                if (lineFirstChar === 'v') {

                    var data = line.split(/\s+/);

                    switch (data[0]) {

                        case 'v':
                            state.vertices.push(
								parseFloat(data[1]),
								parseFloat(data[2]),
								parseFloat(data[3])
							);
                            if (data.length === 8) {

                                state.colors.push(
									parseFloat(data[4]),
									parseFloat(data[5]),
									parseFloat(data[6])

								);

                            }
                            break;
                        case 'vn':
                            state.normals.push(
								parseFloat(data[1]),
								parseFloat(data[2]),
								parseFloat(data[3])
							);
                            break;
                        case 'vt':
                            state.uvs.push(
								parseFloat(data[1]),
								parseFloat(data[2])
							);
                            break;

                    }

                } else if (lineFirstChar === 'f') {

                    var lineData = line.substr(1).trim();
                    var vertexData = lineData.split(/\s+/);
                    var faceVertices = [];

                    // Parse the face vertex data into an easy to work with format

                    for (var j = 0, jl = vertexData.length; j < jl; j++) {

                        var vertex = vertexData[j];

                        if (vertex.length > 0) {

                            var vertexParts = vertex.split('/');
                            faceVertices.push(vertexParts);

                        }

                    }

                    // Draw an edge between the first vertex and all subsequent vertices to form an n-gon

                    var v1 = faceVertices[0];

                    for (var j = 1, jl = faceVertices.length - 1; j < jl; j++) {

                        var v2 = faceVertices[j];
                        var v3 = faceVertices[j + 1];

                        state.addFace(
							v1[0], v2[0], v3[0],
							v1[1], v2[1], v3[1],
							v1[2], v2[2], v3[2]
						);

                    }

                } else if (lineFirstChar === 'l') {

                    var lineParts = line.substring(1).trim().split(" ");
                    var lineVertices = [], lineUVs = [];

                    if (line.indexOf("/") === -1) {

                        lineVertices = lineParts;

                    } else {

                        for (var li = 0, llen = lineParts.length; li < llen; li++) {

                            var parts = lineParts[li].split("/");

                            if (parts[0] !== "") lineVertices.push(parts[0]);
                            if (parts[1] !== "") lineUVs.push(parts[1]);

                        }

                    }
                    state.addLineGeometry(lineVertices, lineUVs);

                } else if ((result = object_pattern.exec(line)) !== null) {

                    // o object_name
                    // or
                    // g group_name

                    // WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
                    // var name = result[ 0 ].substr( 1 ).trim();
                    var name = (" " + result[0].substr(1).trim()).substr(1);

                    state.startObject(name);

                } else if (material_use_pattern.test(line)) {

                    // material

                    state.object.startMaterial(line.substring(7).trim(), state.materialLibraries);

                } else if (material_library_pattern.test(line)) {

                    // mtl file

                    state.materialLibraries.push(line.substring(7).trim());

                } else if (lineFirstChar === 's') {

                    result = line.split(' ');

                    // smooth shading

                    // @todo Handle files that have varying smooth values for a set of faces inside one geometry,
                    // but does not define a usemtl for each face set.
                    // This should be detected and a dummy material created (later MultiMaterial and geometry groups).
                    // This requires some care to not create extra material on each smooth value for "normal" obj files.
                    // where explicit usemtl defines geometry groups.
                    // Example asset: examples/models/obj/cerberus/Cerberus.obj

                    /*
                    * http://paulbourke.net/dataformats/obj/
                    * or
                    * http://www.cs.utah.edu/~boulos/cs3505/obj_spec.pdf
                    *
                    * From chapter "Grouping" Syntax explanation "s group_number":
                    * "group_number is the smoothing group number. To turn off smoothing groups, use a value of 0 or off.
                    * Polygonal elements use group numbers to put elements in different smoothing groups. For free-form
                    * surfaces, smoothing groups are either turned on or off; there is no difference between values greater
                    * than 0."
                    */
                    if (result.length > 1) {

                        var value = result[1].trim().toLowerCase();
                        state.object.smooth = (value !== '0' && value !== 'off');

                    } else {

                        // ZBrush can produce "s" lines #11707
                        state.object.smooth = true;

                    }
                    var material = state.object.currentMaterial();
                    if (material) material.smooth = state.object.smooth;

                } else {

                    // Handle null terminated files without exception
                    if (line === '\0') continue;

                    throw new Error('THREE.OBJLoader: Unexpected line: "' + line + '"');

                }

            }

            state.finalize();

            var container = new THREE.Group();
            container.materialLibraries = [].concat(state.materialLibraries);

            for (var i = 0, l = state.objects.length; i < l; i++) {

                var object = state.objects[i];
                var geometry = object.geometry;
                var materials = object.materials;
                var isLine = (geometry.type === 'Line');

                // Skip o/g line declarations that did not follow with any faces
                if (geometry.vertices.length === 0) continue;

                var buffergeometry = new THREE.BufferGeometry();

                buffergeometry.addAttribute('position', new THREE.Float32BufferAttribute(geometry.vertices, 3));

                if (geometry.normals.length > 0) {

                    buffergeometry.addAttribute('normal', new THREE.Float32BufferAttribute(geometry.normals, 3));

                } else {

                    buffergeometry.computeVertexNormals();

                }

                if (geometry.colors.length > 0) {

                    buffergeometry.addAttribute('color', new THREE.Float32BufferAttribute(geometry.colors, 3));

                }

                if (geometry.uvs.length > 0) {

                    buffergeometry.addAttribute('uv', new THREE.Float32BufferAttribute(geometry.uvs, 2));

                }

                // Create materials

                var createdMaterials = [];

                for (var mi = 0, miLen = materials.length; mi < miLen; mi++) {

                    var sourceMaterial = materials[mi];
                    var material = undefined;

                    if (this.materials !== null) {

                        material = this.materials.create(sourceMaterial.name);

                        // mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.
                        if (isLine && material && !(material instanceof THREE.LineBasicMaterial)) {

                            var materialLine = new THREE.LineBasicMaterial();
                            materialLine.copy(material);
                            material = materialLine;

                        }

                    }

                    if (!material) {

                        material = (!isLine ? new THREE.MeshPhongMaterial() : new THREE.LineBasicMaterial());
                        material.name = sourceMaterial.name;

                    }

                    material.flatShading = sourceMaterial.smooth ? false : true;

                    createdMaterials.push(material);

                }

                // Create mesh

                var mesh;

                if (createdMaterials.length > 1) {

                    for (var mi = 0, miLen = materials.length; mi < miLen; mi++) {

                        var sourceMaterial = materials[mi];
                        buffergeometry.addGroup(sourceMaterial.groupStart, sourceMaterial.groupCount, mi);

                    }

                    mesh = (!isLine ? new THREE.Mesh(buffergeometry, createdMaterials) : new THREE.LineSegments(buffergeometry, createdMaterials));

                } else {

                    mesh = (!isLine ? new THREE.Mesh(buffergeometry, createdMaterials[0]) : new THREE.LineSegments(buffergeometry, createdMaterials[0]));

                }

                mesh.name = object.name;

                container.add(mesh);

            }

            console.timeEnd('OBJLoader');

            return container;

        }

    };

    return OBJLoader;

})();
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="LoadXML_Standard.aspx.cs" Inherits="LoadXML" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<script  charset="gb2312" language="javascript"  type="text/javascript">
 function initXML() {

       var m_node=new Array();
        var m_length =<%=nodeList.Count%>
        
 
        
        <% for (var i=0;i<nodeList.Count;i++){%>
           
                
            var m_arr=new Array();
            <%if (nodeList[i].Name=="ModeChild"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push("<%=nodeList[i].Attributes["Root"].Value %>")//2 Root 根模型
                m_arr.push("<%=nodeList[i].Attributes["img"].Value %>")//3  img 贴图
                m_arr.push("<%=nodeList[i].Attributes["codenum"].Value %>")//4 codenum 材质编号
                m_arr.push(<%=nodeList[i].Attributes["iw"].Value %>)//5 图X数字
                m_arr.push(<%=nodeList[i].Attributes["ih"].Value %>)//6 图Y数字
               
               
               

             
            <%} %>
             <%if (nodeList[i].Name=="Animation"){ %>
            m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push("<%=nodeList[i].Attributes["type"].Value %>")//2 type 类型
                m_arr.push("<%=nodeList[i].Attributes["times"].Value %>")//3 x 时间
                m_arr.push("<%=nodeList[i].Attributes["values"].Value %>")//4 x 值
                m_arr.push("<%=nodeList[i].Attributes["Direction"].Value %>")//4 x 值
               
               
               

             
            <%} %>
              <%if (nodeList[i].Name=="Psarticle"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push(<%=nodeList[i].Attributes["x"].Value %>)//2 x 坐标
                m_arr.push(<%=nodeList[i].Attributes["y"].Value %>)//3 y 坐标
                m_arr.push(<%=nodeList[i].Attributes["z"].Value %>)//4 z 坐标
                m_arr.push(<%=nodeList[i].Attributes["Rx"].Value %>)//5 x 旋转
                m_arr.push(<%=nodeList[i].Attributes["Ry"].Value %>)//6 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["Rz"].Value %>)//7 z 旋转
            
                m_arr.push(<%=nodeList[i].Attributes["velx"].Value %>)//8 x 速度
                m_arr.push(<%=nodeList[i].Attributes["vely"].Value %>)//9 y 速度
                m_arr.push(<%=nodeList[i].Attributes["velz"].Value %>)//10 z  速度


                 m_arr.push(<%=nodeList[i].Attributes["tpx"].Value %>)//11 起点范围宽度
                m_arr.push(<%=nodeList[i].Attributes["tpy"].Value %>)//12 起点范围高都
                m_arr.push(<%=nodeList[i].Attributes["tpz"].Value %>)//13 起点范围厚度

                m_arr.push("<%=nodeList[i].Attributes["img"].Value %>")//14 贴图
                m_arr.push(<%=nodeList[i].Attributes["size"].Value %>)//15 贴图
                m_arr.push(<%=nodeList[i].Attributes["count"].Value %>)//16 贴图


                m_arr.push(<%=nodeList[i].Attributes["dpx"].Value %>)//17 终点范围宽度
                m_arr.push(<%=nodeList[i].Attributes["dpy"].Value %>)//18 终点范围高都
                m_arr.push(<%=nodeList[i].Attributes["dpz"].Value %>)//19 终点范围厚度

                 m_arr.push(<%=nodeList[i].Attributes["color"].Value %>)//20 颜色
                
                     m_arr.push(<%=nodeList[i].Attributes["transparent"].Value %>)//21 透明
             
               m_arr.push(<%=nodeList[i].Attributes["ptype"].Value %>)//22 类型
                m_arr.push(<%=nodeList[i].Attributes["Alpha"].Value %>)//23 透明度
             
            <%} %>
             <%if (nodeList[i].Name=="Mode"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push(<%=nodeList[i].Attributes["x"].Value %>)//2 x 坐标
                m_arr.push(<%=nodeList[i].Attributes["y"].Value %>)//3 y 坐标
                m_arr.push(<%=nodeList[i].Attributes["z"].Value %>)//4 z 坐标
                m_arr.push(<%=nodeList[i].Attributes["Rx"].Value %>)//5 x 旋转
                m_arr.push(<%=nodeList[i].Attributes["Ry"].Value %>)//6 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["Rz"].Value %>)//7 z 旋转
            
                m_arr.push(<%=nodeList[i].Attributes["SW"].Value %>)//8 宽度
                m_arr.push(<%=nodeList[i].Attributes["SH"].Value %>)//9 高都
                m_arr.push(<%=nodeList[i].Attributes["SD"].Value %>)//10 厚度

                m_arr.push("<%=nodeList[i].Attributes["img"].Value %>")//11 贴图
                m_arr.push("<%=nodeList[i].Attributes["url"].Value %>")//12 模型
                m_arr.push("<%=nodeList[i].Attributes["mm"].Value %>")//13 缩放方向

                 m_arr.push("<%=nodeList[i].Attributes["hw"].Value %>")//14 含水量
                m_arr.push("<%=nodeList[i].Attributes["fire"].Value %>")//15 热力值
                m_arr.push("<%=nodeList[i].Attributes["weight"].Value %>")//16 重量
                 m_arr.push("<%=nodeList[i].Attributes["Ltype"].Value %>")//17 垃圾类型
                 m_arr.push("<%=nodeList[i].Attributes["codenum"].Value %>")//18 材质类型
                 m_arr.push(<%=nodeList[i].Attributes["renderDepth"].Value %>)//19 深度参数
                m_arr.push(<%=nodeList[i].Attributes["castShadow"].Value %>)//20 阴影
                m_arr.push(<%=nodeList[i].Attributes["Reflective"].Value %>)//21反光
                 m_arr.push(<%=nodeList[i].Attributes["ReflectiveAlpha"].Value %>)//22反光透明度
              
             
            <%} %>
             <%if (nodeList[i].Name=="Mirror"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push(<%=nodeList[i].Attributes["x"].Value %>)//2 x 坐标
                m_arr.push(<%=nodeList[i].Attributes["y"].Value %>)//3 y 坐标
                m_arr.push(<%=nodeList[i].Attributes["z"].Value %>)//4 z 坐标
                 m_arr.push(<%=nodeList[i].Attributes["Rx"].Value %>)//5 x 旋转
                m_arr.push(<%=nodeList[i].Attributes["Ry"].Value %>)//6 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["Rz"].Value %>)//7 z 旋转
            
                m_arr.push(<%=nodeList[i].Attributes["SW"].Value %>)//8 宽度
                m_arr.push(<%=nodeList[i].Attributes["SH"].Value %>)//9 高都
                m_arr.push(<%=nodeList[i].Attributes["SD"].Value %>)//10 厚度
                m_arr.push("<%=nodeList[i].Attributes["type"].Value %>")//11 x 镜像类型 x,y,z
               
                m_arr.push("<%=nodeList[i].Attributes["LinkName"].Value %>")//12 镜像obj名称
              
             
            <%} %>
             <%if (nodeList[i].Name=="Animation_move"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push(<%=nodeList[i].Attributes["x"].Value %>)//2 x 坐标
                m_arr.push(<%=nodeList[i].Attributes["y"].Value %>)//3 y 坐标
                m_arr.push(<%=nodeList[i].Attributes["z"].Value %>)//4 z 坐标
                m_arr.push(<%=nodeList[i].Attributes["px"].Value %>)//5 x 终点坐标
                m_arr.push(<%=nodeList[i].Attributes["py"].Value %>)//6 y 终点坐标
                m_arr.push(<%=nodeList[i].Attributes["pz"].Value %>)//7 z 终点坐标
                m_arr.push(<%=nodeList[i].Attributes["Rx"].Value %>)//8 x 旋转
                m_arr.push(<%=nodeList[i].Attributes["Ry"].Value %>)//9 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["Rz"].Value %>)//10 z 旋转
            
                m_arr.push(<%=nodeList[i].Attributes["speedx"].Value %>)// 11 x 速度
                m_arr.push(<%=nodeList[i].Attributes["speedy"].Value %>)// 12 y 速度
                m_arr.push(<%=nodeList[i].Attributes["speedz"].Value %>)// 13 z 速度
              
               m_arr.push(<%=nodeList[i].Attributes["Cyclex"].Value %>)// 14 x 循环次数
               m_arr.push(<%=nodeList[i].Attributes["Cycley"].Value %>)// 15 y 循环次数
               m_arr.push(<%=nodeList[i].Attributes["Cyclez"].Value %>)// 16 z 循环次数

               m_arr.push(<%=nodeList[i].Attributes["index"].Value %>)// 17 循环编号
                 m_arr.push(<%=nodeList[i].Attributes["Cycle"].Value %>)// 18 总体次数
               
              
             
            <%} %>
             <%if (nodeList[i].Name=="Animation_Rotation"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
               
                m_arr.push(<%=nodeList[i].Attributes["Rx"].Value %>)//2 x 旋转
                m_arr.push(<%=nodeList[i].Attributes["Ry"].Value %>)//3 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["Rz"].Value %>)//4 z 旋转

                 m_arr.push(<%=nodeList[i].Attributes["px"].Value %>)//5x 旋转
                m_arr.push(<%=nodeList[i].Attributes["py"].Value %>)//6 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["pz"].Value %>)//7 z 旋转
            
                 m_arr.push(<%=nodeList[i].Attributes["speedx"].Value %>)// 8 x 速度
                m_arr.push(<%=nodeList[i].Attributes["speedy"].Value %>)// 9 y 速度
                m_arr.push(<%=nodeList[i].Attributes["speedz"].Value %>)// 10 z 速度

                m_arr.push(<%=nodeList[i].Attributes["Cyclex"].Value %>)// 11 x 循环次数
               m_arr.push(<%=nodeList[i].Attributes["Cycley"].Value %>)// 12 y 循环次数
               m_arr.push(<%=nodeList[i].Attributes["Cyclez"].Value %>)// 13 z 循环次数
              
              
             
            <%} %>
            <%else if (nodeList[i].Name=="Floor"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push(<%=nodeList[i].Attributes["x"].Value %>)//3 x 坐标
                m_arr.push(<%=nodeList[i].Attributes["y"].Value %>)//4 y 坐标
                m_arr.push(<%=nodeList[i].Attributes["z"].Value %>)//5 z 坐标
                m_arr.push(<%=nodeList[i].Attributes["Rx"].Value %>)//5 x 旋转
                m_arr.push(<%=nodeList[i].Attributes["Ry"].Value %>)//6 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["Rz"].Value %>)//7 z 旋转
            
                m_arr.push(<%=nodeList[i].Attributes["DW"].Value %>)//8 宽度
                m_arr.push(<%=nodeList[i].Attributes["DH"].Value %>)//9 高都
                m_arr.push(<%=nodeList[i].Attributes["DD"].Value %>)//10 厚度

                m_arr.push("<%=nodeList[i].Attributes["img"].Value %>")//11 贴图
                   
                m_arr.push(<%=nodeList[i].Attributes["iw"].Value %>)//12 图X数字
                m_arr.push(<%=nodeList[i].Attributes["ih"].Value %>)//13 图Y数字
                
             //  alert(44);
            <%} %>
             <%if (nodeList[i].Name=="Wall"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push(<%=nodeList[i].Attributes["x"].Value %>)//3 x 坐标
                m_arr.push(<%=nodeList[i].Attributes["y"].Value %>)//4 y 坐标
                m_arr.push(<%=nodeList[i].Attributes["z"].Value %>)//5 z 坐标
                m_arr.push(<%=nodeList[i].Attributes["Rx"].Value %>)//5 x 旋转
                m_arr.push(<%=nodeList[i].Attributes["Ry"].Value %>)//6 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["Rz"].Value %>)//7 z 旋转
            
                m_arr.push(<%=nodeList[i].Attributes["DW"].Value %>)//8 宽度
                m_arr.push(<%=nodeList[i].Attributes["DH"].Value %>)//9 高都
                m_arr.push(<%=nodeList[i].Attributes["DD"].Value %>)//10 厚度

                m_arr.push("<%=nodeList[i].Attributes["img"].Value %>")//11 贴图
                 m_arr.push("<%=nodeList[i].Attributes["codenum"].Value %>")//12 材质类型


                 m_arr.push(<%=nodeList[i].Attributes["iw"].Value %>)//13 图X数字
                 m_arr.push(<%=nodeList[i].Attributes["ih"].Value %>)//14 图Y数字
                   m_arr.push(<%=nodeList[i].Attributes["renderDepth"].Value %>)//15 深度参数
            <%} %>
             <%if (nodeList[i].Name=="Cylinder"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push(<%=nodeList[i].Attributes["x"].Value %>)//3 x 坐标
                m_arr.push(<%=nodeList[i].Attributes["y"].Value %>)//4 y 坐标
                m_arr.push(<%=nodeList[i].Attributes["z"].Value %>)//5 z 坐标
                m_arr.push(<%=nodeList[i].Attributes["Rx"].Value %>)//5 x 旋转
                m_arr.push(<%=nodeList[i].Attributes["Ry"].Value %>)//6 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["Rz"].Value %>)//7 z 旋转
            
                m_arr.push(<%=nodeList[i].Attributes["DW"].Value %>)//8 宽度
                m_arr.push(<%=nodeList[i].Attributes["DH"].Value %>)//9 高都
                m_arr.push(<%=nodeList[i].Attributes["DD"].Value %>)//10 厚度

                m_arr.push("<%=nodeList[i].Attributes["img"].Value %>")//11 贴图
                 m_arr.push("<%=nodeList[i].Attributes["codenum"].Value %>")//12 材质类型


                 m_arr.push(<%=nodeList[i].Attributes["iw"].Value %>)//13 图X数字
                 m_arr.push(<%=nodeList[i].Attributes["ih"].Value %>)//14 图Y数字


                  m_arr.push(<%=nodeList[i].Attributes["pw"].Value %>)//15 图X数字
                 m_arr.push(<%=nodeList[i].Attributes["ph"].Value %>)//16 图Y数字
                   m_arr.push(<%=nodeList[i].Attributes["renderDepth"].Value %>)//17 深度参数
            <%} %>
             <%else if (nodeList[i].Name=="Light"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push("<%=nodeList[i].Attributes["type"].Value %>")//2 类型
                m_arr.push(<%=nodeList[i].Attributes["x"].Value %>)//3 x 坐标
                m_arr.push(<%=nodeList[i].Attributes["y"].Value %>)//4 y 坐标
                m_arr.push(<%=nodeList[i].Attributes["z"].Value %>)//5 z 坐标
                m_arr.push(<%=nodeList[i].Attributes["color"].Value %>)// 6颜色
                 <% if (nodeList[i].Attributes["type"].Value=="DirectionLight"){ %>
                  
                    m_arr.push(<%=nodeList[i].Attributes["inten"].Value %>)// 7强度
                   
                  <%} %>
                   <% else if (nodeList[i].Attributes["type"].Value=="PointLight"){ %>
                   
                    m_arr.push(<%=nodeList[i].Attributes["inten"].Value %>)// 7强度
                    m_arr.push(<%=nodeList[i].Attributes["showbox"].Value %>)// 8 显示盒子
                    m_arr.push(<%=nodeList[i].Attributes["distance"].Value %>)// 9 距离
                  <%} %>
                   <% else if (nodeList[i].Attributes["type"].Value=="SpotLight"){ %>
                  
                    m_arr.push(<%=nodeList[i].Attributes["inten"].Value %>)// 7强度
                    m_arr.push(<%=nodeList[i].Attributes["angle"].Value %>)// 8角度
                    m_arr.push(<%=nodeList[i].Attributes["distance"].Value %>)// 9 距离
                    m_arr.push(<%=nodeList[i].Attributes["exponent"].Value %>)// 10 光线密度
                    m_arr.push(<%=nodeList[i].Attributes["tx"].Value %>)// 11 照射x坐标
                    m_arr.push(<%=nodeList[i].Attributes["ty"].Value %>)// 12 照射y坐标
                    m_arr.push(<%=nodeList[i].Attributes["tz"].Value %>)// 13 照射z坐标
                    m_arr.push(<%=nodeList[i].Attributes["near"].Value %>)// 14 近距离
                    m_arr.push(<%=nodeList[i].Attributes["far"].Value %>)// 15 元距离
                    m_arr.push(<%=nodeList[i].Attributes["showbox"].Value %>)// 16 显示盒子
                  <%} %>
            <%} %>
            <%else if (nodeList[i].Name=="Pic"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push(<%=nodeList[i].Attributes["x"].Value %>)//3 x 坐标
                m_arr.push(<%=nodeList[i].Attributes["y"].Value %>)//4 y 坐标
                m_arr.push(<%=nodeList[i].Attributes["z"].Value %>)//5 z 坐标
                m_arr.push(<%=nodeList[i].Attributes["Rx"].Value %>)//5 x 旋转
                m_arr.push(<%=nodeList[i].Attributes["Ry"].Value %>)//6 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["Rz"].Value %>)//7 z 旋转
            
                m_arr.push(<%=nodeList[i].Attributes["DW"].Value %>)//8 宽度
                m_arr.push(<%=nodeList[i].Attributes["DH"].Value %>)//9 高都
                m_arr.push(<%=nodeList[i].Attributes["DD"].Value %>)//10 厚度

                m_arr.push("<%=nodeList[i].Attributes["img"].Value %>")//11 贴图
                   
                m_arr.push(<%=nodeList[i].Attributes["iw"].Value %>)//12 图X数字
                m_arr.push(<%=nodeList[i].Attributes["ih"].Value %>)//13 图Y数字
                m_arr.push("<%=nodeList[i].Attributes["codenum"].Value %>")//14 材质类型
                  m_arr.push(<%=nodeList[i].Attributes["renderDepth"].Value %>)//15 深度参数
              
            <%} %>
            <%else if (nodeList[i].Name=="init"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push(<%=nodeList[i].Attributes["CameraX"].Value %>)//2 x 坐标
                m_arr.push(<%=nodeList[i].Attributes["CameraY"].Value %>)//3 y 坐标
                m_arr.push(<%=nodeList[i].Attributes["CameraZ"].Value %>)//4 z 坐标
                m_arr.push("<%=nodeList[i].Attributes["bgcolor"].Value %>")//5 x 旋转
                m_arr.push("<%=nodeList[i].Attributes["bgImage"].Value %>")//6 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["skyBox"].Value %>)//7 y 旋转
                m_arr.push("<%=nodeList[i].Attributes["skyBox1"].Value %>")//8 y 旋转
                m_arr.push("<%=nodeList[i].Attributes["skyBox2"].Value %>")//9 y 旋转
                m_arr.push("<%=nodeList[i].Attributes["skyBox3"].Value %>")//10 y 旋转
                m_arr.push("<%=nodeList[i].Attributes["skyBox4"].Value %>")//11 y 旋转
                m_arr.push("<%=nodeList[i].Attributes["skyBox5"].Value %>")//12 y 旋转
                m_arr.push("<%=nodeList[i].Attributes["skyBox6"].Value %>")//13 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["skyBoxSize"].Value %>)//14 y 旋转
               
             
             //  alert(44);
            <%} %>
            <%else if (nodeList[i].Name=="Material"){ %>
            
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push(<%=nodeList[i].Attributes["color"].Value %>)//3 diffuse 漫射颜色,默认初始化为0xffffff,白色  
                m_arr.push(<%=nodeList[i].Attributes["Reservedcolor"].Value %>)//4 预留颜色, 默认初始化为0x000000, 白色, 乘以环境光对象的颜色
                m_arr.push(<%=nodeList[i].Attributes["emissive"].Value %>)//5 自发光(荧光)颜色, 默认初始化为0x000000,黑色, 实体颜色,不受其他灯光的影响. 
                m_arr.push(<%=nodeList[i].Attributes["specular"].Value %>)//5 高光色, 默认初始化为0x111111,灰色, 材质发光区域的颜色,比如设置为漫射颜色,亮度加大,材质更像金属,设成灰色,使材质更像塑料.默认是灰色的.
                m_arr.push(<%=nodeList[i].Attributes["shininess"].Value %>)//6 高光的强度,默认是30, 数值越大,高光呈现出一个亮点. 
                m_arr.push(<%=nodeList[i].Attributes["ReserveValue"].Value %>)//7 
            
                m_arr.push(<%=nodeList[i].Attributes["skinning"].Value %>)//8
                m_arr.push(<%=nodeList[i].Attributes["Alpha"].Value %>)//9  透明度
                m_arr.push(<%=nodeList[i].Attributes["DoubleSide"].Value %>)//10 双面材质
              
                m_arr.push("<%=nodeList[i].Attributes["aoMap"].Value %>")//11 贴图
                m_arr.push(<%=nodeList[i].Attributes["envMap"].Value %>)//12  外反光贴图
                m_arr.push(<%=nodeList[i].Attributes["reflectivity"].Value %>)//13  反射率，默认为1，即全部反射
                m_arr.push(<%=nodeList[i].Attributes["refractionRatio"].Value %>)//14 折射率（即穿透物体一个单位长度后衰减的比率），可能用于透明物体
                
             
               m_arr.push("<%=nodeList[i].Attributes["normalMap"].Value %>")//15 贴图
               m_arr.push("<%=nodeList[i].Attributes["emissiveMap"].Value %>")//16 贴图
               m_arr.push("<%=nodeList[i].Attributes["specularMap"].Value %>")//17 贴图

           
          
            
            <%} %>
            <%if (nodeList[i].Name=="Scene"){ %>
                m_arr.push("<%=nodeList[i].Name %>")//0 类型
                m_arr.push("<%=nodeList[i].InnerText %>") //1名字
                m_arr.push(<%=nodeList[i].Attributes["x"].Value %>)//2 x 坐标
                m_arr.push(<%=nodeList[i].Attributes["y"].Value %>)//3 y 坐标
                m_arr.push(<%=nodeList[i].Attributes["z"].Value %>)//4 z 坐标
                m_arr.push(<%=nodeList[i].Attributes["Rx"].Value %>)//5 x 旋转
                m_arr.push(<%=nodeList[i].Attributes["Ry"].Value %>)//6 y 旋转
                m_arr.push(<%=nodeList[i].Attributes["Rz"].Value %>)//7 z 旋转
            
                m_arr.push(<%=nodeList[i].Attributes["SW"].Value %>)//8 x缩放
                m_arr.push(<%=nodeList[i].Attributes["SH"].Value %>)//9 y缩放
                m_arr.push(<%=nodeList[i].Attributes["SD"].Value %>)//10 z缩放


                m_arr.push(<%=nodeList[i].Attributes["CtrlMin_X"].Value %>)//11 x镜头最小范围
                m_arr.push(<%=nodeList[i].Attributes["CtrlMax_X"].Value %>)//12 x镜头最大范围
                m_arr.push(<%=nodeList[i].Attributes["CtrlMin_Y"].Value %>)//13 y镜头最小范围
                m_arr.push(<%=nodeList[i].Attributes["CtrlMax_Y"].Value %>)//14  y镜头最大范围
                m_arr.push(<%=nodeList[i].Attributes["CtrlMin_Z"].Value %>)//15 z镜头最小范围
                m_arr.push(<%=nodeList[i].Attributes["CtrlMax_Z"].Value %>)//16  z镜头最大范围

           
              
             
            <%} %>
            if (m_arr!=""){
             
            m_node.push(m_arr);
            }
         <%} %> 
       
        parent.OnloadXML(m_node)
    }
    //initXML();
    
</script>
<body  onload="initXML()">
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>

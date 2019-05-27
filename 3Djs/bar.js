        var m_loadpart = 0;
        var res = 0;
        var context = null;  //背景 环境
        var total_width = 962; //总宽�?
        var total_height = 24; //总高�?
        var initial_x = 20;   //初始值x
        var initial_y = 20;   //初始值y
        var m_part=0;
        var m_partPos = (total_width / 100) * m_part;
        var m_interval_step = 10;
        var m_divname = 'm_LoadingDiv';
        var m_CompleteLoad = 0;
        //半径
        
		var m_AlphaType=0;
        var radius = total_height/2;
		 
           window.onload = function() {
            var elem = document.getElementById('myCanvas');
            if (!elem || !elem.getContext) {
                return;
            }

            context = elem.getContext('2d');
            if (!context) {
                return;
            }

            // set font设置字体
            context.font = "10px Verdana";
          
            // Blue gradient for progress bar 进度条蓝色渐�?
            var progress_lingrad = context.createLinearGradient(0,initial_y+total_height,0,0); //创建一条线性颜色渐变xStart, yStart, xEnd, yEnd
            progress_lingrad.addColorStop(0,'#FFD701');   // 进度条bottom颜色 0
            progress_lingrad.addColorStop(0.5,'#eb6625'); // 进度条middle颜色 0.4
            progress_lingrad.addColorStop(0.6,'#FFFF00');   // 进度条top颜色 1 
            context.fillStyle = progress_lingrad;
           // alert(context);
          //  draw();
           SetLoop();
        }
       
        function SetLoop(){
            res = setInterval(draw, m_interval_step); //调用时间
        }
        function SetPartPos(num){



            m_interval_step = num;
          m_partPos = total_width;
        //  draw(80);

        }
        function SetClearInterval(){
         clearInterval(res);
        }
        function draw(num,name,type) {
        
          //  m_loadpart+=Math.floor(total_width/100);  //+1递增
            m_loadpart = total_width * num ;
            //alert(m_loadpart);
             if (m_loadpart>m_partPos){
              clearInterval(res);
              if (type == 0) {
                  document.getElementById("title_str").innerHTML = "ͼƬ������...";
              }
              if (type == 1) {
                  document.getElementById("title_str").innerHTML = "ģ�ͼ�����...";
              }
              
              
             }
            // Clear everything before drawing
             if (m_loadpart>=total_width) {
                  m_loadpart=total_width;
                  clearInterval(res);
                  //alert(parent.document.getElementById(s_name));
                  if (m_CompleteLoad == 0) {
                      m_CompleteLoad = 1;
                      parent.SetLoadingVisible(m_divname);
                  }
                  // parent.document.getElementById(s_name).style.display = 'none';
              //  return ;
            }
            context.clearRect(initial_x-5,initial_y-5,total_width+15,total_height+15);
            progressLayerRect(context, initial_x, initial_y, total_width, total_height, radius); //层矩�?
            progressBarRect(context, initial_x, initial_y, m_loadpart, total_height, radius, total_width); //进度条矩�?
            progressText(context, initial_x, initial_y, m_loadpart, total_height, radius, total_width );  //
           
         
        }

        /** 绘制圆角矩形
         * Draws a rounded rectangle.
         * @param {CanvasContext} ctx
         * @param {Number} x The top left x coordinate
         * @param {Number} y The top left y coordinate
         * @param {Number} width The width of the rectangle
         * @param {Number} height The height of the rectangle
         * @param {Number} radius The corner radius;
         */
        function roundRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.arc(x+width-radius, y+radius, radius, -Math.PI/2, Math.PI/2, false);
            ctx.lineTo(x + radius, y + height);
            ctx.arc(x+radius, y+radius, radius, Math.PI/2, 3*Math.PI/2, false);
            ctx.closePath();
            ctx.fill();
        }

        /**
         * Draws a rounded rectangle.
         * @param {CanvasContext} ctx
         * @param {Number} x The top left x coordinate
         * @param {Number} y The top left y coordinate
         * @param {Number} width The width of the rectangle
         * @param {Number} height The height of the rectangle
         * @param {Number} radius The corner radius;
         */
        function roundInsetRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            // Draw huge anti-clockwise box 画巨大的反时针框
            ctx.moveTo(1000, 1000);
            ctx.lineTo(1000, -1000);
            ctx.lineTo(-1000, -1000);
            ctx.lineTo(-1000, 1000);
            ctx.lineTo(1000, 1000);
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.arc(x+width-radius, y+radius, radius, -Math.PI/2, Math.PI/2, false);
            ctx.lineTo(x + radius, y + height);
            ctx.arc(x+radius, y+radius, radius, Math.PI/2, 3*Math.PI/2, false);
            ctx.closePath();
            ctx.fill();
        }

        function progressLayerRect(ctx, x, y, width, height, radius) {
            ctx.save();
            // Set shadows to make some depth 设置阴影
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#666';

             // Create initial grey layer 创建初始灰度�?
            ctx.fillStyle = 'rgba(189,189,189,1)';
            roundRect(ctx, x, y, width, height, radius);

            // Overlay with gradient 渐变叠加
            ctx.shadowColor = 'rgba(0,0,0,0)'
            var lingrad = ctx.createLinearGradient(0,y+height,0,0);
			// 背景颜色设置
            lingrad.addColorStop(0, '#000000');//rgba(255,255,255, 0.1)
            lingrad.addColorStop(0.4, '#696969');//rgba(255,255,255, 0.7)
            lingrad.addColorStop(1, '#A9A9A9');//rgba(255,255,255,0.4)
            ctx.fillStyle = lingrad;
            roundRect(ctx, x, y, width, height, radius);

            ctx.fillStyle = 'white';
            //roundInsetRect(ctx, x, y, width, height, radius);

            ctx.restore();
        }

        /**
         * Draws a half-rounded progress bar to properly fill rounded under-layer
         * @param {CanvasContext} ctx
         * @param {Number} x The top left x coordinate
         * @param {Number} y The top left y coordinate
         * @param {Number} width The width of the bar
         * @param {Number} height The height of the bar
         * @param {Number} radius The corner radius;
         * @param {Number} max The under-layer total width;
         */
        function progressBarRect(ctx, x, y, width, height, radius, max) {
            // var to store offset for proper filling when inside rounded area
            var offset = 0;
            ctx.beginPath();
            if (width<radius) {
                offset = radius - Math.sqrt(Math.pow(radius,2)-Math.pow((radius-width),2));
                ctx.moveTo(x + width, y+offset);
                ctx.lineTo(x + width, y+height-offset);
                ctx.arc(x + radius, y + radius, radius, Math.PI - Math.acos((radius - width) / radius), Math.PI + Math.acos((radius - width) / radius), false);
            }
            else if (width+radius>max) {
                offset = radius - Math.sqrt(Math.pow(radius,2)-Math.pow((radius - (max-width)),2));
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width, y);
                ctx.arc(x+max-radius, y + radius, radius, -Math.PI/2, -Math.acos((radius - (max-width)) / radius), false);
                ctx.lineTo(x + width, y+height-offset);
                ctx.arc(x+max-radius, y + radius, radius, Math.acos((radius - (max-width)) / radius), Math.PI/2, false);
                ctx.lineTo(x + radius, y + height);
                ctx.arc(x+radius, y+radius, radius, Math.PI/2, 3*Math.PI/2, false);
            }
            else {
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width, y);
                ctx.lineTo(x + width, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.arc(x+radius, y+radius, radius, Math.PI/2, 3*Math.PI/2, false);
            }
            ctx.closePath();
            ctx.fill();

            // draw progress bar right border shadow
            if (width<max-1) {
                ctx.save();
                ctx.shadowOffsetX = 1;
                ctx.shadowBlur = 1;
                ctx.shadowColor = '#666';
                if (width+radius>max)
                  offset = offset+1;
                ctx.fillRect(x+width,y+offset,1,total_height-offset*2);
                ctx.restore();
            }
        }

        /**文字
         * Draws properly-positioned progress bar percent text
         * @param {CanvasContext} ctx
         * @param {Number} x The top left x coordinate
         * @param {Number} y The top left y coordinate
         * @param {Number} width The width of the bar
         * @param {Number} height The height of the bar
         * @param {Number} radius The corner radius;
         * @param {Number} max The under-layer total width;
       */
        function progressText(ctx, x, y, width, height, radius, max) {
           
		    //设置文字的部�?
			ctx.save();
            ctx.fillStyle = 'white';
            var text = Math.floor(width/max*100)+"%";
            var text_width = ctx.measureText(text).width;
            var text_x = x+width-text_width-radius/2;
            if (width<=radius+text_width) {
                text_x = x+radius/2;
            }
            ctx.fillText(text, text_x, y+16);
            ctx.restore();
        } 
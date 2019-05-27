using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

public class CCMyPage : System.Web.UI.Page
{
    public SqlConnection m_con = null;
 //   public static string constr = "Persist Security Info=False;Password=ZLF-sql888;Connect Timeout=300;User ID=sa;Initial Catalog=E_xperiment;Data Source=123.56.136.213";
    public string constr = "Persist Security Info=False;Password=123456sa;User ID=sa;Connect Timeout=300;Initial Catalog=E_xperiment;Data Source=202.199.24.247";
    public SqlCommand cmd;
    public SqlDataReader reader;
    public string m_Sqlstr;
    public int count;
    public string txt;
    public static string[,] shuz;
    public static string[] lianx = new string[18];
    public static string[,] chax;
    public static string[,] chaxs;
    public static string[,] shuzs;
    public CCMyPage()
    {

    }
    public void GetConnect() //连接数据库
    {
        m_con = new SqlConnection(constr);
        m_con.Open();
    }  //连接数据库
    public void OnExecuteSql(string sqlstr)  //执行sql语句
    {
       // Response.Write(sqlstr);
        if (reader!=null)
            reader.Close();
        cmd = new SqlCommand(sqlstr, m_con);
        cmd.CommandTimeout = 30;
        reader = cmd.ExecuteReader();
    }  //执行数据库
    public void OnExecuteSqls(string sqlstr)
    {
        GetConnect();
        DataSet ds = new DataSet();
        SqlDataAdapter adp = new SqlDataAdapter(sqlstr, m_con);
        cmd = new SqlCommand(sqlstr, m_con);
        SqlDataReader sdr = cmd.ExecuteReader();
        int w = 0;
        int n = 0;
        while (sdr.Read())
        {
            w = w + 1;
        }
        shuz = new string[w, 6];
        GetConnect();
        DataSet dss = new DataSet();
        SqlDataAdapter adps = new SqlDataAdapter(sqlstr, m_con);
        cmd = new SqlCommand(sqlstr, m_con);
        SqlDataReader sdrs = cmd.ExecuteReader();
        while (sdrs.Read())
        {
            for (int i = 0; i < sdrs.FieldCount; i++)
            {
                shuz[n,i] = sdrs[i].ToString();
            }
            n = n+1;
        }
    }
    public void OnExecuteSqlsx(string sqlstr)
    {
        GetConnect();
        DataSet ds = new DataSet();
        SqlDataAdapter adp = new SqlDataAdapter(sqlstr, m_con);
        cmd = new SqlCommand(sqlstr, m_con);
        SqlDataReader sdr = cmd.ExecuteReader();
        int w = 0;
        int n = 0;
        while (sdr.Read())
        {
            w = w + 1;
        }
        shuzs = new string[w, 8];
        GetConnect();
        DataSet dss = new DataSet();
        SqlDataAdapter adps = new SqlDataAdapter(sqlstr, m_con);
        cmd = new SqlCommand(sqlstr, m_con);
        SqlDataReader sdrs = cmd.ExecuteReader();
        while (sdrs.Read())
        {
            for (int i = 0; i < sdrs.FieldCount; i++)
            {
                shuzs[n, i] = sdrs[i].ToString();
            }
            n = n + 1;
        }
    }
    public void OnExecuteSqlss(string sqlstr)
    {
        GetConnect();
        DataSet ds = new DataSet();
        SqlDataAdapter adp = new SqlDataAdapter(sqlstr, m_con);
        cmd = new SqlCommand(sqlstr, m_con);
        SqlDataReader sdr = cmd.ExecuteReader();
        while (sdr.Read())
        {
            for (int i = 0; i < sdr.FieldCount; i++)
            {
                lianx[i] = sdr[i].ToString();
            }
        }
    }

    public void Select(string a)
    {
        int l = 0;
        int s = 0;
        int shu = shuz.Length / 6;
        for (int i = 0; i < shu; i++)
        {
            if(shuz[i,0] == a)
            {
                l = l + 1;
            }
        }
        chax = new string[l, 6];
        for (int z = 0; z < shu; z++)
        {
            if (shuz[z,0] == a)
            {
                for(int j = 0;j<=5;j++)
                {
                    chax[s, j] = shuz[z,j];
                }
                s = s + 1;
            }
        }
    }
    public void Selects(string a)
    {
        int l = 0;
        int s = 0;
        int shu = shuzs.Length / 8;
        for (int i = 0; i < shu; i++)
        {
            if (shuzs[i, 0] == a)
            {
                l = l + 1;
            }
        }
        chaxs = new string[l, 8];
        for (int z = 0; z < shu; z++)
        {
            if (shuzs[z, 0] == a)
            {
                for (int j = 0; j <= 7; j++)
                {
                    chaxs[s, j] = shuzs[z, j];
                }
                s = s + 1;
            }
        }
    }



    public static object GetCache(string CacheKey)
    {
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        return objCache[CacheKey];
    }
    public static void SetCache(string CacheKey, object objObject)
    {
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        objCache.Insert(CacheKey, objObject);
    }

    public static void StartSQL()
    {
        SqlConnection con = new SqlConnection("Data Source=.;Initial Catalog=hux202;integrated security=true");
        con.Open();
        DataSet ds = new DataSet();
        SqlDataAdapter adp = new SqlDataAdapter("select top 4 txt,convert(varchar(12),times,102) as times,id from dynamic where id is not null order by times desc", con);
        adp.Fill(ds, "dongtai");
        adp.SelectCommand.CommandText = "select top 3 txt,convert(varchar(12),times,102) as times,id from forum where id is not null order by times desc";
        adp.Fill(ds, "luntan");
        adp.SelectCommand.CommandText = "select top 4 txt,times,id from nous where id is not null order by times desc";
        adp.Fill(ds, "changshi");
        adp.SelectCommand.CommandText = "select name,address,convert(varchar(12),times,102) as times,id from link order by times desc";
        adp.Fill(ds, "lianjie");
        adp.SelectCommand.CommandText = "select * from ZJconcise order by times desc";
        adp.Fill(ds, "zhuanjia");
        SetCache("biao", ds);

        adp.Dispose();
        ds.Dispose();
        con.Close();
    }


    public void CloseConnect()  //关闭数据库连接
    {
        if (reader != null)
            reader.Close();
        if (cmd != null)
            cmd.Dispose();
        if (m_con != null)
            m_con.Close();
    }  //关闭数据库
    public void CloseReader()
    {
        reader.Close();
    }




    public void Operate(string a,string b,string c,string d)
    {
        this.GetConnect();
        this.OnExecuteSql("insert into operate(txt,adminid,Events,remark) values('" + a + "','" + b + "','" + c + "','" + d + "')");
        this.CloseConnect();
    }
    public void Delete(string a, string b)
    {
        this.GetConnect();
        this.OnExecuteSql("delete from "+a+" where id="+b+"");
        this.CloseConnect();
    }
    public void Insert(string name, string a, string b, string e, string f, string g)
    {
        this.GetConnect();
        this.OnExecuteSql("insert into " + name + "(txt,contents,seotxt,seokw,seodt) values('" + a + "','" + b + "','" + e + "','" + f + "','" + g + "')");
        this.CloseConnect();
    }
    public void InsertImage(string name, string a, string b, string c, string e, string f, string g)
    {
        this.GetConnect();
        this.OnExecuteSql("insert into " + name + "(txt,contents,images,seotxt,seokw,seodt) values('" + a + "','" + b + "','" + c + "','" + e + "','" + f + "','" + g + "')");
        this.CloseConnect();
    }




    public void GridViewStyle(GridView mygrid)  //设置gridview样式
    {
        mygrid.BackColor = System.Drawing.Color.FromName("#FFF");
        mygrid.ForeColor = System.Drawing.Color.FromName("#000");
        mygrid.BorderStyle = BorderStyle.None;
        mygrid.Height = 25;
        mygrid.HeaderStyle.BackColor = System.Drawing.Color.FromName("#5078f0");
        mygrid.HeaderStyle.ForeColor = System.Drawing.Color.FromName("#FFF");
        mygrid.HeaderStyle.Font.Size = 12;
        mygrid.HeaderStyle.Height = 25;
        
    }  //GridView的样式
   
    public void SendStr(string pagename, string str)//发送字符串
    {
        string sstr = pagename + "?" + str;
        Response.Redirect(Server.UrlEncode(sstr));
    }  //传值
    public void SendStr(string str)//发送字符串
    {
        Response.Redirect(Server.UrlEncode(str));
    }  //传值
    public string RevStr(string n)//接收字符串
    {
        return Server.UrlDecode(Request.QueryString[n].ToString());
    }  //接值
    public string getpicname()//的到系统时间
    {
        string nstr = System.DateTime.Now.ToString();
        nstr = nstr.Replace("-", "");
        nstr = nstr.Replace(" ", "");
        nstr = nstr.Replace(":", "");
        return nstr;
    }  //加入系统时间
  
    protected override void OnUnload(EventArgs e)//网页加载完成关闭数据库连接
    {
        CloseConnect();
    }
 
    //public void bind(Repeater repeater,string sql)
    //{
    //    this.GetConnect();
    //    SqlDataAdapter data= new SqlDataAdapter(sql, m_con);
    //    DataSet ds = new DataSet();
    //    data.Fill(ds);
    //    PagedDataSource pds = new PagedDataSource();
    //    pds.DataSource = ds.Tables[0].DefaultView;//数据源
    //    pds.AllowPaging = true;//支持分页
    //    pds.CurrentPageIndex = AspNetPager1.CurrentPageIndex - 1;//当前页，索引号从0开始
    //    AspNetPager1.PageSize = 6;//aspnetpage1每页大小
    //    pds.PageSize = AspNetPager1.PageSize;//每页大小
    //    AspNetPager1.RecordCount = getcount();//产品表中记录，属性的值必须要设置，
    //    repeater.DataSource = pds;
    //    repeater.DataBind();
    //}
    public class JScript
    {
        #region 旧版本
        /// <summary>
        /// 弹出JavaScript小窗口
        /// </summary>
        /// <param name="js">窗口信息</param>
//        public static void Alert(string message, Page p)
//        {
//            #region
//            string js = @"<Script language='JavaScript'>
//                    alert('" + message + "');</Script>";
//            p.RegisterStartupScript("",js);
//            #endregion
//        }
        /// <summary>
        /// 弹出消息框并且转向到新的URL
        /// </summary>
        /// <param name="message">消息内容</param>
        /// <param name="toURL">连接地址</param>
        public static void AlertAndRedirect(string message, string toURL)
        {
            #region
            string js = "<script language=javascript>alert('{0}');window.location.replace('{1}')</script>";
            HttpContext.Current.Response.Write(string.Format(js, message, toURL));
            #endregion
        }

        /// <summary>
        /// 回到历史页面
        /// </summary>
        /// <param name="value">-1/1</param>
        public static void GoHistory(int value)
        {
            #region
            string js = @"<Script language='JavaScript'>
                    history.go({0});  
                  </Script>";
            HttpContext.Current.Response.Write(string.Format(js, value));
            #endregion
        }

        /// <summary>
        /// 关闭当前窗口
        /// </summary>
        public static void CloseWindow()
        {
            #region
            string js = @"<Script language='JavaScript'>
                    parent.opener=null;window.close();  
                  </Script>";
            HttpContext.Current.Response.Write(js);
            HttpContext.Current.Response.End();
            #endregion
        }

        /// <summary>
        /// 刷新父窗口
        /// </summary>
        public static void RefreshParent(string url)
        {
            #region
            string js = @"<Script language='JavaScript'>
                    window.opener.location.href='" + url + "';window.close();</Script>";
            HttpContext.Current.Response.Write(js);
            #endregion
        }


        /// <summary>
        /// 刷新打开窗口
        /// </summary>
        public static void RefreshOpener()
        {
            #region
            string js = @"<Script language='JavaScript'>
                    opener.location.reload();
                  </Script>";
            HttpContext.Current.Response.Write(js);
            #endregion
        }


        /// <summary>
        /// 打开指定大小的新窗体
        /// </summary>
        /// <param name="url">地址</param>
        /// <param name="width">宽</param>
        /// <param name="heigth">高</param>
        /// <param name="top">头位置</param>
        /// <param name="left">左位置</param>
        public static void OpenWebFormSize(string url, int width, int heigth, int top, int left,Page  p)
        {
            #region
            string js = @"<Script language='JavaScript'>window.open('" + url + @"','','height=" + heigth + ",width=" + width + ",top=" + top + ",left=" + left + ",location=no,menubar=no,resizable=yes,scrollbars=yes,status=yes,titlebar=no,toolbar=no,directories=no');</Script>";
            p.RegisterClientScriptBlock("", js);
            //HttpContext.Current.Response.Write(js);
            #endregion
        }


        /// <summary>
        /// 转向Url制定的页面
        /// </summary>
        /// <param name="url">连接地址</param>
        public static void JavaScriptLocationHref(string url)
        {
            #region
            string js = @"<Script language='JavaScript'>
                    window.location.replace('{0}');
                  </Script>";
            js = string.Format(js, url);
            HttpContext.Current.Response.Write(js);
            #endregion
        }

        /// <summary>
        /// 打开指定大小位置的模式对话框
        /// </summary>
        /// <param name="webFormUrl">连接地址</param>
        /// <param name="width">宽</param>
        /// <param name="height">高</param>
        /// <param name="top">距离上位置</param>
        /// <param name="left">距离左位置</param>
        public static void ShowModalDialogWindow(string webFormUrl, int width, int height, int top, int left)
        {
            #region
            string features = "dialogWidth:" + width.ToString() + "px"
                + ";dialogHeight:" + height.ToString() + "px"
                + ";dialogLeft:" + left.ToString() + "px"
                + ";dialogTop:" + top.ToString() + "px"
                + ";center:yes;help=no;resizable:no;status:no;scroll=yes";
            ShowModalDialogWindow(webFormUrl, features);
            #endregion
        }
        /// <summary>
        /// 弹出模态窗口
        /// </summary>
        /// <param name="webFormUrl"></param>
        /// <param name="features"></param>
        public static void ShowModalDialogWindow(string webFormUrl, string features)
        {
            string js = ShowModalDialogJavascript(webFormUrl, features);
            HttpContext.Current.Response.Write(js);
        }
        /// <summary>
        /// 弹出模态窗口
        /// </summary>
        /// <param name="webFormUrl"></param>
        /// <param name="features"></param>
        /// <returns></returns>
        public static string ShowModalDialogJavascript(string webFormUrl, string features)
        {
            #region
            string js = @"<script language=javascript>                            
                            showModalDialog('" + webFormUrl + "','','" + features + "');</script>";
            return js;
            #endregion
        }
        #endregion

        #region 新版本
        /// <summary>
        /// 弹出JavaScript小窗口
        /// </summary>
        /// <param name="js">窗口信息</param>
        public static void Alert(string message, Page page)
        {
            #region
            string js = @"<Script language='JavaScript'>
                    alert('" + message + "');</Script>";
            //HttpContext.Current.Response.Write(js);
            if (!page.ClientScript.IsStartupScriptRegistered(page.GetType(), "alert"))
            {
                page.ClientScript.RegisterStartupScript(page.GetType(), "alert", js);
            }
            #endregion
        }

        /// <summary>
        /// 弹出消息框并且转向到新的URL
        /// </summary>
        /// <param name="message">消息内容</param>
        /// 
        /// <param name="toURL">连接地址</param>
        public static void AlertAndRedirect(string message, string toURL, Page page)
        {
            #region
            string js = "<script language=javascript>alert('{0}');window.location.replace('{1}')</script>";
            //HttpContext.Current.Response.Write(string.Format(js, message, toURL));
            if (!page.ClientScript.IsStartupScriptRegistered(page.GetType(), "AlertAndRedirect"))
            {
                page.ClientScript.RegisterStartupScript(page.GetType(), "AlertAndRedirect", string.Format(js, message, toURL));
            }
            #endregion
        }

        /// <summary>
        /// 弹出消息框并且转向到新的URL
        /// </summary>
        /// <param name="message">消息内容</param>
        /// <param name="toURL">连接地址</param>
        public static void AlertAndTopRedirect(string message, string toURL, Page page)
        {
            #region
            string js = "<script language=javascript>alert('"+message+"');parent.location.href='"+toURL+"';</script>";
            //HttpContext.Current.Response.Write(string.Format(js, message, toURL));
            page.ClientScript.RegisterStartupScript(page.GetType(), "", js);
            #endregion
        }

        /// <summary>
        /// 回到历史页面
        /// </summary>
        /// <param name="value">-1/1</param>
        public static void GoHistory(int value, Page page)
        {
            #region
            string js = @"<Script language='JavaScript'>
                    history.go({0});  
                  </Script>";
            //HttpContext.Current.Response.Write(string.Format(js, value));
            if (!page.ClientScript.IsStartupScriptRegistered(page.GetType(), "GoHistory"))
            {
                page.ClientScript.RegisterStartupScript(page.GetType(), "GoHistory", string.Format(js, value));
            }
            #endregion
        }

        //        /// <summary>
        //        /// 关闭当前窗口
        //        /// </summary>
        //        public static void CloseWindow()
        //        {
        //            #region
        //            string js = @"<Script language='JavaScript'>
        //                    parent.opener=null;window.close();  
        //                  </Script>";
        //            HttpContext.Current.Response.Write(js);
        //            HttpContext.Current.Response.End();
        //            #endregion
        //        }

        /// <summary>
        /// 刷新父窗口
        /// </summary>
        public static void RefreshParent(string url, Page page)
        {
            #region
            string js = @"<Script language='JavaScript'>
                    window.opener.location.href='" + url + "';window.close();</Script>";
            //HttpContext.Current.Response.Write(js);
            if (!page.ClientScript.IsStartupScriptRegistered(page.GetType(), "RefreshParent"))
            {
                page.ClientScript.RegisterStartupScript(page.GetType(), "RefreshParent", js);
            }
            #endregion
        }


        /// <summary>
        /// 刷新打开窗口
        /// </summary>
        public static void RefreshOpener(Page page)
        {
            #region
            string js = @"<Script language='JavaScript'>
                    opener.location.reload();
                  </Script>";
            //HttpContext.Current.Response.Write(js);
            if (!page.ClientScript.IsStartupScriptRegistered(page.GetType(), "RefreshOpener"))
            {
                page.ClientScript.RegisterStartupScript(page.GetType(), "RefreshOpener", js);
            }
            #endregion
        }


        /// <summary>
        /// 打开指定大小的新窗体
        /// </summary>
        /// <param name="url">地址</param>
        /// <param name="width">宽</param>
        /// <param name="heigth">高</param>
        /// <param name="top">头位置</param>
        /// <param name="left">左位置</param>
        //public static void OpenWebFormSize(string url, int width, int heigth, int top, int left, Page page)
        //{
        //    #region
        //    string js = @"<Script language='JavaScript'>window.open('" + url + @"','','height=" + heigth + ",width=" + width + ",top=" + top + ",left=" + left + ",location=no,menubar=no,resizable=yes,scrollbars=yes,status=yes,titlebar=no,toolbar=no,directories=no');</Script>";
        //    //HttpContext.Current.Response.Write(js);
        //    if (!page.ClientScript.IsStartupScriptRegistered(page.GetType(), "OpenWebFormSize"))
        //    {
        //        page.ClientScript.RegisterStartupScript(page.GetType(), "OpenWebFormSize", js);
        //    }
        //    #endregion
        //}


        /// <summary>
        /// 转向Url制定的页面
        /// </summary>
        /// <param name="url">连接地址</param>
        public static void JavaScriptLocationHref(string url, Page page)
        {
            #region
            string js = @"<Script language='JavaScript'>
                    window.location.replace('{0}');
                  </Script>";
            js = string.Format(js, url);
            //HttpContext.Current.Response.Write(js);
            if (!page.ClientScript.IsStartupScriptRegistered(page.GetType(), "JavaScriptLocationHref"))
            {
                page.ClientScript.RegisterStartupScript(page.GetType(), "JavaScriptLocationHref", js);
            }
            #endregion
        }

        /// <summary>
        /// 打开指定大小位置的模式对话框
        /// </summary>
        /// <param name="webFormUrl">连接地址</param>
        /// <param name="width">宽</param>
        /// <param name="height">高</param>
        /// <param name="top">距离上位置</param>
        /// <param name="left">距离左位置</param>
        public static void ShowModalDialogWindow(string webFormUrl, int width, int height, int top, int left, Page page)
        {
            #region
            string features = "dialogWidth:" + width.ToString() + "px"
                + ";dialogHeight:" + height.ToString() + "px"
                + ";dialogLeft:" + left.ToString() + "px"
                + ";dialogTop:" + top.ToString() + "px"
                + ";center:yes;help=no;resizable:no;status:no;scroll=yes";
            ShowModalDialogWindow(webFormUrl, features, page);
            #endregion
        }
        /// <summary>
        /// 弹出模态窗口
        /// </summary>
        /// <param name="webFormUrl"></param>
        /// <param name="features"></param>
        public static void ShowModalDialogWindow(string webFormUrl, string features, Page page)
        {
            string js = ShowModalDialogJavascript(webFormUrl, features);
            //HttpContext.Current.Response.Write(js);
            if (!page.ClientScript.IsStartupScriptRegistered(page.GetType(), "ShowModalDialogWindow"))
            {
                page.ClientScript.RegisterStartupScript(page.GetType(), "ShowModalDialogWindow", js);
            }
        }
        //        /// <summary>
        //        /// 弹出模态窗口
        //        /// </summary>
        //        /// <param name="webFormUrl"></param>
        //        /// <param name="features"></param>
        //        /// <returns></returns>
        //        public static string ShowModalDialogJavascript(string webFormUrl, string features)
        //        {
        //            #region
        //            string js = @"<script language=javascript>                            
        //    showModalDialog('" + webFormUrl + "','','" + features + "');</script>";
        //            return js;
        //            #endregion
        //        }
        #endregion
    }









    #region
    /// <summary>
    /// 去掉html内容中的指定的html标签
    /// </summary>
    /// <param name="content">html内容</param>
    /// <param name="tagName">html标签</param>
    /// <returns>去掉标签的内容</returns>
    public static string DropHtmlTag(string content, string tagName)
    {
        //去掉<tagname>和</tagname>
        string aaa = DropIgnoreCase(content, "<[/]{0,1}" + tagName + "[^\\>]*\\>");
        return aaa;
    }
    /// <summary>
    /// 删除字符串中指定的内容,不区分大小写
    /// </summary>
    /// <param name="src">要修改的字符串</param>
    /// <param name="pattern">要删除的正则表达式模式</param>
    /// <returns>已删除指定内容的字符串</returns>
    public static string DropIgnoreCase(string src, string pattern)
    {
        string aaa = Regex.Replace(src, pattern, "");
        return aaa;
    }

    /// <summary>
    /// 去掉html内容中全部标签
    /// </summary>
    /// <param name="content">html内容</param>
    /// <returns>去掉html标签的内容</returns>
    public static string DropHtmlTag(string content)
    {
        //去掉<*>
        string aaa = Drop(content, "<[^\\>]*>");
        if (aaa.Length > 25)
        {
            aaa = aaa.Substring(0, 25) + ".....";
        }
        else
        {
            aaa = aaa + ".....";
        }
        return aaa;
    }

    public static string DropHtmlTagdt(string content)
    {
        //去掉<*>
        string aaa = Drop(content, "<[^\\>]*>");
        if (aaa.Length > 150)
        {
            aaa = aaa.Substring(0, 150) + ".....";
        }
        else
        {
            aaa = aaa + ".....";
        }
        return aaa;
    }
    public static string DropHtmlTagbl(string content)
    {
        //去掉<*>
        string aaa = Drop(content, "<[^\\>]*>");
        if (aaa.Length > 100)
        {
            aaa = aaa.Substring(0, 100) + ".....";
        }
        else
        {
            aaa = aaa + ".....";
        }
        return aaa;
    }

    /// <summary>
    /// 删除字符串中指定的内容
    /// </summary>
    /// <param name="src">要修改的字符串</param>
    /// <param name="pattern">要删除的正则表达式模式</param>
    /// <returns>已删除指定内容的字符串</returns>
    public static string Drop(string src, string pattern)
    {
        string aaa = Regex.Replace(src, pattern, "");
        return aaa;
    }

    #endregion

    #region
    /// <summary>
    /// 将Html标签转化为空格
    /// </summary>
    /// <param name="strHtml">待转化的字符串</param>
    /// <returns>经过转化的字符串</returns>
    public static string stripHtml(string strHtml)
    {
        Regex objRegExp = new Regex("<(.|\n)+?>");
        string strOutput = objRegExp.Replace(strHtml, "");
        strOutput = strOutput.Replace("<", "<");
        strOutput = strOutput.Replace(">", ">");
        if (strOutput.Length > 30)
        {
            strOutput = strOutput.Substring(0, 30) + ".....";
        }
        else
        {
            strOutput = strOutput + ".....";
        }
        return strOutput;
    }
    #endregion
}
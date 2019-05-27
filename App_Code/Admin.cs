using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Web.UI.HtmlControls;
using System.Web.UI;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using System.Web.UI.WebControls;
using System.Data;

/// <summary>
///Class2 的摘要说明
/// </summary>
public class Admin:CCMyPage
{
	public Admin()
	{
		//
		//TODO: 在此处添加构造函数逻辑
		//
	}
    public static string GetWhere(HtmlInputText datetime, HtmlInputText endtime, Page page,string 字段)
    {
        string where = "";
        Regex dateRegex = new Regex(@"^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$");
        if (datetime.Value != "")
        {
            if (!dateRegex.IsMatch(datetime.Value))
            {
                JScript.Alert("日期输入错误！", page);
                return "";
            }
            where += " and "+字段+">=' " + datetime.Value + "' ";
        }
        if (endtime.Value != "")
        {
            if (!dateRegex.IsMatch(endtime.Value))
            {
                JScript.Alert("日期输入错误", page);
                return "";
            }
            where += " and "+字段+"<' " + endtime.Value + "' ";
        }
        return where;
    }
    public DataSet DataSoure(string sql)//根据语句获取数据源
    {
        GetConnect();
        SqlDataAdapter da = new SqlDataAdapter(sql, m_con);
        DataSet ds = new DataSet();
        da.Fill(ds);
        CloseConnect();
        return ds;
    }
    public string GetBumen( DropDownList DropDownList,string 字段)//获取部门值
    {
        string bumen = "";
        if (DropDownList.SelectedValue != "全部"&&DropDownList.SelectedValue!="")
        {
            bumen = " and "+字段+"=" + DropDownList.SelectedValue;
        }
        return bumen;
    }
    public string GetID()
    {
        if (Session["userid"] == null)
        {
            JScript.Alert("请登录", this);
            Response.Redirect("login.aspx");
            //JScript.AlertAndTopRedirect("请登录", "login.aspx",this);
            return "";
        }
        else
        {
            return Session["userid"].ToString();
        }
    }
    public string GetQX()
    {
        if (Session["qx"] == null)
        {
            JScript.AlertAndTopRedirect("请登录", "login.aspx", this);
            return "";
        }
        else
        {
            return Session["qx"].ToString();
        }
    }
    /// <summary>
    /// 初始化CheckBoxList中哪些是选中了的         /// </summary>
    /// <param name="checkList">CheckBoxList</param>
    /// <param name="selval">选中了的值串例如："0,1,1,2,1"</param>
    /// <param name="separator">值串中使用的分割符例如"0,1,1,2,1"中的逗号</param>
    public static string SetChecked(CheckBoxList checkList, string selval, string separator)
    {
        selval = separator + selval + separator;        //例如："0,1,1,2,1"->",0,1,1,2,1,"
        for (int i = 0; i < checkList.Items.Count; i++)
        {
            checkList.Items[i].Selected = false;
            string val = separator + checkList.Items[i].Value + separator;
            if (selval.IndexOf(val) != -1)
            {
                checkList.Items[i].Selected = true;
                selval = selval.Replace(val, separator);        //然后从原来的值串中删除已经选中了的
                if (selval == separator)        //selval的最后一项也被选中的话，此时经过Replace后，只会剩下一个分隔符
                {
                    selval += separator;        //添加一个分隔符
                }
            }
        }
        selval = selval.Substring(1, selval.Length - 2);        //除去前后加的分割符号
        return selval;
    }

    /// <summary>
    /// 得到CheckBoxList中选中了的值
    /// </summary>
    /// <param name="checkList">CheckBoxList</param>
    /// <param name="separator">分割符号</param>
    /// <returns></returns>
    public static string GetChecked(CheckBoxList checkList, string separator)
    {
        string selval = "";

        for (int i = 0; i < checkList.Items.Count; i++)
        {
            if (checkList.Items[i].Selected)
            {
                string d = checkList.Items[i].Text;
                selval += checkList.Items[i].Value + separator;
            }
        }
        return selval;
    }
    /// <summary>
    /// 获得缓存对象
    /// </summary>
    /// <param name="CacheKey">键</param>
    /// <returns>缓存对象</returns>
    public static object GetCache(string CacheKey)
    {
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        return objCache[CacheKey];
    }

    /// <summary>
    /// 设置缓存对象
    /// </summary>
    /// <param name="CacheKey">用于引用该项的缓存键</param>
    /// <param name="objObject">要插入缓存中的对象</param>
    public static void SetCache(string CacheKey, object objObject)
    {
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        objCache.Insert(CacheKey, objObject);
    }

    /// <summary>
    /// 设置缓存对象
    /// </summary>
    /// <param name="CacheKey">用于引用该项的缓存键</param>
    /// <param name="objObject">要插入缓存中的对象</param>
    /// <param name="absoluteExpiration">所插入对象将到期并从缓存中移除的时间,
    /// 要避免可能的本地时间问题请使用System.DateTime.UtcNow</param>
    /// <param name="slidingExpiration">最后一次访问所插入对象时与该对象到期时之间的时间间隔.
    /// 如果该值等效于20分钟,则对象在最后一次被访问20分钟之后将到期并被从缓存中移除.
    /// 如果使用可调到期,则absoluteExpiration参数必须为System.Web.Caching.Cache.NoAbsoluteExpiration</param>
    public static void SetCache(string CacheKey, object objObject, DateTime absoluteExpiration, TimeSpan slidingExpiration)
    {
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        //所插入对象的文件依赖项或缓存键依赖项。当任何依赖项更改时，该对象即无效，并从缓存中移除.如果没有依赖项，则此参数包含NULL。
        objCache.Insert(CacheKey, objCache, null, absoluteExpiration, slidingExpiration);
    }

    /// <summary>
    /// 删除缓存对象
    /// </summary>
    /// <param name="CacheKey">要删除缓存的对象</param>
    public static void DeleteCache(string CacheKey)
    {
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        objCache.Remove(CacheKey);
    }
    public static void StartSQL()
    {
        SqlConnection con = new SqlConnection("Initial Catalog=puwk202;Data Source=.;User ID=sa;Password=sa");
        con.Open();
        DataSet ds = new DataSet();
        SqlDataAdapter adp = new SqlDataAdapter("select id,name,address from link order by times desc", con);
        adp.Fill(ds, "Show");
        SetCache("biao", ds);

        adp.Dispose();
        ds.Dispose();
        con.Close();
    }

        /// <summary> 

        /// 获得Cookie 

        /// </summary>

        /// <param name="cookieName"></param> 

        /// <returns></returns>

    public static HttpCookie GetCookie(string cookieName)
    {

        HttpRequest request = HttpContext.Current.Request;

        if (request != null) return request.Cookies[cookieName]; return null;

    }

        /// <summary> 

        /// 添加Cookie 

        /// </summary>

        /// <param name="cookie"></param> 

    public static void AddCookie(HttpCookie cookie)
    {

        HttpResponse response = HttpContext.Current.Response;

        if (response != null)
        {

            //指定客户端脚本是否可以访问[默认为false] 

            cookie.HttpOnly = true;

            //指定统一的Path，比便能通存通取 

            cookie.Path = "/";

            //设置跨域,这样在其它二级域名下就都可以访问到了 //

            cookie.Domain = "chinesecoo.com"; response.AppendCookie(cookie);

        }

    }

        /// <summary> /// 设置Cookie子键的值 

        /// </summary>

        /// <param name="cookieName"></param>

        /// <param name="key"></param> 

        /// <param name="value"></param> 

    public static void SetCookie(string cookieName, string key, string value)

    { SetCookie(cookieName, key, value, null); }

        /// <summary> /// 设置Cookie 

        /// </summary> 

        /// <param name="cookieName"></param>

        /// <param name="key"></param> 

        /// <param name="value"></param> 

        /// <param name="expires"></param>

    public static void SetCookie(string cookieName, string key, string value, DateTime? expires)
    {

        HttpResponse response = HttpContext.Current.Response;

        if (response != null)
        {

            HttpCookie cookie = response.Cookies[cookieName];

            if (cookie != null)
            {

                if (!string.IsNullOrEmpty(key) && cookie.HasKeys)

                    cookie.Values.Set(key, value);

                else if (!string.IsNullOrEmpty(value))

                    cookie.Value = value;

                if (expires != null)

                    cookie.Expires = expires.Value;

                response.SetCookie(cookie);

            }

        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///Class1 的摘要说明
/// </summary>
public class SerV : CCMyPage
{
    public string str;
    public string strs;
    public SerV()
	{
		//
		//TODO: 在此处添加构造函数逻辑
		//
	}
    public void Str()
    {

            //GetConnect();
           
            //OnExecuteSql("select * from intro");
            //if (reader.Read())
            //{
            //    a = reader["txt"].ToString();
            //    b = reader["remark"].ToString();
            //    str = a + "," + b;
            //}
            //CloseConnect();

            GetConnect();
            OnExecuteSqls("select * from (select '1' as 编号,id,txt,remark,convert(varchar(12),times,102) as times,'t' as 测试1,'t' as 测试2,'t' as 测试3 from intro union select '2' as 编号,id,title,txt,convert(varchar(12),times,102) as times,'t' as 测试1,'t' as 测试2,'t' as 测试3 from trends union select '3' as 编号,id,title,txt,convert(varchar(12),times,102) as times,'t' as 测试1,'t' as 测试2,'t' as 测试3 from jis union select '4' as 编号,id,title,txt,convert(varchar(12),times,102) as times,ImUrl,'t' as 测试1,'t' as 测试2 from Tuand union select '5' as 编号,id,title,txt,convert(varchar(12),times,102) as times,ImUrl,fenl,'t' as 测试2 from anl union select '6' as 编号,id,title,txt,convert(varchar(12),times,102) as times,ImUrl,'t' as 测试1,'t' as 测试2 from Hez union select '7' as 编号,id,linkman,phone,convert(varchar(12),times,102) as times,fax,address,Email from touch union select '8' as 编号,id,'t' as 测试8,'t' as 测试9,convert(varchar(12),times,102) as times,ImUrl,'t' as 测试1,'t' as 测试2 from Syimage union select '9' as 编号,id,'t' as 测试8,txt,convert(varchar(12),times,102) as times,ImUrl,fenl,'t' as 测试2 from Syintro) vb order by times desc");
            strs = txt;
            CloseConnect();
        return;
    }
}
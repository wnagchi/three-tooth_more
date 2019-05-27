using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///Class1 的摘要说明
/// </summary>
/// <summary>
/// 微信配置类
/// </summary>
public class WxConfig
{
    /// <summary>
    /// 应用ID
    /// </summary>
    public string AppID { get { return (string)System.Configuration.ConfigurationManager.AppSettings["WXAppID"]; } }

    /// <summary>
    /// 应用密钥
    /// </summary>
    public string AppSecret { get { return (string)System.Configuration.ConfigurationManager.AppSettings["WXAppSecret"]; } }

    /// <summary>
    /// API密钥（支付密钥）
    /// </summary>
    public string ApiToken { get { return (string)System.Configuration.ConfigurationManager.AppSettings["WXApiToken"]; } }

    /// <summary>
    /// 商户号
    /// </summary>
    public string PartnerId { get { return (string)System.Configuration.ConfigurationManager.AppSettings["PartnerId"]; } }

    /// <summary>
    /// 接受通知的页面
    /// </summary>
    public string NotifyUrl { get { return Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["NotifyUrl"]); } }

    /// <summary>
    /// 支付后跳转的页面
    /// </summary>
    public string ReturnUrl { get { return Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["ReturnUrl"]); } }

    /// <summary>
    /// 用户唯一标识
    /// </summary>
    public string OpenId { get; set; }

    /// <summary>
    /// 公众号的全局唯一票据
    /// </summary>
    public string Accesstoken { get; set; }

    /// <summary>
    /// JS-SDK临时票据
    /// </summary>
    public string Jsapiticket { get; set; }

    /// <summary>
    /// 时间戳
    /// </summary>
    public string Timestamp { get; set; }

    /// <summary>
    /// 随机串
    /// </summary>
    public string NonceStr { get; set; }

    /// <summary>
    /// JS-SDK权限验证的签名
    /// </summary>
    public string Signature { get; set; }

    /// <summary>
    /// 支付包参数
    /// </summary>
    public string Package { get; set; }

    /// <summary>
    /// 签名方式（新版微信支付为MD5）
    /// </summary>
    public string SignType { get; set; }

    /// <summary>
    /// 支付签名
    /// </summary>
    public string PaySign { get; set; }
}


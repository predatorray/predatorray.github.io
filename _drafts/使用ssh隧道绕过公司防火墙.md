---
layout: post
title: 使用ssh隧道绕过公司防火墙
---
原文地址：[SSH Tunnels: Bypass (Almost) Any Firewall][1]

原文作者：Lukasz Usowicz

本文的目的是为了提供一些有效的方法来改变在一些严格受限（如公司）网络环境下的你的工作方式。为了达到这点，我们将会使用SSH隧道来绕过你的系统管理员所设置的防火墙规则。我们将会从最简单的开始，逐步破解越来越复杂的防火墙规则。

**重要提示：本文并不是鼓励你通过非法手段绕过任何管理员所设置的网络限制。我们所展现的技术是用来帮助那些工作环境在需要在防火墙之后的。如果你打算使用本文中所述的一些伎俩来突破你公司的防火墙，你必须了解，你的行为可能不被你的公司所允许，你将可能被解雇。我们不会对你的行为负责。你已被警告。**

这篇文章是前一篇在门户发表的[SSH tricks][2]的续文。然而这篇文章的和前者有所不同，这篇文章是写给经验更丰富的用户，特别是那些必须在严酷网络环境下工作的人。换言之，我们使用SSH为FTP或者CVS之类的不安全协议创建隧道并不会在本文中被论述。可能会有其他的关于SSH的文章会覆盖这些。

## 准备工作

以下是你在读这篇文章前需要预先了解或准备的。

*   SSH和Linux的基础知识（上述的那篇文章里有）
*   一台远程的Linux机器，以及和它绑定的公网IP（为了方便，我们假设这个IP是静态的）
*   对于使用命令行有耐心而不会有恐惧感

接下来的文章中，为了方便，我们都会使用一些默认的名称。位于一个受限的网络环境（例如在我们办公桌上）的工作站被叫做`LOCAL_HOST`。在这个网络外部（例如在家里）的另一台被叫做`REMOTE_HOST`。我们假设在家的那台（REMOTE_HOST）有一个用户名为`user`的用户，在办公桌的那台的用户名为`worker`。`REMOTE_HOST` 有一个静态的IP地址，以及预装了SSH服务。虽然我们提供的解决方案适用任何GNU/Linux发行版甚至是微软Windows，为了方便，我们只考虑类Debian的系统。

如果你还没有安装SSH服务，打开终端（以`root`或者`sudo`的形式），然后输入如下命令：

    REMOTE_HOST:~# aptitude install openssh-server
    

然后系统应该会在你安装后自动启动（当然在系统下一次启动时也会）。我们应当检查22端口是否被防火墙屏蔽（如果是的话，需要打开）。我们需要记录一下IP地址（我们接下来会把它记作`IP_NUMBER`；可以使用`/sbin/ifconfig`来查看）。

然后我们现在离开家里的那台电脑（`REMOTE_HOST`），然后使用办公室里的那台。首先，我们需要分析我们的网络限制。看上去很厉害的样子，但是不用担心，我们并不会使用封包监听或者任何形式的骇客工具。我们仅仅是尝试连接外部网络，通过是否成功来判断限制。那我们开始吧。

## 创建一个简单的隧道

刚开始，我们假设SSH链接是不被防火墙屏蔽的，但是我们只能在办公室收取邮件。这意味着25和110端口（SMTP和POP）端口只对本地网络开放。但是我们如何才能在外部服务器（`EXT_POP_SVR`）接收邮件，在外部的服务器（`EXT_SMTP_SVR`）发送邮件？这就要用到隧道了。我们只要使用SSH连接`REMOTE_HOST`，并且添加一个参数。通过如下的命令，我们在办公室的电脑与家里的电脑之间开通了一条隧道：

    worker@LOCAL_HOST:~$ ssh user@IP_NUMBER \\
    -L 10025:EXT_SMTP_SVR:25 -L 10110:EXT_POP_SVR:110
    

让我来解释一下。`-L`选项可以理解为“监听本地端口”。在空格之后，我们添加了SSH要监听的端口（在我们的例子中，我们使用了10025和10110，但是这仅仅是例子；你可以选择不同的端口，但是如果端口号小于1024的话就需要`root`权限了）。在第一个冒号后面，我们注明了`REMOTE_HOST`转发的链接。在第二个冒号后面，我们声明了最终服务器/计算机需要等待我们链接的端口。需要强调的是，在第一个冒号之后，我们给出的是一个和`REMOTE_HOST`相关的地址。如何你想要通过隧道链接`REMOTE_HOST`的22端口，你应该使用如下命令：

    worker@LOCAL_HOST:~$ ssh user@IP_NUMBER -L 10025:localhost:25
    

让我们回到刚才的隧道。我们现在可以配置一个连接外部服务器的邮件客户端。就如我之前提到的那样，我们监听10025端口的`LOCAL_HOST`如今变成了监听23端口的`EXT_SMTP_SVR`服务器。以此类推，我们可以这么说，`localhost:10110`就是`EXT_POP_SVR:110`。现在我们应该把我们邮件客户端的接收端配置为localhost下的10110端口（SSH会在`REMOTE_HOST`端为我们继续完成通信）。通常，配置成`LOCAL_HOST`的本地主机应当指向自己。于是，客户端的发送端应配置为localhost下的10025端口。

Note that you don’t have to use your IP_NUMBER all the time. If you want to use REMOTE_HOST by its name you need to put a line like this

这个十分简单的方式（至少我是这么觉得的）只能绕过不是很复杂的网络限制。但是你的网络管理员不会坐视不管。

注意，其实你不需要每次都使用`IP_NUMBER`。如果你想使用`REMOTE_HOST`的话，你需要在`/etc/hosts`文件（你的工作电脑）中，添加如下一行，

    IP_NUMBER REMOTE_HOST
    

你的机器会迅速帮你把`REMOTE_HOST`解析到`IP_NUMBER`上。只有当`REMOTE_HOST`是一个域名（或者你真的希望一直使用`IP_NUMBER`）时，你才不需要做上面那步。尽管如此，本文还是使用`IP_NUMBER`。

## 让我们开始更高级的吧

现在我们的状况又发生了改变。办公室中的某人滥用了WWW，然后老板限制了HTTP的访问。当然，这里我们不会关注限制是如何实现的。但是22端口还是开放的，然而80端口（用于HTTP通讯的）却被关闭了。如果我们会使用隧道的话，这不会是个大问题。

It seems impossible but even the Google search has been blocked. So, to solve this unfortunate situation, we sit down and log onto our REMOTE_HOST like that:

这看起来似乎不可能了，甚至Google搜索也被屏蔽了。所以，为了解决这个不幸的状况，我们会继续登录我们的`REMOTE_HOST`：

    worker@LOCAL_HOST:~$ ssh user@IP_NUMBER \\
    -L 10080:www.google.com:80

 [1]: http://polishlinux.org/apps/ssh-tunneling-to-bypass-corporate-firewalls/
 [2]: http://polishlinux.org/apps/ssh-tricks/
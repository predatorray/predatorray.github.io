---
layout: post
title: Shadowsocks搭建简易教学
comments: true
keywords: shadowsocks,kcptun,安装,教程,翻墙,代理
---

# 事先准备

一台Linux主机：

* 连接互联网
* **位于墙外**
* Ubuntu Xenial

# 安装步骤

以下的安装步骤以Ubuntu Xenial发行版为例，如果未其他Ubuntu版本或Linux发行版，过程类似但可能使用了不同的包管理，配置文件的路径也可能有所改变。

以下操作都需要使用`root`用户。

当然，如果你已经安装了Docker，那么可以参考[shadowsocks-kcptun-docker](https://github.com/predatorray/shadowsocks-kcptun-docker)，直接完成服务器部分的安装，直接看[客户端配置](#client-configurations)。

## 安装Python

    apt-get update # 更新源
    apt-get install python python-setuptools python-pip
    pip install --upgrade pip # 升级到最新的pip

## 安装Shadowsocks

    pip install shadowsocks

此时，shadowsocks的执行程序安装到了`/usr/local/bin`目录下。

## 安装Kcptun

kcptun是一款能有效提升shadowsocks速度的加速器软件，目前shadowsocks的mac版客户端也支持此协议，推荐安装。

    wget --no-check-certificate 'https://github.com/xtaci/kcptun/releases/download/v20171201/kcptun-linux-amd64-20171201.tar.g' -O kcptun.tar.gz # 下载最新的二进制包
    mkdir -p /usr/local/kcptun # 创建安装目录
    tar -zxf /tmp/kcptun.tar.gz -C /usr/local/kcptun # 解压

此时kcptun的两个二进制文件`server_linux_amd64`和`client_linux_amd64`就安装在`/usr/local/kcptun`目录下了。

## 启动

### 安装Supervisor守护进程

    apt-get install supervisor

### 配置启动参数

在`/etc/supervisor/conf.d`目录下创建`shadowsocks-kcptun.conf`文件，在文件中添加如下内容：

    [program:shadowsocks]
    command = ssserver -p 8388 -k '<shadowsocks的密码>' -m 'aes-256-cfb' --user nobody

    [program:kcptun]
    user = nobody
    command = /usr/local/kcptun/server_linux_amd64 --target '127.0.0.1:8388' --listen ':29900' --crypt 'aes'

其中，`<shadowsocks的密码>`需更换为你自己的密码，之后在客户端连接时需要。`-p 8388`和`--listen ':29900'`为端口配置，可以自行修改，但是需要注意`--target '127.0.0.1:8388'`中的端口需要和`-p 8388`中的保持一致。

### 启动

    systemctl start supervisor

至此，服务器这边的配置就完成了。

## <a id="client-configurations"></a>客户端配置

![](/images/c60590d6b8b65825f3392877bbef9176.png)

在shadowsocks的配置栏中，地址填Linux主机的IP地址。由于使用kcptun，第一行端口不需要填，如直接连shadowsocks，填`8388`。加密方式选`aes-256-cfb`。

在kcptun配置栏中，Kcptun Port填`29900`，mode选`fast2`，Encryption选`aes`，密码使用默认的。

---
layout: post
title: 在Ubuntu上运行Dokku
comments: true
keywords: dokku,ubuntu
---

[Dokku][1]是一个小型的PAAS平台，支持Ruby、Node.js、Java、Play!、Python、PHP、Clojure、Go、Dart。其实就是一个小型的[Heroku][2]云平台。可以使用简易的方式部署小型应用（只需用`git`将代码`push`到对应的仓库就自动触发部署）。下面来介绍一下如何在Ubuntu上安装及配置Dokku的。

下述的安装方式是基于Ubuntu 12.04.3 x32版本的，对于更高版本的Ubuntu系统，其安装方式基本是类似的。安装的过程十分简单，许多过程是依靠提供的脚本自动完成的，你只需要了解一些基本的Linux操作知识就足够了。

## 安装

首先使用`root`账户登录你的Ubuntu服务器。（在本机上测试的话，只需要`su`切换一下用户就好了）

安装必需的软件包（通常，只有在Ubuntu 12.04版本需要执行下面的步骤，对于更高的版本可以跳过）

    apt-get install -y python-software-properties
    

执行下面的脚本，自动完成整个Dokku的下载与安装

    wget -qO- https://raw.github.com/progrium/dokku/v0.2.1/bootstrap.sh | sudo DOKKU_TAG=v0.2.1 bash
    

这个过程大约需要5分钟时间。

## 配置

等待其自动安装完毕之后，就可以开始配置Dokku了。通常有如下两种Dokku应用的发布方式：

1.  将Dokku发布在某个特定的域名的子域名下。应用将发布在类似`http://<应用名称>.<域名>:80`的url上面。
2.  将Dokku发布在一个自动分配的端口上面。应用则会以`http://<域名>:<自动分配的端口>`形式访问，然后可以通过配置nginx把某个特定的路径来转发到这个应用上。

对于第一种方式，需要当前的服务器已配置主机名。通过修改`/home/dokku/VHOST`来指定自己应用的根域名。并且还需要这个根域名的DNS记录，比较麻烦也不常用，因此接下来主要讲一下第二种。

在安装结束后，进入`/home/dokku`目录，

    cd /home/dokku
    

如果已存在`/home/dokku/VHOST`文件，则暂时删除它（这里我们使用重命名的方式），

    mv /home/dokku/VHOST /home/dokku/VHOST~
    

然后，为了方便在部署完应用后定位应用实际的url，我们需要在`/home/dokku/HOSTNAME`设置自己的主机名或是域名，

    echo "<你的主机名，如localhost、example.com>" > /home/dokku/HOSTNAME
    

由于dokku使用的`git`来完成应用的部署，我们需要将我们的公钥上传到dokku上，使dokku能验证我们的身份。

如果你还没有生成自己的公钥和私钥的话，在你的本机上（不是服务器）运行如下命令，来生成。

    ssh-keygen -t rsa
    

生成一对公钥和私钥后，我们需要把公钥上传到服务器上，在你的本机上运行如下命令，（这里我们假设你使用默认的配置，把密钥都生成在`~/.ssh目录下，并且名称为id_rsa`）

    cat ~/.ssh/id_rsa.pub | ssh root@<你的服务器> "sudo sshcommand acl-add dokku progrium"
    

这样，你就完成了配置，可以开始部署你的应用了。

## 部署

接下来，我示范一下如何部署一个由Heroku提供的node.js的示例应用。

首先在本机上使用git克隆这个项目，

    git clone https://github.com/heroku/node-js-sample -o sample
    

接着添加我们刚配置好的dokku应用地址，

    cd node-js-sample
    git remote add dokku dokku@<你的dokku服务器，例如example.com>:<应用名称，例如node-js-app>
    

把示例应用推送到服务器上，

    git push dokku master
    

在`push`的时候，dokku自动触发了部署脚本，在一小段时间的等待后，会有如下的输出，

    -----> Building runtime environment
    -----> Discovering process types
           Procfile declares types -> web
    -----> Releasing node-js-app ...
    -----> Deploying node-js-app ...
    -----> Cleaning up ...
    =====> Application deployed:
           http://<你的dokku服务器>:<端口>
    

访问上述输出最后一段的url就能看到`Hello World!`了。接下来，你可以通过配置nginx，把80端口转发到这个端口上来。

如果想直接使用而不想自己配置的话，可以试一下[DigitalOcean][3]自动配置的Dokku应用。当然你也可以使用他们提供的云主机，从零开始配置，下面是DigitalOcean的链接。

[![][4]][3]

 [1]: https://github.com/progrium/dokku
 [2]: https://www.heroku.com/
 [3]: https://www.digitalocean.com/?refcode=94565696c539
 [4]: /images/ssd-virtual-servers-banner-2-728x90.jpg

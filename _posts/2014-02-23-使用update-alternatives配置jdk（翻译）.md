---
layout: post
title: 使用update-alternatives配置jdk（翻译）
comments: true
keywords: update-alternatives,java,jdk
---

原文地址：[How to setup up a new JDK with update-alternatives?][1]

`update-alternatives` 是一个十分好用、聪明的工具，特别适用于那些需要维护不同版本SDK的开发者。我经常使用它的这个功能来管理不同的Ruby版本、JDK版本以及其他的一些SDK，但是我每次都需要上Google搜如何使用。我发现每次都需要去google很浪费时间，于是我最后决定学一下它的用法，然后发现其实并不复杂。事实上，你只需要记住几个参数。

首先，我们需要知道这个工具是用来干嘛的。它是用来管理默认命令的符号链接（symbolic link）的。你可以创建、删除、维护以及显示关于这个符号链接的信息，而这些信息是使用一个替换系统来管理的。它最早在Debian系统中实现。除此之外还有其他系统有再实现的版本，其中一个就是Ubuntu。

其中，有两个主要的概念：

1.  链接组（link groups）：一系列相关的符号链接，它们会以一个组的形式被更新
2.  链接： 
    *   主链接：它决定了这个组中其他链接的配置
    *   附链接：它被组中主链接的设置控制

接下来让我举一个实际的例子，使用update-alternatives配置一个新装的JDK（Java Development Kit）。首先我们需要知道什么是JDK，就如它的名字一样，它是一个开发基于JVM（Java虚拟机）应用所需的开发包，和其他的SDK一样，其中有许多命令行工具。我们假设在我们的系统中已经有了其他的JDK版本，我们需要配置JDK中这些命令行工具，使它们作为一个组同时生效。我们不希望这些命令行工具中出现版本不一致的情况。它们应当同时生效，如果我切换一个版本，那于此同时这个组中所有的命令行将一起切换。

JDK包括如下命令行工具：

*   jar
*   jarsigner
*   **java**
*   javac
*   javadoc
*   javah
*   javap
*   javaws

首先，我们需要决定在这个组中，哪个将充当主链接。事实上，这个是我的习惯，因为我喜欢将它们一起切换。你可能喜欢其他形式的组合，这个随你的使用习惯而定。对我来说，我会把`java`作为主链接。

以下是安装一个替代链接（alternative）的语法。通常，你只需要决定链接的名称、组、实际可执行的位置以及优先级。

    --install link name path priority [--slave link name path]
    

然后我们把这些命令行安装到替代链接系统中。我们会把`java`作为主链接、其他作为附链接，安装到java组中。我们可以通过简单地执行如下的命令来完成：

    sudo update-alternatives --install java java /opt/jdk1.5.0_22_64bit/bin/java  200 \
    --slave jar java /opt/jdk1.5.0_22_64bit/bin/jar \ 
    --slave jarsigner java /opt/jdk1.5.0_22_64bit/bin/jarsigner \ 
    --slave javac java /opt/jdk1.5.0_22_64bit/bin/javac \
    --slave javadoc java /opt/jdk1.5.0_22_64bit/bin/javadoc \ 
    --slave javah java /opt/jdk1.5.0_22_64bit/bin/javah \
    --slave javap java /opt/jdk1.5.0_22_64bit/bin/javap \
    --slave javaws java /opt/jdk1.5.0_22_64bit/bin/javaws
    

另一种方式，可以把所有的命令行作为不同组的主链接来安装。但是，这意味着如果你想要切换成另一个版本的JDK，你需要一个一个的切换。如下是这种方式的命令：

    sudo update-alternatives --install java java /opt/jdk1.5.0_22_64bit/bin/java  200
    sudo update-alternatives --install jar jar /opt/jdk1.5.0_22_64bit/bin/jar  
    sudo update-alternatives --install jarsigner jarsigner /opt/jdk1.5.0_22_64bit/bin/jarsigner 
    sudo update-alternatives --install javac javac /opt/jdk1.5.0_22_64bit/bin/javac
    sudo update-alternatives --install javadoc javadoc /opt/jdk1.5.0_22_64bit/bin/javadoc 
    sudo update-alternatives --install javah javah /opt/jdk1.5.0_22_64bit/bin/javah
    sudo update-alternatives --install javap javap /opt/jdk1.5.0_22_64bit/bin/javap
    sudo update-alternatives --install javaws javavs /opt/jdk1.5.0_22_64bit
    

或者，你还可以同时使用上述的两种方式，你可以分别创建多个链接组以及多个主链接。例如，把java运行时环境相关的命令行安装为以java为主链接的同一个组；把java开发环境相关的命令行安装为以javac为主链接的同一个组。

个人比较喜欢第一种选择，你可以选择你喜欢的方式。

 [1]: http://www.codinginahurry.com/2010/12/29/how-to-setup-up-a-new-jdk-with-update-alternatives/

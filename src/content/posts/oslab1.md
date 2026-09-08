---
title: "OSLab1"
published: 2023-04-06 10:16:44
description: "操作系统实验之一"
image: "/images/covers/oslab1-11.jpg"
tags: ["OS", "linux"]
category: "OSLab"
draft: false
---
# Lab1 实验报告
**PB21111618 侯超群**
## 实验目标
本次实验用于实现multiboot header部分,并在屏幕以及串口上输出特定内容；
## 实验原理
### multiboot启动协议介绍
multiboot作为一种启动引导协议，能够制定bootloader和操作系统之间的接口，解决多系统与不同bootloader可能的矛盾；

### qemu介绍
qemu作为模拟器，用于模拟硬件设备，其支持multiboot协议，在该实验中，用于提供裸机环境，使用qemu启动所编写的内核；

### VGA介绍
VGA作为一种显示方式，可以通过向VGA显存中写入内容来实现字符的显示；  
VGA显存起始地址0xB8000,由存放字符的ASCLl码以及该字符的显示属性构成两个字节；
![VGA](/images/posts/oslab1/ppI6xiR.png)
### 串口介绍
UART，全称通用异步收发传输器，是一种串行异步收发协议，原理是将传输数据的每个二进制位一位一位地传输；  
在qemu中，在没有初始化波特率的情况下，也可以直接写UART，正确输出；
串口端口地址为0x3F8，可依次调用，实现各个字符输出；

## 源代码说明
~~~
movl $0x2f652f48, 0xB8000
~~~

该段代码中，将字符以及显示属性，写入VGA显存中，其中0x2f652f48中,65,48分别对应ASCLL码中的e,H；前面的2f为其显示属性，写入到起始地址0x8000；
~~~
movw $0x3F8, %dx
~~~

该段代码中，初始化串口，将串口端口地址存入dx寄存器，便于之后输出显示；
~~~
movb $0x68, %al
~~~
该段代码中，将待显示的字符h写入寄存器al中，再通过outb实现输出；

## 代码布局说明
~~~
OUTPUT_FORMAT("elf32-i386", "elf32-i386", "elf32-i386")
OUTPUT_ARCH(i386)
ENTRY(start)

SECTIONS {
        . = 1M;
        .text : {
                *(.multiboot_header)
                . = ALIGN(8);
                *(.text)
        }
}
~~~
* .表示当前位置，则.=1M使用物理内存的1M开始放置数据和代码；
* 内容以multiboot_header开始，12个字节；
* .=ALIGN(8)，8字节对齐后放置写入VGA的代码；

## 编译过程说明
~~~
ASM_FLAGS= -m32 --pipe -Wall -fasm -g -O1 -fno-stack-protector

multibootHeader.bin: multibootHeader.S
				gcc -c ${ASM_FLAGS} multibootHeader.S -o multibootHeader.o
				ld -n -T multibootHeader.ld multibootHeader.o -o multibootHeader.bin

clean:
				rm -rf ./multibootHeader.bin ./multibootHeader.o
~~~
* 以上为Makefile文件，ASM_FLAGS先定义汇编标记，表示编译中gcc指令的参数；
* 使用gcc生成目标文件.o文件；
* 根据链接器.ld文件，根据部署要求从.o文件得到.bin文件；
* clean指令用于删除生成的.o文件和.bin文件；

在使用make指令生成.bin文件后，输入如下指令来运行qemu
~~~
qemu-system-i386 -kernel multibootHeader.bin -serial stdio
~~~
其中qemu-system-i386指定平台i386，-kernel指定内核文件，-serial stdio指定串行终端为标准输入输出

## 实验结果
* 串口输出如下：**显示hcq**
![串口显示](/images/posts/oslab1/ppI6jo9.png)
* VGA输出如下：**显示Hello,PB21111618-houchaoqun!**
![VGA显示](/images/posts/oslab1/ppI6XdJ.png)

## 问题
开始时使用vmware虚拟机时在Vmaretools设置共享文件夹，但无法找到/mnt/c/下的共享文件夹，经搜索无果，因此又采用了第一种方法配置wsl2，通过建立符号链接实现配置；

---
title: "String"
published: 2023-01-20 16:28:25
description: "数据结构之四串"
image: "/images/covers/string-5.jpg"
tags: ["数据结构", "C"]
category: "数据结构"
draft: false
---
# String
## 类型定义
串（字符串）是由零个或多个字符组成的有限序列；
* **串的长度**：串中字符数目n称为**串的长度**；
* **空串**：零个字符的串称为**空串**，长度为零；
* **子串**：串中任意个连续的字符组成的子序列称为该串的**子串**；
* **主串**：包含子串的串相应地称为**主串**；
* **位置**：字符在序列中的序号为该字符在串中的**位置**；
  
**抽象数据类型**
~~~c
StrAssign(&T, chars)          //生成一个其值为chars的串T
StrCopy(&T, S)                //由串S复制得串T
StrEmpty(S, T)                //若S为空串，则返回TRUE，否则返回FALSE
StrCompare(S, T)              //S > T，返回值大于0；S = T，返回值等于0； S < T，返回值小于0 
StrLength(S)                  //返回S的元素个数，称为串的长度
ClearString(&S)               //将S清为空串
Concat(&T, S1, S2)            //T返回S1和S2连接的新串
SubString(&Sub, S, pos, len)  //Sub返回串S的第pos个字符起长度为len的子串
Index(S, T, pos)              //返回主串S中第pos个字符之后第一次出现与串T相同的子串的位置，无则返回0
Replace(&S, T, V)             //用V替换主串S中出现的所有与T相等的不重叠的子串
StrInsert(&S, pos, T)         //在串S的pos个字符之前插入串T
StrDelete(&S, pos, len)       //从串S中删除第pos个字符起长度为len的子串
DestoryString(&S)             //销毁串S
~~~
上述13中操作中，StrAssign,StrCompare,StrLength,Concat,SubString五种操作构成串类型的最小操作子集；  
如下根据最小操作子集实现Index操作：  
~~~c
int Index(String S, String T, int pos)
{
  if(pos > 0)
  {
    int n = StrLength(S);
    int m = StrLength(T);
    int i = pos;
    String sub;
    while(i <= n - m + 1)
    { //从S的pos位置后依次取T长度个的子串进行比较
      SubString(sub, S, i, m);
      if(StrCompare(sub, T) != 0)
        i++;
      else 
        return i;
    }
  }
  return 0;
}
~~~

## 串的表示及实现
### 定长顺序存储结构
用一组地址连续的储存单元存储，如下：
~~~c
#define MAXSTRLEN 255
#define OK 1
#define ERROR 0
typedef int Status;
typedef unsigned char SString[MAXSTRLEN + 1]; //0号单元存放串的长度
~~~

### 基本实现
#### Concat

### 堆分配存储结构
仍采用一组地址连续的储存单元存放，但存储空间采取动态分配，如下：
~~~c
typedef struct
{
  char *ch;
  int length;
}HString;
~~~

### 基本实现

### 块链存储结构
采取链表形式存储串值，用户自定义节点即块的大小，称之为块链结构；  
~~~c
#define CHUNKSIZE 80  //自定义块的大小
typedef struct Chunk
{
  char ch[CHUNKSIZE];
  struct Chunk *next;
}Chunk;
typedef struct
{
  Chunk *head, *tail; //串的头尾指针
  int curlen;         //当前长度
}LString;
~~~

## 模式匹配算法
### 求子串位置的定位函数Index(S, T, pos)
子串的定位操作称作串的**模式匹配**，其中T称为**模式串**；  
如下采取定长顺序存储结构，实现不依赖其他串操作的匹配算法：
~~~c
int Index(SString S, SString T, int pos)
{ //返回子串T在主串S中第pos个字符之后的位置，若不存在，返回0
  int i = pos, j = 1;
  while(i <= S[0] && j <= T[0])
  {
    if(S[i] == T[j])
    {
      i++;
      j++;
    }
    else
    { //指针回退，重新匹配
      i = i - j + 2;
      j = 1;
    }
  }
  if(j > T[0])
    return i - T[0];
  else 
    return 0;
}
~~~
不过，有些情况下，该算法的效率较低，比如模式串为 00000001 ，主串为 00000000000000000000000000000000000000000000000000001 时，时间复杂度达到O(n*m);

### KMP算法


## 串的应用

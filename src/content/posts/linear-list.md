---
title: "Linear_list"
published: 2023-01-18 18:35:06
description: "数据结构之一线性表"
image: "/images/covers/linear-list-2.webp"
tags: ["数据结构", "C"]
category: "数据结构"
draft: false
---
# Linear_list 

## 类型定义
一个线性表是n个数据元素的有限序列，线性表中的元素个数n定义为线性表的长度，n=0时成为空表；  
抽象数据类型：
~~~c
InitList(&L)                //构造空线性表L
DestroyList(&L)             //销毁线性表L
ClearList(&L)               //将L重置为空表
ListEmpty(L)                //若L为空表返回TRUE，否则返回FALSE
ListLength(L)               //返回L中数据元素个数
GetElem(L, i, &e)           //用e返回L中第i个元素的值
//不常用
LocateElem(L, e, compare()) //返回L中第一个与e满足关系compare()的数据元素的位序，若不存在，则返回0
PriorElem(L, cur_e, &pre_e) //用pre_e返回L中数据元素cur_e的前驱
NextElem(L, cur_e, &next_e) //用next_e返回L中数据元素cur_e的后继
ListInsert(&L, i, e)        //在L的第i个位置前插入新数据元素e，长度更新
ListDelete(&L, i, &e)       //删除L的第i个数据元素，并用e返回其值，长度更新
ListTraverse(L, visit())    //依次对L的每个数据元素调用函数visit()
~~~

## 顺序表示和实现
### 顺序表示
~~~c
#define MAXSIZE 20
#define OK 1
#define ERROR 0
typedef struct{
  ElemType *elem;
  int length;
}SqList;
~~~

### 基本实现
#### InitList
~~~c
Status InitList(SqList *L)
{ //构造空线性表
  L->elem = (ElemType *)malloc(MAXSIZE * sizeof(ElemType));
  if(!L->elem)
    return ERROR;
  L->length = 0;
  return OK;
}
~~~
#### ListInsert
~~~c
Status ListInsert(SqList *L, int i, ElemType e)
{ //顺序表插入
  int k;
  if(i < 1 || i > L->length + 1)
    return ERROR;
  for(k = L->length - 1; k >= i - 1; k--)
    L->elem[k + 1] = L->elem[k];
  L-elem[i - 1] = e;
  L->length++;
  return OK;
}
~~~
#### ListDelete
~~~c
Status ListDelete(SqList *L, int i, ElemType *e)
{ //顺序表删除
  int k;
  if(i < 1 || i > L->length)
    return ERROR;
  *e = L->elem[i - 1];
  if(i < L->length)
  {
    for(k = i; k < L->length; k++)
      L->elem[k - 1] = L->elem[k];
  }
  L->length--;
  return OK;
}
~~~

## 链式表示和实现
### 链式表示
~~~c
#define OK 1
#define ERROR 0

typedef int Status;
typedef int ElemType;

//节点结构体
typedef struct Node
{
  ElemType data;
  struct Node *next;
}Node;
//单链表
typedef struct
{
  int length;
  Node *next; //头指针(不储存任何值)，指向头结点
}*LinkList;
~~~


### 基本实现
#### InitList
~~~c
Status InitList(LinkList *L)
{ //创建单链表以及新节点
  LinkList p = (LinkList)malloc(sizeof(LinkList));
  Node *q = (Node *)malloc(sizeof(Node));   //创建头结点
  q->next = NULL;
  p->next = q;
  p->length = 0;
  (*L) = p;
  return OK;
}
~~~
#### ListInsert
~~~c
Status ListInsert(LinkList *L, ElemType elem. int pos)
{ //单链表插入
  if(pos < 1 || pos > (*L)->length + 1)
    return ERROR;     //范围
  Node *p = (*L)->next;
  for(int i = 1; i < pos; i++)
    p = p->next;
  //创建新节点插入
  Node *q = (Node *)malloc(sizeof(Node));
  q->data = elem;
  q->next = p->next;
  p->next = q;
  (*L)->length += 1;
  return OK;
}
~~~
#### ListDelete
~~~c
Status ListDelete(LinkList *L, ElemType *elem, int pos)
{ //单链表删除
  if(pos < 1 || pos > (*L)->length)
    return ERROR;
  //查找
  Node *p = (*L)->next, *q;
  for(int i = 0; i < pos; i++)
    p = p->next;
  //删除
  q = p->next;
  p->next = q->next;
  free(q);
  (*L)->length -= 1;
  return OK;
}
~~~

## 循环链表
表中最后一个节点的指针域指向头结点，整个链表形成一个环；

考虑此时查找最后一个节点时其时间复杂度为O(n)，可对此优化在循环链表中设立尾指针；同时这样也可简化某些操作，比如两个线性表合并时，仅需将表的表尾与另一个表的表头相接；

## 双向链表
### 存储结构
在双向链表的节点中有两个指针域，即后继与前驱；
~~~
typedef struct DuLNode
{
  ElemType data;
  struct DuLNode *prior;
  struct DuLNode *next;
}DuLNode, *DuLinkList;
~~~

### 基本实现
#### ListInsert
~~~c
Status ListInsert(DuLinkList *L, int i, ElemType e)
{ //插入操作
  DuLNode *p, *s = (DuLNode *)malloc(sizeof(DuLNode));
  //查找位置
  if(!(p = GetElemP_DuL(L, i)))
    return ERROR;
  s->data = e;
  //更新s前驱
  s->prior = p->prior;
  p->prior->next = s;
  //更新s后继
  s->next = p;
  p->prior = s;
  return OK;
}
~~~
#### ListDelete
~~~c
Status ListDelete(LinkList *L, int i, ElemType *e)
{ //删除操作
  DuLNode *p;
  if(!(p = GetElemP_DuL(L, i)))
    return ERROR;
  (*e) = p->data;
  p->prior->next = p->next;
  p->next->prior = p->prior;
  free(p);
  return OK;
}
~~~

## 静态链表
### 存储结构
借用一维数组来描述线性链表，便于在不设“指针”类型的高级程序设计语言中使用链表结构；  
游标指向下一个节点，在作线性表的插入和删除操作时无需移动元素，仅需修改指针；  
其中未被使用的数组成为备用链表，插入时从其中取得，删除时回收到备用链表中；同时规定下标为0的cur为备用链表第一个节点的下标，数组最后一个元素的cur为第一个有数值的元素的下标，若链表为空，则为0；
~~~c
//静态单链表存储结构
#define MAXSIZE 1000  //链表最大长度
typedef struct
{
  ElemType data;
  int cur;  //游标，为0时无指向
}component, SLinkList[MAXSIZE];
~~~

### 基本实现
#### InitSpace_SL
~~~c
void InitSpace_SL(SLinkList *space)
{ // 将一维数组space中各分量链成一个备用链表，space[0].cur为头指针
  for (int i = 0; i < MAXSIZE - 1; i++)
    space[i]->cur = i + 1;
  space[MAXSIZE - 1]->cur = 0;  //无指向
}
~~~
#### LocateElem_SL
~~~c
Status LocateElem_SL(SLinkList *S, ElemType e)
{ // 查找元素，返回位序
  int i = S[0]->cur;
  while (i && S[i]->data != e)
    i = S[i]->cur;
  return i;
}
~~~
#### Malloc_SL
~~~c
int Malloc_SL(SLinkList space)
{ // 若备用空间链表非空，返回分配的节点下标，否则为0
  int i = space[0].cur; // 每次从头结点开始
  if (space[0].cur)     // 可分配
    space[0].cur = space[i].cur;
  return i;
}
~~~
#### Free_SL
~~~c
void Free_SL(SLinkList *space, int k)
{ // 将下标为k的空闲节点回收到备用链表
  space[k]->cur = space[0]->cur;
  space[0]->cur = k;
  // 相当于在0与其[0].cur之间插入k
}
~~~
#### ListInsert
~~~c
Status ListInsert(component *L, int i, ElemType e)
{ //插入操作
  if(i < 1 || i > ListLength(L) + 1)
    return ERROR;
  //获取空间
  int k = Malloc_SL(L);
  n = MAXSIZE - 1;  //从最后一个元素开始，即头结点
  if(k)
  {
    L[k].data = e;
    for(int l = 1; l <= i - 1; l++)
      n = L[n]->cur;        //找到第i个元素前的下标
    L[k]->cur = L[n]->cur;  
    L[n]->cur = k;          //插入
    return OK;
  }
  return ERROR;
}
~~~
#### ListDelete
~~~c
Status ListDelete(component *L, int i)
{
  if(i < 1 || i > ListLength(L) + 1)
    return ERROR;
  int n = MAXSIZE - 1;
  for(int j = 1; j <= i - 1; j++)
    n = L[n].cur;           //查找
  j = L[n].cur;
  L[n].cur = L[j].cur;      //删除
}
~~~

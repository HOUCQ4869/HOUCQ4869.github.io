---
title: "Queue"
published: 2023-01-20 11:22:44
description: "数据结构之三队列"
image: "/images/covers/queue-4.webp"
tags: ["数据结构", "C"]
category: "数据结构"
draft: false
---
# Queue
## 类型定义
队列是一种先进先出(first in first out FIFO)的线性表，只允许在表的一端插入元素，另一端删除；允许插入的一端称为队尾，允许删除的一端称为队头；  
**抽象数据类型**
~~~c
InitQueue(&Q)               //构造空队列Q
DestroyQueue(&Q)            //销毁队列Q
ClearQueue(&Q)              //将Q清为空队列
QueueEmpty(&Q)              //若Q为空队列，返回TRUE，否则FALSE
QueueLength(Q)              //返回Q的元素个数，即队列长度
GetHead(Q, &e)              //用e返回Q的队头元素
EnQueue(&Q, e)              //插入元素e为新的队尾元素
DeQueue(&Q, &e)             //删除Q的队头元素，并用e返回其值
QueueTraverse(Q, visit())   //从队头到队尾，依次对Q的每个数据元素调用函数visit()，visit()失败，操作失败
~~~

## 顺序存储结构
### 存储结构
若采取顺序栈的结构将会造成假溢出，将顺序栈的结构改善为环状空间，可充分利用分配的存储空间，称之为循环队列；  
注意此时仅凭借Q->front == Q->rear并不能判断队列空间为“空”还是“满”，可有如下处理方法：  
* 设置一个标志位以区别队列为“空”还是“满”；
* 减少一个元素空间的使用，队列头指针在队列尾指针的下一位置作为队列“满”的标志；

在这里采取第二种处理方式，Q->front == Q->rear仅作为队列空的标志；
~~~c
#define MAXQSIZE 100
typedef int QElemType;

typedef struct 
{
  QElemType *base;  //初始化的动态分配存储空间
  int front;        //头指针，若不空，指向队列头元素
  int rear;         //尾指针，若不空，指向队列尾元素的下一个位置
}SqQueue;
~~~

### 基本实现
#### InitQueue
~~~c
Status InitQueue(SqQueue *Q)
{ // 构造空队列
  Q->base = (QElemType *)malloc(MAXQSIZE * sizeof(QElemType));
  if (!Q->base)
    return ERROR;
  Q->front = Q->rear = 0;
  return OK;
}
~~~

#### QueueLength
~~~c
int QueueLength(SqQueue Q)
{ // 返回队列长度
  return (Q.rear - Q.front + MAXQSIZE) % MAXQSIZE;
  // 考虑到相减后结果可能是负数，因此要加上MAXQSIZE
}
~~~

#### EnQueue
~~~c
Status EnQueue(SqQueue *Q, QElemType e)
{ // 插入新的队尾元素e
  // 队列满
  if ((Q->rear + 1) % MAXQSIZE == Q->front)
    return ERROR;
  Q->base[Q->rear] = e;
  Q->rear = (Q->rear + 1) % MAXQSIZE;
  return OK;
}
~~~

#### DeQueue
~~~c
Status DeQueue(SqQueue *Q, QElemType *e)
{ // 删除队头元素，并用e返回其值
  if (Q->front == Q->rear)
    return ERROR;
  *e = Q->base[Q->front];
  Q->front = (Q->front + 1) % MAXQSIZE;
  return OK;
}
~~~

#### 测试
~~~c
int main()
{
  SqQueue *Q = (SqQueue *)malloc(sizeof(SqQueue));
  InitQueue(Q);
  EnQueue(Q, 1);
  printf("%d %d %d\n", Q->base[Q->front], Q->base[Q->rear - 1], QueueLength(*Q));
  EnQueue(Q, 2);
  printf("%d %d %d\n", Q->base[Q->front], Q->base[Q->rear - 1], QueueLength(*Q));
  int *e = (int *)malloc(sizeof(int));
  DeQueue(Q, e);
  printf("%d %d %d\n", Q->base[Q->front], Q->base[Q->rear - 1], QueueLength(*Q));
  printf("%d\n", *e);
  return 0;
}
~~~

## 链式存储结构
### 存储结构
单链队列，队列的链式存储结构，链队列同时也添加一个头结点，并令头指针指向头结点，头指针与尾指针均指向头结点即空的链队列的判定条件；
~~~c
typedef int QElemType;

typedef struct QNode
{
  QElemType data;
  struct QNode *next;
}QNode, *QueuePtr;
typedef struct
{
  QueuePtr front;   //队头
  QueuePtr rear;    //队尾
}LinkQueue;
~~~

### 基本实现
#### InitQueue
~~~c
Status InitQueue(LinkQueue *Q)
{ // 构造空队列Q
  Q->front = Q->rear = (QueuePtr)malloc(sizeof(QNode));
  if (!Q->front)
    return ERROR;
  Q->front->next = NULL;
  return OK;
}
~~~

#### DestoryQueue
~~~c
Status DestoryQueue(LinkQueue *Q)
{ // 销毁队列Q
  while (Q->front)
  { // 从队头向后依次销毁
    Q->rear = Q->front->next;
    free(Q->front);
    Q->front = Q->rear;
  }
  return OK;
}
~~~

#### EnQueue
~~~c
Status EnQueue(LinkQueue *Q, QElemType e)
{ // 插入元素e为新的队尾元素
  QueuePtr p = (QueuePtr)malloc(sizeof(QNode));
  if (!p)
    return ERROR;
  p->data = e;
  p->next = NULL;
  Q->rear->next = p;
  Q->rear = p; // 更新队尾指针
  return OK;
}
~~~

#### DeQueue
注意队头指针指向头结点，需要删除的是Q->front->next该节点；
~~~c
Status DeQueue(LinkQueue *Q, QElemType *e)
{ // 删除队头元素，并用e返回其值
  if (Q->front == Q->rear)
    return ERROR;
  QueuePtr p = (QueuePtr)malloc(sizeof(QNode));
  p = Q->front->next;
  Q->front->next = p->next; // 无需修改头结点
  if (Q->rear == p)
    Q->rear = Q->front;
  free(p);
  return OK;
}
~~~

#### 测试
~~~c
int main()
{
  LinkQueue *Q = (LinkQueue *)malloc(sizeof(LinkQueue));
  InitQueue(Q);
  EnQueue(Q, 1);
  printf("%d %d\n", Q->front->next->data, Q->rear->data);
  EnQueue(Q, 2);
  printf("%d %d\n", Q->front->next->data, Q->rear->data);
  int *e = (int *)malloc(sizeof(int));
  DeQueue(Q, e);
  printf("%d %d\n", Q->front->next->data, Q->rear->data);
  DestoryQueue(Q);
  return 0;
}
~~~

## 双端队列
双端队列(double ended queue, deque)是限定插入和删除操作在表的两端进行的线性表；  
在实际使用中还有，输出受限的双端队列（一个端点允许插入删除，另一个端点只允许插入），输入受限的双端队列（一个端点允许插入删除，另一个端点只允许删除）；若限定双端队列从某个端点插入只能在该端点删除，即演变为两个栈底相邻接的栈；

未完待续……

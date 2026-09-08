---
title: "Stack"
published: 2023-01-19 17:54:19
description: "数据结构之二栈"
image: "/images/covers/stack-3.webp"
tags: ["数据结构", "C"]
category: "数据结构"
draft: false
---
# Stack
## 类型定义
栈是限定仅在表尾进行插入和删除操作的线性表，又称为后进先出(last in first out)的线性表(LIFO结构)，表尾称为栈顶，表头称为栈底，不含元素则称为空栈；  
**抽象数据类型**:
~~~c
InitStack(&S)               //构造空栈S
DestoryStack(&S)            //销毁栈S
ClearStack(&S)              //将S清为空栈
StackEmpty(S)               //若S为空栈返回TRUE,否则FALSE
StackLength(S)              //返回栈S的元素个数，即栈的长度
GetTop(S, &e)               //用e返回S的栈顶元素
Push(&S, e)                 //插入元素e为新的栈顶元素
Pop(&S, &e)                 //删除S的栈顶元素，并用e返回其值
StackTraverse(S, visit())   //从栈顶到栈底依次对S的每个元素调用visit(),visit()失败则操作失败
~~~
## 顺序存储结构
### 存储表示
其中base为NULL时表示栈结构不存在，top==base可作为栈空的标记;  
~~~c
#define STACK_INIF_SIZE 100  //存储空间初始分配量
#define STACKINCREMENT 10    //存储空间分配增量
#define OK 1
#define ERROR 0

typedef int SElemType;
typedef int Status;

typedef struct
{
  SElemType *base;            //栈不存在为NULL
  SElemType *top;
  int stacksize;
}SqStack;
~~~

### 基本实现
#### InitStack
~~~c
Status InitStack(SqStack *S)
{ // 构造空栈S
  S->base = (SElemType *)malloc(STACK_INIF_SIZE * sizeof(SElemType));
  if (!S->base)
    return ERROR;
  S->top = S->base;
  S->stacksize = STACK_INIF_SIZE;
  return OK;
}
~~~

#### GetTop
~~~c
Status GetTop(SqStack S, SElemType *e)
{ // 若栈不空，用e返回S的栈顶元素
  if (S.top == S.base)
    return ERROR;
  (*e) = *(S.top - 1);
  return OK;
}
~~~

#### Push
~~~c
Status Push(SqStack *S, SElemType e)
{ // 插入元素e为栈顶元素
  if (S->top - S->base >= S->stacksize)
  { // 栈满，追加储存空间
    S->base = (SElemType *)realloc(S->base, (S->stacksize + STACKINCREMENT) * sizeof(SElemType));
    if (!S->base)
      return ERROR;
    S->top = S->base + S->stacksize;
    S->stacksize += STACKINCREMENT;
  }
  *S->top++ = e;
  return OK;
}
~~~

#### Pop
~~~c
Status Pop(SqStack *S, SElemType *e)
{ // 若栈不空，则删除S的栈顶元素，并用e返回其值
  if (S->top == S->base)
    return ERROR;
  (*e) = *--S->top;
  return OK;
}
~~~

#### 测试
~~~c
int main()
{
  SqStack *S = (SqStack *)malloc(sizeof(SqStack));
  InitStack(S);
  Push(S, 1);
  printf("%d %d\n", *S->base, *(S->top - 1));
  Push(S, 2);
  printf("%d %d\n", *S->base, *(S->top - 1));
  int *e = (int *)malloc(sizeof(int));
  Pop(S, e);
  printf("%d %d\n", *S->base, *(S->top - 1));
  printf("%d", *e);
  return 0;
}
~~~

## 链式存储结构
### 存储表示
链式存储便于多个栈共享存储空间以及提高其效率，且不存在栈满的情况，通常采用单链表实现，并规定所有操作都是在表头进行；这里没有头结点，直接指向栈顶元素，对于空栈即top == base = NULL；  
~~~c
//节点
typedef struct StackNode
{ 
  ElemType data;
  struct StackNode *next;
}StackNode, *LinkStackPrt;
//链栈
typedef struct LinkStack
{
  LinkStackPrt top;
  int count;
}LinkStack;
~~~

### 基本实现
#### Push
~~~c
Status Push(LinkStack *S, ElemType e)
{ //插入新栈顶元素e
  //创建新节点
  LinkStackPrt p = (LinkStackPrt)malloc(sizeof(StackNode));
  p->data = e;
  p->next = S->top;
  S->top = p;
  S->count++;
  return OK;
}
~~~
#### Pop
~~~c
Status Pop(LinkStack *S, ElemType *e)
{
  LinkStackPrt P;
  if(StackEmpty(*S))
    return ERROR;
  *e = S->top->data;
  p = S->top;
  S->top = S->top->next;
  free(p);
  S->count--;
  return OK;
}
~~~

## 栈的应用
### 表达式求值
#### 波兰式（前缀表达式）
**从左向右读入表达式，如果一个操作符后面跟着两个操作数时，将计算结果作为操作数替换这个操作符和两个操作数，直至计算完成；**  
such as 2 + 3 * (5 - 1)，其波兰式为 + 2 * 3 - 5 1；
#### 逆波兰式（后缀表达式）
相较于波兰式，逆波兰式要更为直接，**当遇到操作符时，将前面两个操作数与这个操作符进行计算，结果替换；**  
如上的 2 + 3 * (5 - 1)用逆波兰式表示为 2 3 5 1 - * +;  
这个过程很容易用栈来实现，将2, 3, 5, 1依次压入栈中，当压入 - 时，判定为操作符，Pop 5, 1,计算结果后再压入栈中，直至压入完成，栈中元素即运算结果；
#### 中缀表达式转化为逆波兰式
由于计算机中广泛应用后缀表达式，因此中缀表达式转为后缀表达式很有必要；  
**从左向右遍历，遇到数字，输出到逆波兰式中；遇到符号，判断其与栈顶符号的优先级，是右括号或者优先级低于栈顶符号，则栈顶元素依次出栈并输出到逆波兰式中，并将当符号进栈，直至输出结束**

如 2 + 3 * (5 - 1)则过程如下：  
* 2，输出到表达式中，2，栈为空；
* +，到栈中，2，+；
* 3，输出到表达式中，2 3，+；
* *，到栈中，2 3，+ *；
* （，到栈中，2 3，+ * （；
* 5，表达式，2 3 5，+ * （；
* -，栈中，2 3 5，+ * （ -；
* 1，表达式，2 3 5 1，+ * （ -；
* ），栈顶元素依次出栈并输出到表达式中，即2 3 5 1 - * +；

### 行编辑程序
在栈的功能下，实现用户在终端输入出现差错时，及时更正；

### 栈与递归的实现
……

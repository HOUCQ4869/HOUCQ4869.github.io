---
title: "Tree"
published: 2023-02-13 20:09:21
description: "数据结构之五树"
image: "/images/covers/tree-6.jpg"
tags: ["数据结构", "C"]
category: "数据结构"
draft: false
---
# Tree
基本概念：子树，度，叶子（终端节点），分支节点（非终端节点），孩子，双亲，兄弟，子孙……  
节点**层次**：注意从根开始定义，根为第一层;  
树的**深度（高度）**：树中节点的最大层次；  
以及如节点各子树有次序，称其为**有序树**，否则为**无序树**；  
**森林**为n棵互不相交的树的集合；  

## 二叉树
**二叉树**是一种树形结构，各个节点至多只有两棵子树，且各子树有次序，为有序树；  
### 存储结构
* 顺序存储结构
~~~c
#define MAX_TREE_SIZE 100                   //二叉树最大节点数
typedef TElemType SqBiTree[MAX_TREE_SIZE];  //0号存储根节点
SqBiTree bt;
~~~
* 链式存储结构
~~~c
typedef struct BiTNode
{
  TElemType data;
  struct BiTNode *lchild, *rchild;
}BiTNode, *BiTree;
~~~

## 遍历二叉树及线索二叉树
### 遍历二叉树
首先标明三种概念，**先序遍历**，**中序遍历**，以及**后序遍历**。实际上，其分别对应于波兰式，中缀表达式，逆波兰式；  
* 先序：根->左->右
* 中序：左->根->右
* 后序：左->右->根

可以均从左向右历遍，根据经过该节点的次数判断是否遍历，首先经过，即先序，历遍该节点的左子树后，再次经过该节点，即中序，再历遍右子树后返回该节点，即后序；

#### 递归算法
以先序遍历为例，如下：
~~~c
Status PreOrderTraverse(BiTree T, Status (*Visit)(TElemType e))
{
  if (T)
  {
    if (T->data)
    {
      if (PreOrderTraverse(T->lchild, Visit))
      {
        if (PreOrderTraverse(T->rchild, Visit))
          return OK;
      }
    }
    return ERROR;
  }
  else
    return OK;
}
~~~
中序遍历以及后序遍历即将根节点的访问置于中间或最后，在此不做赘述；  
#### 非递归算法
* 中序遍历的非递归算法
~~~c
Status InOrderTraverse(BiTree T, Status (*Visit)(TElemType e))
{
  SqStack *S = (SqStack *)malloc(sizeof(SqStack));
  InitStack(S);
  Push(S, T);
  while (!StackEmpty(*S))
  {
    BiTNode *p = (BiTNode *)malloc(sizeof(BiTNode));
    while (GetTop(*S, p) && p)
      Push(S, p->lchild);
    Pop(S, p);
    if (!StackEmpty(*S))
    {
      Pop(S, p);
      if (!Visit(p->data))
        return ERROR;
      Push(S, p->rchild);
    }
  }
  return OK;
}
~~~
另一种形式如下：  
~~~c
Status InOrder_Traverse(BiTree T, Status (*Visit)(TElemType e))
{
  SqStack *S = (SqStack *)malloc(sizeof(SqStack));
  InitStack(S);
  BiTNode *p = T;
  while (p || !StackEmpty(*S))
  {
    if (p)
    { // 根指针进栈，遍历左子树
      Push(S, p);
      p = p->lchild;
    }
    else
    { // 根指针退栈，遍历右子树
      Pop(S, p);
      if (!Visit(p->data))
        return ERROR;
      p = p->rchild;
    }
  }
  return OK;
}
~~~
两种方法均在于在于每次向左历遍后退栈空指针，进行中序遍历访问，再向右一步进行继续历遍；
* 先序遍历的非递归算法  
  
相较于中序遍历，先序遍历的非递归算法仅仅改变了访问节点的时刻；
~~~c
Status PreOrder_Traverse(BiTree T, Status (*Visit)(TElemType e))
{
  SqStack *S = (SqStack *)malloc(sizeof(SqStack));
  InitStack(S);
  BiTNode *p = T;
  while (p || !StackEmpty(*S))
  {
    if (p)
    {
      if (!Visit(p->data))
        return ERROR;
      Push(S, p);
      p = p->lchild;
    }
    else
    {
      Pop(S, p);
      p = p->rchild;
    }
  }
  return OK;
}
~~~
* 后序遍历的非递归算法

其中主要是根据右子树以及是否访问过进行出栈访问的判断，要注意存在一个r标志，表示该节点已被访问过，相当于该节点的父节点的右子树为空；
~~~c
Status PostOrder_Traverse(BiTree T, Status (*Visit)(TElemType e))
{
  SqStack *S = (SqStack *)malloc(sizeof(SqStack));
  InitStack(S);
  BiTNode *p = T, *r = NULL;
  while (p || !StackEmpty(*S))
  {
    if (p)
    { // 同样先遍历左子树
      Push(S, p);
      p = p->lchild;
    }
    else
    { // 先不出栈，根据栈顶元素的右子树情况进行判断
      GetTop(*S, p);
      if (p->rchild && p->rchild != r)
      { // 如果右子树存在，并且未被访问过
        p = p->rchild;
        Push(S, p);
        p = p->lchild;
      }
      else
      { // 否则便可以直接出栈并访问
        Pop(S, p);
        if (!Visit(p->data))
          return ERROR;
        r = p;    // 标记该节点已被访问，便于其父节点判断
        p = NULL; // 修改p,直接跳入对其父节点判断
      }
    }
  }
  return OK;
}
~~~

#### 层次遍历
对于层次遍历，需要借助一个队列，先将二叉树根节点入队，然后出队访问，将其左右子树根节点入队，循环以上过程，直至队列为空……

~~~c
Status LevelOrder(BiTree T)
{
  SqQueue *Q = (SqQueue *)malloc(sizeof(SqQueue));
  InitQueue(Q);
  BiTree p;
  EnQueue(Q, T);
  while (!(Q->front == Q->rear))
  { //若队列不空
    DeQueue(Q, p);
    Visit(p);
    if (p->lchild != NULL)
      EnQueue(Q, p->lchild);  //左子树
    if (p->rchild != NULL)
      EnQueue(Q, p->rchild);  //右子树
  }
  return OK;
}
~~~

#### 构造二叉树
* 先序序列和中序序列确定二叉树
  
  在中序序列中找到依次找到先序序列中元素作为根节点，则该节点左侧所有元素即属于左子树，同理，右侧均属于右子树；
* 后序序列和中序序列确定二叉树  

  同样是分割中序序列，由后序序列的最后一个节点如同先序序列的第一个节点，构造二叉树；
* 层序序列和中序序列确定二叉树

  由层序序列同样可以得到各子树根节点，由此分割中序序列得到二叉树；


### 线索二叉树
试作如下规定：若节点有左子树，则其lchild域指示其左孩子，否则令lchild域指示其前驱；若节点有右子树，则其rchild域指示其右孩子，否则令rchild域指示其后继。  
根据此改变节点结构，增加两个标志域如下：

$$
LTag = \begin{cases}
0, & \text{lchild域指示节点的左孩子} \\
1, & \text{lchild域指示节点的前驱}
\end{cases}
$$

$$
RTag = \begin{cases}
0, & \text{rchild域指示节点的右孩子} \\
1, & \text{rchild域指示节点的后继}
\end{cases}
$$

以此节点结构构成的二叉链表作为二叉树的存储结构，称其为**线索链表**，指向节点前驱和后级的指针称为**线索**，加上线索的二叉树称之为**线索二叉树**，对二叉树以某种次序遍历使其变为线索二叉树的过程叫做**线索化**；
#### 存储表示
~~~c
typedef enum PointerTag
{
  Link,
  Thread
};
typedef struct BiThrNode
{
  TElemType data;
  struct BiThrNode *lchild, *rchild;
  PointerTag LTag, RTag; // 左右标志
} BiThrNode, *BiThrTree;
~~~
同时仿照线性表的存储结构，在二叉树线索链表上添加一个头结点，其lchild域的指针指向二叉树的根节点，其rchild域的指针指向中序遍历时访问的最后一个节点；同时中序序列中的第一个节点的lchild域指针和最后一个节点的rchild域指针均指向头结点；

#### 线索二叉树的遍历
* 中序遍历二叉线索树

~~~c
Status InOrderTraverse_Thr(BiThrTree T, Status (*Visit)(TElemType))
{ // 中序遍历二叉线索树T的非递归算法
  BiThrNode *p = T->lchild; // T为头结点，p指向树的根节点
  while (p != T)
  {
    while (p->LTag == Link)
      p = p->lchild;
    if (!Visit(p->data))
      return ERROR;
    while (p->RTag == Thread && p->rchild != T)
    { //访问后继节点，直到存在右子树的节点或指向头指针的节点
      p = p->rchild;
      Visit(p->data);
    }
    p = p->rchild;    //对其右子树再次中序遍历
  }
  return OK;
}
~~~

#### 二叉树的线索化
* 中序遍历二叉树，并将其中序线索化

~~~c
Status InOrderThreading(BiThrTree *Thrt, BiThrTree T)
{
  if (!(Thrt = (BiThrTree *)malloc(sizeof(BiThrTree))))
    return ERROR;
  (*Thrt)->LTag = Link;
  (*Thrt)->RTag = Thread; // 建立头结点
  (*Thrt)->rchild = Thrt; // 右指针回指
  if (!T)
    (*Thrt)->lchild = Thrt; // 若二叉树空则左指针同样回指
  else
  {
    (*Thrt)->lchild = T;
    BiThrNode *pre = Thrt;
    InThreading(T, pre);
    pre->rchild = Thrt;
    pre->RTag = Thread;
    (*Thrt)->rchild = pre;
  }
  return OK;
}

void InThreading(BiThrTree p, BiThrNode *pre)
{
  if (p)
  {
    InThreading(p->lchild, pre); // 左子树线索化
    if (!p->lchild)
    { // 前驱线索
      p->LTag = Thread;
      p->lchild = pre;
    }
    if (!pre->rchild)
    { // 后继线索
      pre->RTag = Thread;
      pre->rchild = p;
    }
    pre = p;     //保持前驱更新
    InThreading(p->rchild, pre); // 右子树线索化
  }
}
~~~
其中InThreading算法类似于中序遍历的递归算法，仅将访问节点改为了实现线索化；
* 先序和后序线索化二叉树
类似于中序线索化二叉树，将递归算法中访问功能更改为线索化实现，即可得到相应的线索化算法；

## 树的存储结构
如下有三种常用的链表结构：
### 双亲表示法
~~~c
#define MAX_TREE_SIZE 100
typedef struct PTNode
{ // 节点结构
  TElemType data;
  int parent; // 双亲位置域
} PTNode;
typedef struct
{
  PTNode nodes[MAX_TREE_SIZE];
  int r, n; // 根的位置和节点数
} PTree;
~~~
这种结构利用了各节点（除根外）仅有一个双亲的性质；根据此性质便于实现对于父节点的查找，但是要求节点的孩子时则需要遍历整个结构；

### 孩子表示法
~~~c
typedef struct CTNode
{ // 孩子节点
  int child;
  struct CTNode *next;
} *ChildPtr;
typedef struct
{
  TElemType data;
  ChildPtr firstchild; // 孩子链表头指针
} CTBox;
typedef struct
{
  CTBox nodes[MAX_TREE_SIZE];
  int n, r; // 节点数和根的位置
} CTree;
~~~
类似于双亲表示法，孩子表示法便于实现关于孩子的操作，考虑到两种方式的优劣性，故可拓展为带双亲的孩子链表；

### 孩子兄弟表示法
或称**二叉树表示法，二叉链表表示法**
~~~c
typedef struct CSNode
{
  TElemType data;
  struct CSNode *firstchild, *nextsibling;
} CSNode, *CSTree;
~~~

## 树&森林&二叉树
### 森林与二叉树的转换
由上述的二叉链表表示法可导出树与二叉树之间的一个对应关系，由此引出如下的转换方式：  
**森林->二叉树**
* 在兄弟节点之间加一条线（各树根可视作兄弟关系）；
* 对于每个节点，只保留其与第一个孩子的连线，其与抹除；
* 以树根为轴心，顺时针旋转45度；
  
**二叉树->森林**

类似于如上的逆过程……

### 树和森林的遍历
**树的遍历**
* 先根遍历：先访问树的根节点，然后一次先根遍历根的每棵子树；（类似先序）
* 后根遍历：先依次后根遍历每棵子树，然后访问根节点；（类似中序）

**森林的遍历**
* 先序遍历森林：第一棵树的根节点->先序遍历第一棵树中根节点的子树森林->先序遍历除第一棵树所构成的森林；
* 后序遍历森林：第一棵树的根节点的子树森林->访问第一棵树的根节点->后序遍历除第一棵树所构成的森林;

## 树与等价问题

## Huffman树
### 概念
考虑到带权路径长度的概念，引出如下的**huffman树**或**最优二叉树**；  
* 树的**路径长度**是从树根到每一节点的路径长度之和；  
* 树的**带权路径长度**为树中所有叶子节点的带权路径长度之和，记作
$$
WPL = \sum_{k=1}^{n}w_{k}l_{k}
$$

### Huffman编码
根据huffman树的原理使得二进制前缀编码的权重和最小，有如下实现：
#### 存储表示
~~~c
#define OK 1
#define ERROR -1
#define MAX_FILENAME 100 // 文件名最大长度
#define MAX_NUM 9999999
// 统计字符频度的临时结点
typedef struct
{
  unsigned char str;   // 存储该节点对应字符
  unsigned int weight; // 该字符频度
} StrNode;

// 哈夫曼树结点
typedef struct
{
  unsigned char str;          // 以8bits为单元的无符号字符
  unsigned int weight;        // 每类（以二进制编码区分）字符出现频度
  char *code;                 // 字符对应的哈夫曼编码（动态分配存储空间）
  int parent, lchild, rchild; // 定义双亲和左右孩子
} HufNode, *HufTree;
~~~

#### 算法实现
~~~c
// 选择最小的两个结点
void select(HufNode *huftree, unsigned int n, int *s1, int *s2)
{
  unsigned int i;
  unsigned int min = MAX_NUM; // 初始化最小值
  for (i = 0; i < n; ++i)
    if (huftree[i].parent == 0 && huftree[i].weight < min)
    {
      // 选择父节点未被标记以及权重最小的节点
      min = huftree[i].weight;
      *s1 = i;
    }
  huftree[*s1].parent = 1; // 标记该节点已有父节点
  min = MAX_NUM;           // 重新初始化便于寻找
  for (i = 0; i < n; ++i)
    if (huftree[i].parent == 0 && huftree[i].weight < min)
    {
      // 选择父节点未被标记以及权重第二小的节点
      min = huftree[i].weight;
      *s2 = i;
    }
}

// 建立赫夫曼树以及赫夫曼编码
void HuffmanCoding(HufNode *huftree, unsigned int kinds)
{
  unsigned int i;
  int s1, s2;
  for (i = kinds; i < 2 * kinds - 1; i++)
  { // 建立Huffman树
    select(huftree, i, &s1, &s2);
    // 找到最小的两个节点
    huftree[s1].parent = huftree[s2].parent = i;
    huftree[i].lchild = s1;
    huftree[i].rchild = s2;
    huftree[i].weight = huftree[s1].weight + huftree[s2].weight;
  }

  // 构建Huffman编码
  int c, f, start;
  char *cd = (char *)malloc(kinds * sizeof(char)); // 存储编码kinds种
  cd[kinds - 1] = '\0';                            // 编码结束符

  for (i = 0; i < kinds; ++i)
  { // 逐个字符求其对应的Huffman编码

    start = kinds - 1;                                                       // 编码结束符位置
    for (c = i, f = huftree[i].parent; f != 0; c = f, f = huftree[f].parent) // 从叶子到根逆向求编码
      if (huftree[f].lchild == c)
        cd[--start] = '0'; // 左子树为0
      else
        cd[--start] = '1'; // 右子树为1

    huftree[i].code = (char *)malloc((kinds - start) * sizeof(char)); // 为第i个字符编码分配存储空间
    strcpy(huftree[i].code, &cd[start]);                              // 从cd复制编码串到编码域
  }
  free(cd); // 释放工作空间
}
~~~

## 二叉排序树
或是空树，或满足下列条件：
* 若它的左子树不空，则左子树所有节点的值均小于它根节点的值；
* 若它的右子树不空，则右子树所有节点的值均大于它根节点的值；
* 它的左右子树也分别为二叉排序树；

其类型定义可类似于二叉链表如下：
~~~c
typedef struct BiTNode
{
  int data;
  struct BiTNode *lchild, *rchild;
}BiTNode, *BiTree;
~~~

### SearchBST
~~~c
BiTree SearchBST(BiTree T, keyType key)
{ //二叉排序树查找算法
  if ((!T) || key == T->data)
    return T;
  else if (key < T->data) // 关键字在左子树上
    return SearchBST(T->lchild, key);
  else
    return SearchBST(T->rchild, key);
}
~~~

### InsertBST
在原有的查找算法中进行改进，用指针p返回访问时的最后的一个节点，便于最后进行插入；
~~~c
Status SearchBST(BiTree T, keyType key, BiTree f, BiTree *p)
{ // 二叉排序树查找算法，p指向访问路径的最后一个节点
  if (!T)
  {
    p = f;
    return ERROR;
  }
  else if (key == T->data)
  {
    p = T;
    return OK;
  }
  else if (key < T->data)
    return SearchBST(T->lchild, key, T, p);
  else
    return SearchBST(T->rchild, key, T, p);
}

Status InsertBST(BiTree *T, int e)
{ // 当二叉排序树中不存在关键字为e的数据元素是，插入并返回OK
  BiTree p = (BiTree)malloc(sizeof(BiTNode));
  if (!SearchBST(T, e, NULL, &p))
  {
    BiTree s = (BiTree)malloc(sizeof(BiTNode));
    s->data = e;
    s->lchild = s->rchild = NULL;
    // 此时根据查找时访问的最后一个节点插入
    if (!p)
      *T = s;
    else if (e < p->data)
      p->lchild = s;
    else
      p->rchild = s;
    return OK;
  }
  else
    return ERROR;
}
~~~

### DeleteBST
其中Delete函数实现对于节点的删除以及左右子树的重连；
~~~c
Status DeleteBST(BiTree *T, keyType key)
{ // 删除关键字为key元素
  if (!*T)
    return ERROR;
  else
  {
    if (key == (*T)->data) // 进行删除
      return Delete(T);
    else if (key < (*T)->data) // 对左子树进行查找
      return DeleteBST((*T)->lchild, key);
    else
      return DeleteBST((*T)->rchild, key);
  }
  return OK;
}

Status Delete(BiTree *p)
{ // 删除节点p，并重连它的左右子树
  BiTree q = (BiTree *)malloc(sizeof(BiTree));
  BiTree s = (BiTree *)malloc(sizeof(BiTree));
  if (!(*p)->rchild)
  { // 重接左子树
    q = *p;
    *p = (*p)->lchild;
    free(q);
  }
  else if (!(*p)->lchild)
  { // 重接右子树
    q = *p;
    *p = (*p)->rchild;
    free(q);
  }
  else
  {
    q = *p;
    s = (*p)->lchild; // 先向左
    while (s->rchild)
    { // 再向右到尽头，找到待删节点的前驱
      q = s;
      s = s->rchild;
    }
    (*p)->data = s->data; // 将待删节点的值换为其前驱的值
    //分别重接q的左右子树
    if (q != *p)
      q->rchild = s->lchild;
    else
      q->lchild = s->lchild;
    delete (s); //删除前驱结点
  }
  return OK;
}
~~~

## 平衡二叉树
**平衡二叉树**是一种二叉排序树，其中每一个节点的左子树和右子树的高度差至多等于1；则显然，其要么是一颗空树，要么它的左右子树均是平衡二叉树，且深度之差绝对值不超过1；同时我们将二叉树上节点的左子树深度减去右子树深度的值称为**平衡因子BF(Balance Factor)**，则所有节点的平衡因子只可能是-1，0，1；

### 平衡二叉树的插入

### 平衡二叉树的查找

## B-树和B+树

## 键树

未完待续……

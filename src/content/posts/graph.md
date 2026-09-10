---
title: "Graph"
pubDatetime: 2023-02-22T20:41:59+08:00
description: "数据结构之六图"
ogImage: "/images/covers/graph-7.webp"
tags: ["数据结构", "C"]
draft: false
---
# Graph
## 定义&概念
相关概念：
* **有向图**， **无向图**，**简单图**， **完全图**，**有向完全图**（弧数为前者两倍），稀疏图、稠密图；  
* 顶点不重复->**简单**路径/回路/环；  
* （无向图中）**连通图**：任意两个顶点都是连通的；**连通分量**：无向图中的极大连通子图；
* （有向图中）**强连通图**：a->b,b->a均存在路径；**强连通分量**：有向图中的极大连通子图；
* **生成树**：一个极小连通子图；在非连通图中，连通分量的生成树构成了非连通图的**生成森林**；

## 存储结构
### 数组表示法（邻接矩阵）
对于无向图的邻接矩阵，其一定是一个对称矩阵，而对于有向图而言并不对称；
~~~c
#define INFINITY INT_MAX  // 最大值
#define MAX_VERTEX_NUM 20 // 最大顶点个数

typedef int VRType;     // 顶点关系类型，无权图1,0表相邻，带权图表权值
typedef int *InfoType;  // 弧相关信息指针
typedef int VertexType; // 顶点向量

typedef enum
{
  DG,
  DN,
  UDG,
  UDN
} GraphKind; //{有向图，有向网，无向图，无向网}

typedef struct ArcCell
{
  VRType adj;
  InfoType *info;
} ArcCell, AdjMatrix[MAX_VERTEX_NUM][MAX_VERTEX_NUM];

typedef struct
{
  VertexType vexs[MAX_VERTEX_NUM];
  AdjMatrix arcs;     // 邻接矩阵
  int vexnum, arcnum; // 顶点数及弧数
  GraphKind kind;     // 图的种类标志
} MGraph;
~~~
邻接矩阵表示法的空间复杂度为O(n^2)，适合稠密图进行存储表示；

### 邻接表
链式存储结构，在邻接表中，对图中每个顶点建立一个单链表，单链表中每个节点表示依附于该顶点的各边。  
每个节点由三个域组成，邻接点域指示与该弧指向的顶点位置；链域指示下一条边或弧的节点；数据域存储边或弧的相关信息，如权值等；在每个链表上附设一个表头节点，包含指向第一条弧的链域以及顶点信息；
~~~c
// 邻接表
#define MAX_VERTEX_NUM 20
typedef struct ArcNode
{ // 弧节点
  int adjvex;              // 该弧指向的顶点位置
  struct ArcNode *nextarc; // 指向下一条弧的指针
  InfoType *info;          // 该弧相关信息的指针
} ArcNode;

typedef struct VNode
{ 
  VertexType data;   // 顶点信息
  ArcNode *firstarc; // 指向第一条依附于该顶点的弧的指针
} VNode, AdjList[MAX_VERTEX_NUM];

typedef struct
{
  AdjList vertices;
  int vexnum, arcnum; // 图的当前顶点数和弧数
  int kind;           // 图的种类标志
} ALGraph;
~~~
邻接表的表示方式便于实现对于出度的求解，然而对于入度，则必须遍历整个邻接表。为此可以建立一个有向图的逆邻接表，加速求解给定顶点的入度；

### 十字链表
十字链表可视作将有向图的邻接表与逆邻接表结合起来，  
弧节点中有五个域，尾域tailvex和头域headvex分别指示弧尾和弧头这两个顶点在图中的位置；链域hlink指向弧头相同的下一条弧；链域tlink指向弧尾相同的下一条弧；info域指示相关信息；  
顶点节点有三个域，data域存储节点相关信息；firstin及firstout两个链域分别指向以该顶点为弧头或弧尾的第一个弧节点；
~~~c
// 十字链表
#define MAX_VERTEX_NUM 20
typedef struct ArcBox
{
  int tailvex, headvex;         // 该弧的尾和头顶点的位置
  struct ArcBox *hlink, *tlink; // 分别为弧头相同和弧尾相同的弧的链域
  InfoType *info;               // 该弧相关信息
} ArcBox;

typedef struct VexNode
{
  VertexType data;
  ArcBox *firstin, *firstout; // 分别指向该顶点的第一条入弧和出弧
} VexNode;

typedef struct
{
  VexNode xlist[MAX_VERTEX_NUM]; // 表头向量
  int vexnum, arcnum;            // 有向图的当前顶点数和弧数
} OLGraph;
~~~

### 邻接多重表
未完待续……

## 图的遍历
### 深度优先搜索(DFS)
类似于树的先根遍历，假设初始状态是图中所有顶点未曾被访问，DFS从某一顶点v出发，访问该节点，依次从v的未被访问的邻接点出发深度优先遍历图，指示图中所有和v有路径相通的顶点都被访问到；若此时还有顶点未被访问，则另选一个未被访问的顶点做起点，继续DFS;
~~~c
typedef int Status;
int visited[MAX_VERTEX_NUM]; // 访问标记数组
Status (*VisitFunc)(int v);  // 函数变量

//该处不一定是MGraph
void DFSTraverse(MGraph G, Status (*Visit)(int v))
{                    // 对图G作深度优先遍历
  VisitFunc = Visit; // 使用全局变量VisitFunc, 使DFS不必设函数指针参数
  for (int v = 0; v < G.vexnum; v++)
    visited[v] = 0; // 初始化
  for (int v = 0; v < G.vexnum; v++)
    if (!visited[v]) // 对未访问节点调用DFS
      DFS(G, v);
}

void DFS(MGraph G, int v)
{ // 从第v个顶点出发递归地深度优先遍历图G
  visited[v] = 1;
  VisitFunc(v);
  for (int w = FirstAdjVex(G, v); w >= 0; w = NextAdjVex(G, v, w))
    if (!visited[w])
      DFS(G, w); // 对尚未访问的邻接顶点w递归调用DFS
}
~~~

### 广度优先搜索
类似于树的按层次遍历，假设从图中某顶点v出发，访问v后依次访问v的各个未曾访问的邻接点，然后从这些邻接点出发依次访问他们的邻接点，而且要求“先被访问的顶点的邻接点”先于“后被访问的顶点的邻接点”被访问，直至所有已访问顶点的邻接点均被访问。同样，若存在未被访问的节点，选取并重复上述过程；
~~~c
void BFSTraverse(MGraph G, Status (*Visit)(int v))
{ // 按广度优先非递归遍历图G，使用辅助队列Q和访问标志数组visited
  for (int v = 0; v < G.vexnum; v++)
    visited[v] = 0; // 初始化
  SqQueue *Q = (SqQueue *)malloc(sizeof(SqQueue));
  InitQueue(Q); //
  for (int v = 0; v < G.vexnum; v++)
  {
    if (!visited[v])
    {
      visited[v] = 1;
      Visit(v);
      EnQueue(Q, v); // 入队，便于之后先层次遍历
      while (!QueueEmpty(Q))
      { // 若队列不空
        int *u = (int *)malloc(sizeof(int));
        DeQueue(Q, u); // 出队，进行层次遍历
        for (int w = FirstAdjVex(G, u); w >= 0; w = NextAdjVex(G, u, w))
          if (!visited[w])
          {
            visited[w] = 1;
            Visit(w);
            EnQueue(Q, w); // 将初次访问节点再次入队
          }
      }
    }
  }
}
~~~

## 图的连通性问题
### 无向图的连通分量和生成树
由DFS搜索得到的为**深度优先生成树（森林）**，由BFS搜索得到的为**广度优先生成树（森林）**
假设以孩子兄弟链表作为生成森林的存储结构，如下算法生成非连通图的深度优先生成森林：
~~~c
……
~~~

### 有向图的强连通分量
未完待续……

### 最小生成树
构造连通网的最小代价生成树（简称为最小生成树）问题；  
多数算法借助最小生成树的一种简称为MST的性质：假设连通网N=(V,{E})，U是顶点集V的一个非空子集，若(u,v)是一条具有最小权值的边，其中顶点u属于U，顶点v属于V-U，则必存在一颗包含边(u,v)的最小生成树；  
如下介绍普里姆算法(Prim)和克鲁斯卡尔算法(Kruskal):

* **Prim**

从一个顶点出发，在保证不形成回路的前提下，每找到并添加一条最短的边，就把当前形成的连通分量当做一个整体或者一个点看待，然后重复找最短的边并添加；
~~~c
// 记录从顶点集U->U-V的代价最小的边的辅助数组定义:
struct
{
  VertexType adjvex;
  VRType lowcost;
} closedge[MAX_VERTEX_NUM];

void MiniSpanTree_PRIM(MGraph G, VertexType u)
{ // 用普里姆算法从第u个顶点出发构造网G的最小生成树T，输出T的各条边
  int k = LocateVex(G, u);
  for (int j = 0; j < G.vexnum; j++)
  { // 辅助数组初始化，此时顶点集中元素只有u
    if (j != k)
    {
      closedge[j].adjvex = u;
      closedge[j].lowcost = G.arcs[k][j].adj;
    }
  }
  closedge[k].lowcost = 0; // 初始顶点，U={u}
  for (int i = 1; i < G.vexnum; i++)
  {
    k = minimum(closedge);
    //minimum函数实现在U-V顶点集中找到距U顶点集最近的顶点
    //即closedge中在U-V顶点集中lowcost最小的顶点
    printf(closedge[k].adjvex, G.vexs[k]);    //输出生成树的边
    closedge[k].lowcost = 0;    //将该点加入U顶点集中，即此时代价为0
    for (int j = 0; j < G.vexnum; j++)
    { //由于k并入U中，重新规划辅助数组，判断代价是否有更小的变化
      if (G.arcs[k][j].adj < closedge[j].lowcost)
      {
        closedge[j].adjvex = G.vexs[k];
        closedge[j].lowcost = G.arcs[k][j].adj;
      }
    }
  }
}
~~~

* **Kruskal**

假设初始状态为n个顶点而无边的存在，在该图中每个顶点自成一个连通分量；在E中选择代价最小的边，若该边依附的顶点在T的不同连通分量上，则可以将该边加入T中，否则另取下一条代价最小的边；
~~~c
未完待续……
~~~

## 有向无环图及其应用
在一个表示工程的有向图中，用顶点表示活动，用弧表示活动之间的优先关系，这样的有向图为顶点表示活动的网，我们称为**AOV网**；一个无环的有向图称作**有向无环图(DAG)**；
### 拓扑排序
由某个集合上的一个偏序得到该集合上的一个全序，这个操作称之为**拓扑排序**；

如何进行拓扑排序：
* 从有向图中选一个没有前驱的顶点并输出；
* 从图中删除该顶点和所有以它为尾的弧；
* 重复以上过程，直至全部顶点均输出，或者当前图中不存在无前驱的顶点为止；

采取邻接表作为有向图的存储结构，且在头结点中增加一个存放顶点入度的数组indegree;同时为避免重复检测入度为零的顶点，另设一栈暂存所有入度为零的顶点；
~~~c
Status TopologicalSort(ALGraph G)
{
  int indegree[MAX_VERTEX_NUM];
  FindInDegree(G, indegree); // 对各顶点求入度
  SqStack *S = (SqStack *)malloc(sizeof(SqStack));
  InitStack(S); // 建零入度顶点栈
  for (int i = 0; i < G.vexnum; i++)
  { // 入度为零者进栈
    if (!indegree[i])
      Push(S, i);
  }
  int count = 0;
  while (!StackEmpty(S))
  {
    int *i = (int *)malloc(sizeof(int));
    Pop(S, i);
    printf(i, G.vertices[*i].data);
    count++; // 输出i号顶点并计数
    for (ArcNode *p = G.vertices[*i].firstarc; p; p = p->nextarc)
    {
      int k = p->adjvex;
      if (!(--indegree[k]))
        Push(S, k); // 对于删除节点后入度减为零的节点进行入栈操作
    }
  }
  if (count < G.vexnum)
    return ERROR; // 此时有向图有回路
  else
    return OK;
}
~~~
由于输出每个顶点的同时还要删除以它为起点的边，因此拓扑排序的时间复杂度为O(n+e);  
考虑有向图中无环时，也可以利用深度优先遍历实现拓扑排序，由于从某点出发进行深度优先搜索遍历时，最先退出DFS函数的顶点即出度为零的顶点，也即是拓扑有序序列中最后一个顶点，因此按照退出DFS函数的先后记录下来的顶点序列即为逆向的拓扑有序序列；

### 关键路径
在带权有向图中，以顶点表示事件，以有向边表示活动，以边上的权值表示完成该活动的开销，称之用边表示活动的网络，简称**AOE网**；

再次表明AOE网与AOV网的异同，两者都是有向无环图，不同之处在于边和顶点表示的含义是不同的，AOE网中的边有权值，而AOV网中的边无权值，仅表示顶点之间的前后关系；

AOE网有如下性质：
* 在某顶点代表事件发生后，从该顶点出发的各有向边所代表的活动才能开始；
* 在进入某顶点的各有向边所代表的的活动都已结束后，该顶点所代表的的事件才能发生；

相关概念：顶点（源点），结束顶点（汇点）；**路径长度**指各个活动所持续的时间之和；**关键路径**指从源点到汇点具有最大长度的路径，同时在关键路径上的活动称之为**关键活动**；
未完待续……

## 最短路径
两顶点之间经过的边上权值之和最小的路径，且称路径上的第一个顶点为源点，最后一个顶点为终点；
### 迪杰斯特拉算法(Dijkstra)

### 弗洛伊德算法(Floyd)
未完待续……

# 你应该知道的git


## git 起步

### git 基础
* git 是分布式，也就是说没有中央服务器，代码从仓库完整的镜像下来之后，每个人电脑上都是一个完整的代码库。
* 当你修改文件时，或者保存项目状态时，它主要对当时的全部文件制作一个快照并保存这个快照的索引。 为了高效，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。 Git 对待数据更像是一个 快照流。也就是说把文件整体复制下来保存，而不是保存变化的部分。
* 如果文件没有变化，它只会保存一个指向上一个版本的文件的指针

![git version](/笔记/img/gitversion.png)

### git 的完整性
* git 在所有数据存储钱 都会计算校验和，所以修改任何内容都会检测到
* Git 用以计算校验和的机制叫做 SHA-1 散列（hash，哈希）。 这是一个由 40 个十六进制字符（0-9 和 a-f）组成字符串，基于 Git 中文件的内容或目录结构计算出来
* git 数据库中保存的信息是以文件内容的哈希值来索引不是文件名






## git 工作原理

### .git
* 找一个空的文件夹git init 会有一个隐藏的文件夹 .git
* mkdir gitDemo && cd gitDemo && git init && tree -a
```
.
└── .git
    ├── HEAD
    ├── branches
    ├── config
    ├── description
    ├── hooks
    │   ├── applypatch-msg.sample
    │   ├── commit-msg.sample
    │   ├── post-update.sample
    │   ├── pre-applypatch.sample
    │   ├── pre-commit.sample
    │   ├── pre-push.sample
    │   ├── pre-rebase.sample
    │   ├── pre-receive.sample
    │   ├── prepare-commit-msg.sample
    │   └── update.sample
    ├── info
    │   └── exclude
    ├── objects
    │   ├── info
    │   └── pack
    └── refs
        ├── heads
        └── tags

```

> find .git/objects -type f


### git 存储

> git 存储了Blobs，tree,commit ,Tag ,References 五种对象，这些对象存储在/objects和/refs 中
>这些对象的名称是一段40位的哈希值，此名称由其内容依据sha-1算法生成，具体到.git/object文件夹下，会取该hash值的前 2 位为子文件夹名称，剩余 38 位为文件名，这四类对象都是二进制文件，其内容格式依据类型有所不同。


* Blobs : 一个blobs 对象是一堆字节，通常是一个文件二进制的标识
* tree，有点类似于目录，其内容由对其它tree及blobs的指向构成；
* commit，指向一个树对象，并包含一些表明作者及父 commit 的元数据
* Tag，指向一个commit对象，并包含一些元数据
* References,指向一个commit或者tag对象

#### Blobs 
* 我们都知道 git add 会把已经修改的文件 添加的缓存区，因为每次修改后的文件都是一个新的文件。每次add 一个文件都会添加一个Blobs 对象
* Blobs 是二进制文件，git show [hash] 或者 git cat-file -p [hash] 我们就可以查看 .git/object 文件夹下任一文件的内容。

  ![Blobs](/笔记/img/WechatIMG198.png)

* blob 对象中仅仅存储了文件的内容，如果我们想要完整还原工作区的内容，我们还需要把这些文件有序组合起来，这就涉及到 Git 中存储的另外一个重要的对象：tree。

#### tree
tree 记录了文件的结构，某个tree 对象记录了某个文件的结构包含子文件，也是40位哈希值
  ![Blobs](/笔记/img/WechatIMG198.png)

#### commit 
* commit 记录我们提交历史和提交的信息


```
MacBook-Pro-9:笔记 xmly$ git cat-file -p 7374
tree 40921d92618284e2a9dc6333c0351593f2e754ff
parent ef6987c5cbbb222b8c951bed911abd0530cac9d2
author lyan.lei <lyan.lei@ximalaya.com> 1553582698 +0800
committer lyan.lei <lyan.lei@ximalaya.com> 1553582698 +0800

git
MacBook-Pro-9:笔记 xmly$ 
```

* tree 表示当前commit 对应的根tree
* parent 父commit的哈希值 
* committer 当前commit 由谁提交
* git commit message





## git 的工作区域

* 工作区 ： 
    这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。
* Index 暂存区 : 
    暂存区域是一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中。 有时候也被称作`‘索引’'，不过一般说法还是叫暂存区域。
* HEAD （本地仓库）

  ![git 工作区域](/笔记/img/git工作区域.png)

> git add * 把改动提交到 》 缓存区（Index）
> git commit -m '说明' 命令就把改动提交到了仓库区（当前分支）本地仓库

![git 工作流](/笔记/img/WechatIMG200.png)

### git add [file] 发生了什么
* 在 .git/object/ 文件夹中添加修改或者新增文件对应的 blob 对象；
* 在 .git/index 文件夹中写入该文件的名称及对应的 blob 对象名称；
* 通过命令 git ls-files -s 可以查看所有位于.git/index中的文件

![git 工作区域](/笔记/img/WechatIMG199.png)

其中各项的含义如下：
  * 100644： 100代表regular file，644代表文件权限
  * 中间的哈希值 blob对象的名称；
  * 0 表示当前文件的版本
  * 后面的是文件的完整路径
  
### git status 

* 查看当前所在分支；
* 列出已经缓存，未缓存，未追踪的文件（依据上文中的三棵树生成）；
* 给下一步的操作一定的提示；

> .get/HEAD 存储着仓库当前位于的分支  cat .git/HEAD

### git commit 发生了什么

* 新增tree 对象，有多少个修改过的文件夹，就会添加多少个 tree
* 新增commit对象，其中的tree指向最顶端的tree，此外还包含一些其它的元信息， tree对象中会包含一级目录下的子tree对象及blob对象，由此可构建当前commit的文档快照

> git cat-file -t 查看某对象的类型

> git cat-file -p hash 查看某对象的内容

```
MacBook-Pro-9:lyan-learn xmly$ git cat-file -t 3942
commit
MacBook-Pro-9:lyan-learn xmly$ git cat-file -t bf7b
tree
MacBook-Pro-9:lyan-learn xmly$ git cat-file -p 3942
tree bf7bbedce04c0fd31a9a383303785b16cd593220
parent 9f761d649b2fc9349f1523ee037ede0919ce577a
author lyan.lei <lyan.lei@ximalaya.com> 1553592553 +0800
committer lyan.lei <lyan.lei@ximalaya.com> 1553592553 +0800

修改图片路径
MacBook-Pro-9:lyan-learn xmly$ git cat-file -p bf7bbedce04c0fd31a9a383303785b16cd593220
100644 blob b4307a84d87fc4103cb29b99a099b53ad6ff2660	.DS_Store
100644 blob e54482ba3055538efe8bc644289aab2d49b8b03a	index.html
040000 tree 6d58575858c86defeae2c0e68b5cec5243ea8aa6	node_modules
100644 blob df6e18f4798830922e757b2e4c4e5d8cf610514d	package-lock.json
160000 commit 79fa4a3aa5987e8ffb8f0f36e7da6c0a4afc3e1c	webpack-demos
040000 tree 2d0790369cb2d4bc0715828b35862cf80e8b9618	"\347\254\224\350\256\260"
MacBook-Pro-9:lyan-learn xmly$ 

```



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


* Blobs : 一个blobs 对象是一堆字节，通常是一个文件二进制的标识，保存的是文件的内容
* tree，有点类似于目录，像是操作系统中的文件夹，其内容由对其它tree及blobs的指向构成；
* commit，指向一个树对象，并包含一些表明作者及父 commit 的元数据
* Tag，指向一个commit对象，并包含一些元数据
* References,指向一个commit或者tag对象

> 当我们 对文件进行修改的时候，变化的文件 会生成一个 Blob 对象，记录这个版本文件的全部的内容，然后针对该文件有一个唯一的 SHA-1的校验和。针对没有变化的文件就拷贝上一个版本的指针，而不会生成一个全新的Blob 对象

>每次提交可能不仅仅只有一个tree 对象，指明了项目的不同的快照，但是必须记住所有的对象SHA-1校验和才能获得完整的快照。

>commit 对象的格式指明了改时间点 项目快照顶层的快照tree 对象 作者提交信息


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


#### References
* References 存储在 git/refs/文件下

```
.git/refs
├── heads
│   ├── master
│   ├── 你的分支
│   └── ...
├── remotes
│   ├── origin
│   │   ├── ANDROIDBUG-4845
│   │   ├── ActivityCard-za
│   │   ├── ...
├── stash
└── tags


```
* headers 文件中的每一个文件 都对应着一个本地的分支

```
➜ cat .git/refs/heads/master
603bdb03d7134bbcaf3f84b21c9dbe902cce0e79
```
> 这个其实就是一个 指向当前分支最新的commit 的指针

* .git/refs/remotes 记录着远程仓库分支的本地映射

* .git/refs/stash 与 git stash 命令相关

* .git/refs/tag, 轻量级的tag，与 git tag 命令相关，这时候 指向某一个commit


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

![git](/笔记/img/WechatIMG199.jpeg)

其中各项的含义如下：
  * 100644： 100代表regular file，644代表文件权限;
  * 中间的哈希值 blob对象的名称;
  * 0 表示当前文件的版本;
  * 后面的是文件的完整路径;
  


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


### git branch 

* 前面在介绍 .git/refs/heads 的时候分支的本质就是 一个指向提交对象的 可变的指针
* 创建一个分支，相当于往一个文件中写入41字节（40个字符一个换行符）
* 本地分支 和远程分支，跟踪远程分支的本地分支，本地分支 gitpull git 自动识别去远程仓库的那个分支拉取代码
* .git/refs/remotes 存储 远程分支，也可以说是一个本地的备份

> cat .git/config

```
MacBook-Pro-9:lyan-learn xmly$ cat .git/config
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = https://github.com/Lyan0505/lyan-learn.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]




	remote = origin
	merge = refs/heads/master

```


#### git checkout 

* git checkout  实际操作的是 HEAD，.git/HEAD 指向本地仓库当前操作的分支，实际也是直接或者间接的指向了某个commit 对象
* git checkout <file> ==>  可以看做是 git checkout HEAD <file> 的缩写 ，这个操作是 可以清楚没有添加到缓存的更改，但是不会影响已经缓存的更改，原因在于其实缓存过的文件已经是另外的一个文件了
* git checkout <branch> ,切换分支，刚刚提到了 .git/HEAD 中的内容，更新工作区域内容为 切换的分支的 所指向的 commit 对象的内容

#### git merge
> Git 分支合并： 快度向前合并 和三路合并

* 快速向前合并
> 我们会遇到，怕污染主分支的代码，在主分支上拉取新的分支修改，在主分支没有修改的前提下，这样肯定不会又冲突，直接合并就行了。相当于修改 .refs/heads 下主分支内容指向的最新commit 对象
![快度向前合并](/笔记/img/1226129-0fcb16bd7f842832.png)

* 三路合并 （假如我们的分支是test）
> 

![三路合并](/笔记/img/WechatIMG202.png)


* 如何解决冲突
> * 决定不合并。这时，唯一要做的就是重置index到HEAD节点。git merge --abort用于这种情况。
  * 解决冲突。Git会标记冲突的地方，解决完冲突的地方后使用git add加入到index中，然后使用git commit产生合并节点。
  * 你可以用以下工具来解决冲突:
  使用合并工具。git mergetool将会调用一个可视化的合并工具来处理冲突合并。
  * 查看差异。git diff将会显示三路差异（三路合并中所采用的三路比较算法）。
  * 查看每个分支的差异。git log --merge -p <path>将会显示HEAD版本和MERGE_HEAD版本的差异。
  * 查看合并前的版本。git show :1:文件名显示共同祖先的版本，git show :2:文件名显示当前分支的HEAD版本，git show :3:文件名显示对方分支的MERGE_HEAD版本。


#### git reset
  * git reset <file> 重缓存区移出特定的文件，但是不会改变工作区 的内容

  * git reset 重设缓存区，会取消所有文件的缓存 (工作区修改的文件不会还原)

  * git reset --hard 重置缓存区和工作区，修改其内容对应最新的一次commit 对应的内容
  ```
  MacBook-Pro-9:lyan-learn xmly$ git reset --hard
   HEAD is now at ec66ae7 update
  ```
  * git reset --hard <commit>: 重置缓存区和工作区，修改其内容为指定 commit 对应的内容
  * git reset <commit> 移动当前分支的末端到指定的 commit 处 


  - reset 发生了什么？

  > 移动HEAD 所指向的分支指向的commit ，比如：你在master分支上工作，执行git reset 6789002（假如这是commit 对象的SHA-1哈希值）
  这时候master 当前指向的commit 改为6789002 的commit对象。git commit 会创建一个新的commit ，git reset 会修改HEAD 所指向的，也就是把分支的指向改成原来的指向，过程不会修改INdex 和工作目录 （reset 的本质撤销上一次的commit 命令）

 > git reset --hard 会恢复工作区上次commit 的快照 ，也就是清空工作区所做的更改

 > 如果说reset 后面指定路径 git reset file.txt 其实是 git reset --mixed HEAD file.txt 的简写形式 ,会将作用范围限定在指定的文件和文件夹，此时分支指向不会移动，不过索引和工作目录的内容则是可以完成局部的更改的

 

#### git stash

* 保存当前分支的工作状态，便于再次切换回到本分支恢复

> 使用场景： 假如你在test 上修改，但是你有紧急的bug 需要切换到别的分支修改，可以先git stash ,最后返回test 执行git stash list 查看所有的 list  执行 git stash apply，恢复最新的stash到工作区;

```
MacBook-Pro-9:lyan-learn xmly$ git stash save 'test-git'
Saved working directory and index state On master: test-git
MacBook-Pro-9:lyan-learn xmly$ git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
MacBook-Pro-9:lyan-learn xmly$ git stash list
stash@{0}: On master: test-git
MacBook-Pro-9:lyan-learn xmly$ 

```

```
MacBook-Pro-9:lyan-learn xmly$ git stash pop
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   "\347\254\224\350\256\260/\345\205\250\351\235\242\347\220\206\350\247\243git/git.md"

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (721e2f4eb9ea605d08f8c5e7df7d839a35904700)

```

* git stash pop 将缓存中的 第一个stash 删除，并将对应的修改应用到当前的工作区，

* git stash apply ,将缓存堆栈中的stash 多次应用到工作目录中，但是不会删除 stash 拷贝

 > 原理： 执行git stash 实际上 我们依据工作区，缓存区，以及HEAD 这三颗文件数 ，分别生成commit 
，以这三个commit 对象 生成的新的commit 对象，代表此次stash ，并把 这个commit 存到.git/refs/stash


 ```
 MacBook-Pro-9:lyan-learn xmly$ git stash list
stash@{0}: On master: test
MacBook-Pro-9:lyan-learn xmly$ cat .git/refs/stash
e607a1a61fe7e059e5501e920ff02c365d62bc20
MacBook-Pro-9:lyan-learn xmly$ git cat-file -p e607
tree 35633ee997617f747c06aa91eb040d613e663175
parent ec66ae750aceabe6b1591442941a29f50509a8cd
parent bce7ee4e66e7088c2a687832ebdd798a9dacbb4a
author lyan.lei <lyan.lei@ximalaya.com> 1554103269 +0800
committer lyan.lei <lyan.lei@ximalaya.com> 1554103269 +0800

On master: test
MacBook-Pro-9:lyan-learn xmly$ 

 ```











> 参考 https://www.jianshu.com/p/9f993e50caa0



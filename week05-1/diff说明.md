一、diff启动场景
   diff针对的是新， 老节点的children, 如果新， 老节点不是同一个节点或者节点是文本节点则会直接替换内容或者删除内容

二、diff流程
1. 设置新， 老节点的起始索引oldStart, oldEnd, newStart, newEnd
2. 当新， 老节点都还没遍历完成的时候：
   1. 确认当前索引对应的vNode存在
   2. 如果新， 老开始节点相同：
      1. 对两个节点进行patchVnode
      2. oldStart, newStart后移一位

   3. 如果新， 老尾节点相同
      1. 对两个节点patchVnode
      2. 新， 老尾节点前移一位
   4. 如果oldStart和newEnd是同一个节点
      1. 对两个节点进行patchVnode
      2. 操作dom, 将oldStart对应的dom移动到oldEnd后面
      3. oldStart后移一位， newEnd前移一位
   5. 如果oldEnd和newStart是同一个节点
      1. 对两个节点进行patchVnode
      2. 操作dom, 将oldEnd对应的dom移动到oldStart前面
      3. oldEnd前移一位， newStart后移一位

   6. 遍历oldChildren， 匹配每一个newNode
      1. 如果newNode对应的key不存在， 说明是新节点， 将其插入到oldStart之前
      2. 如果newNode对应的key已经存在，说明之前已经有这个节点， 找到这个节点
         1. 比较这两个节点的tag是否相同， 如果不同， 将新节点渲染成dom, 插入oldStart之前
         2. 如果相同， 对这两个节点也进行patchVnode,  比较新节点和旧节点有何不同， 将不同在oldNode上进行同步， 然后从oldChildren中移除该节点， 将改动后的节点插入oldStart之前
      3. newStart后移一位

3. 如果老节点遍历完了， 新节点还没遍历完

   1. 获取新节点遍历的结束位置
   2. 将余下的还没遍历的节点依次插入到和新节点遍历的结束位置之前

4. 如果老节点还没遍历完， 新节点遍历完了

   删除还没遍历到的老节点



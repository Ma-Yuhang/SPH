<template>
  <div class="pagination">
    <button @click="$emit('getPageNo',pageNo - 1)" :disabled="pageNo == 1">上一页</button>
    <button v-show="pageNo > 5" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-show="pageNo > 5" @click="$emit('getPageNo',2)" :class="{active:pageNo==2}">2</button>
    <button v-show="pageNo > 5">···</button>

    <!-- 中间连续部分 -->
    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start"
      @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">
      {{page}}
    </button>

    <button v-show="pageNo < (totalPage - Math.ceil(continues / 2))">···</button>
    <button v-show="pageNo < (totalPage - Math.floor(continues / 2))" @click="$emit('getPageNo',totalPage)"
      :class="{active:pageNo==totalPage}">{{totalPage}}
    </button>
    <button @click="$emit('getPageNo',pageNo + 1)" :disabled="pageNo == totalPage">下一页</button>

    <button style="margin-left: 20px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],  // continues为中间连续的页码数为5
  computed: {
    // 计算出总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出连续页码的开始数字和结束数字
    startNumAndEndNum() {
      const { totalPage, continues, pageNo } = this
      // 定义两个变量存储开始页码和结束页码
      let start = 0, end = 0
      // 如果总页数小于7页
      if (totalPage < 7) {
        start = 1
        end = totalPage
      } else {
        // 正常情况 总页数大于中间连续页码数
        if (pageNo <= 5) {
          start = 1
          end = 7
        } else if (pageNo >= (totalPage - Math.floor(continues / 2))) {
          start = totalPage - continues + 1
          end = totalPage
        } else {
          start = pageNo - Math.floor(continues / 2)
          end = pageNo + Math.floor(continues / 2)
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

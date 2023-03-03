<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1"
              @change="changeChecked(cart.skuId,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handle('minus',1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
              @change="handle('change',$event.target.value *1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handle('add',-1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice*cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0"
          @change="changeAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费）: </em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 引入lodash 节流
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted() {
    // 发请求 获得购物车商品列表
    this.getData()
  },
  methods: {
    // 获取购物车数据
    getData() {
      this.$store.dispatch('shopCart/getCartList')
    },
    // 修改商品数量的回调函数 引入节流
    handle: throttle(async function (type, disNum, cart) {
      switch (type) {
        case "add":
          disNum = 1
          break;
        case "minus":
          // 判断商品的数量大于1时 传给服务器disNum等于-1(代表数量减1)
          // 否则就等于0(代表数量没变 因为最小为1)
          cart.skuNum > 1 ? disNum = -1 : disNum = 0
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1 || disNum !== parseInt(disNum)) {
            // 如果用户输入 不是数字  或者小于1  或者输入了小数
            disNum = 0
          } else {
            disNum = disNum - cart.skuNum
          }
          // console.log(disNum);
          break;
      }
      try {
        // 修改购物车模块商品数量的actions在detail中
        await this.$store.dispatch('detail/addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        // 如果修改数量成功后 重新获取购物车的数据
        this.getData()
      } catch (error) {
        alert('网络异常!')
      }
    }, 700),
    // 删除某个商品
    async deleteCart(skuId) {
      try {
        await this.$store.dispatch('shopCart/deleteCartList', skuId)
        // 删除成功 重新发请求
        this.getData()
        // this.$router.push()
      } catch (error) {
        alert('删除失败！')
      }
    },
    // 勾选或取消勾选某个商品
    async changeChecked(skuId, $event) {
      let zeroOrOne = 0
      zeroOrOne = $event.target.checked ? 1 : 0
      try {
        await this.$store.dispatch('shopCart/changeChecked', { skuId: skuId, isChecked: zeroOrOne })
        // 勾选成功 再次发请求
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除所有选中的商品
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('shopCart/deleteAllCheckedCart')
        // 所有选中的都删除成功 发请求
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 全选按钮的勾选
    async changeAllChecked(event) {
      try {
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('shopCart/changeAllChecked', isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters('shopCart', ['cartList']),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 全部商品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        sum += item.skuPrice * item.skuNum
      });
      return sum
    },
    // 全选复选框的勾选
    isAllChecked() {
      // 当所有商品都勾选 全选复选框就勾选
      return this.cartInfoList.every(item => {
        return item.isChecked == 1
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
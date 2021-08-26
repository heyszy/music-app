<template>
  <div class="top-container">
    <!-- 拷贝 -->
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift"></span>
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model="inputValue"
          @keyup.enter="toResult"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
    <!-- 拷贝结束 -->
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      inputValue:''
    };
  },
  methods:{
    toResult(){
      if(this.inputValue){
        this.$router.push('/result?q='+this.inputValue)
      }
    }
  }
};
</script>

<style>
.top-container {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #f9f9f9;
  z-index: 1;
  height: 60px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

.top-container .left-box {
  display: flex;
}

.top-container .left-box .icon-wrapper {
  margin-right: 80px;
}

.top-container .left-box .icon-wrapper .iconfont {
  margin-right: 10px;
  font-size: 12px;
  width: 18px;
  height: 18px;
  display: inline-block;
  text-align: center;
  line-height: 18px;
}

.top-container .left-box .icon-wrapper .iconfont::before {
  opacity: 0;
  transition: 0.2s;
}

.top-container .left-box .icon-wrapper .iconfont:hover::before {
  opacity: 1;
}

.top-container .left-box .icon-wrapper .iconfont.icon-home {
  background-color: #dd6d60;
  border-radius: 50%;
}

.top-container .left-box .icon-wrapper .iconfont.icon-sami-select {
  background-color: #dcc060;
  border-radius: 50%;
}

.top-container .left-box .icon-wrapper .iconfont.icon-full-screen {
  background-color: #84bb58;
  border-radius: 50%;
}

.top-container .left-box .history-wrapper {
  display: flex;
  align-items: center;
}

.top-container .left-box .history-wrapper .iconfont {
  width: 35px;
  height: 35px;
  font-size: 30px;
  text-align: center;
  line-height: 35px;
  color: gray;
  border-radius: 50%;
  transition: 0.2s;
  cursor: pointer;
}

.top-container .left-box .history-wrapper .iconfont:first-child {
  margin-right: 10px;
}

.top-container .left-box .history-wrapper .iconfont:hover {
  background-color: #ebebeb;
}

.top-container .right-box {
  display: flex;
  align-items: center;
}
</style>
<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in carousel" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h2 class="title">推荐歌单</h2>
      <div class="items">
        <div class="item" v-for="(item, index) in personallist" :key="index">
          <div class="img-wrap">
            <!-- 热门推荐浮窗 -->
            <!-- <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div> -->
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h2 class="title">最新音乐</h2>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="playmusic(item.id)"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h2 class="title">推荐MV</h2>
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "discovery",
  data() {
    return {
      //卡片化展示
      carousel: [],
      personallist: [],
      songs: [],
      mvs: [],
    };
  },
  methods: {
    playmusic: function (id) {
      this.axios.get("http://localhost:3000/song/url?id=" + id).then((res) => {
        let url = res.data.data[0].url;
        this.$parent.musicurl = url;
      });
    },
  },
  created() {
    this.axios.get("http://localhost:3000/banner").then((res) => {
      this.carousel = res.data.banners;
    });
    this.axios
      .get("http://localhost:3000/personalized", { params: { limit: 10 } })
      .then((res) => {
        this.personallist = res.data.result;
      });
    this.axios.get("http://localhost:3000/personalized/newsong").then((res) => {
      this.songs = res.data.result;
    });
    this.axios.get("http://localhost:3000/personalized/mv").then((res) => {
      //console.log(res);
      this.mvs = res.data.result;
    });
  },
};
</script>

<style >
.discovery-container .el-carousel__container {
  height: 230px;
}

.discovery-container .el-carousel__item img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.discovery-container .title {
  font-weight: normal;
  margin-bottom: 20px;
  padding-left: 8px;
}

.discovery-container .recommend {
  margin-bottom: 40px;
}

.discovery-container .recommend .items {
  display: flex;
  flex-wrap: wrap;
}

.discovery-container .recommend .items .item {
  width: 200px;
  margin: 10px;
  position: relative;
  overflow: hidden;
}

.discovery-container .recommend .items .item img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}

.discovery-container .recommend .items .item .desc-wrap {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 16px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  max-height: 50px;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  top: -50px;
}

.discovery-container .recommend .items .item .desc-wrap span {
  font-size: 14px;
}

.discovery-container .recommend .items .item:hover .desc-wrap {
  top: 0;
}

.discovery-container .recommend .items .item .img-wrap {
  position: relative;
}

.discovery-container .recommend .items .item .img-wrap .icon-play {
  position: absolute;
  right: 10px;
  bottom: 13px;
  width: 40px;
  height: 40px;
  color: #dd6d60;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.discovery-container .recommend .items .item .img-wrap .icon-play::before {
  transform: translateX(3px);
}

.discovery-container .recommend .items .item .img-wrap:hover .icon-play {
  opacity: 1;
}

.discovery-container .recommend .items .item .name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 14px;
}

.discovery-container .news {
  margin-bottom: 40px;
}

.discovery-container .news .items {
  height: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 15px;
}

.discovery-container .news .items .item {
  height: 100px;
  width: 50%;
  display: flex;
  align-items: center;
}

.discovery-container .news .items .item:hover {
  background-color: #f5f5f5;
}

.discovery-container .news .items .item .index {
  margin-right: 15px;
  font-size: 15px;
}

.discovery-container .news .items .item .img-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.discovery-container .news .items .item .img-wrap img {
  width: 80px;
  height: 80px;
}

.discovery-container .news .items .item .img-wrap .iconfont {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  color: #dd6d60;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.discovery-container .news .items .item .img-wrap .iconfont::before {
  transform: translateX(3px);
}

.discovery-container .news .items .item .img-wrap:hover .iconfont {
  opacity: 1;
}

.discovery-container .news .items .item .song-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 10px;
  font-size: 16px;
}

.discovery-container .news .items .item .song-wrap .singer {
  font-size: 14px;
  color: gray;
}

.discovery-container .mvs .items {
  display: flex;
  justify-content: space-around;
}

.discovery-container .mvs .items .item {
  width: 250px;
  cursor: pointer;
}

.discovery-container .mvs .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.discovery-container .mvs .items .item .img-wrap > .icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  color: #dd6d60;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.discovery-container .mvs .items .item .img-wrap > .icon-play::before {
  transform: translateX(3px);
}

.discovery-container .mvs .items .item .img-wrap:hover > .icon-play {
  opacity: 1;
}

.discovery-container .mvs .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.discovery-container .mvs .items .item .img-wrap .num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}

.discovery-container .mvs .items .item .img-wrap .num-wrap .icon-play {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.discovery-container .mvs .items .item .info-wrap .name {
  font-size: 15px;
  margin-bottom: 5px;
}

.discovery-container .mvs .items .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}
</style>

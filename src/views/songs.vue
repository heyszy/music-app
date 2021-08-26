//最新音乐
<template>
  <div class="songs-container" v-loading="loading">
    <div class="tab-bar">
      <span class="item" @click="tag = 0" :class="{ active: tag == 0 }"
        >全部</span
      >
      <span class="item" @click="tag = 7" :class="{ active: tag == 7 }"
        >华语</span
      >
      <span class="item" @click="tag = 96" :class="{ active: tag == 96 }"
        >欧美</span
      >
      <span class="item" @click="tag = 8" :class="{ active: tag == 8 }"
        >日本</span
      >
      <span class="item" @click="tag = 16" :class="{ active: tag == 16 }"
        >韩国</span
      >
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" v-for="(item, index) in lists" :key="index">
          <td>{{ index &lt; 9 ? "0" + (index + 1) : index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt="" />
              <span class="iconfont icon-play" @click="playmusic(item.id)"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
            </div>
          </td>
          <td>{{ item.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "songs",
  data() {
    return {
      loading:false,
      //歌曲列表
      lists: [],
      //分类
      tag: "0",
    };
  },
  methods: {
    getList() {
      this.loading = true;
      this.axios({
        url: "http://localhost:3000/top/song",
        method: "get",
        params: {
          //分类参数
          type: this.tag,
        },
      }).then((res) => {
        this.lists = res.data.data;
        for (let i in this.lists) {
          let min = parseInt(this.lists[i].duration / 1000 / 60);
          if (min < 10) min = "0" + min;
          let sec = parseInt((this.lists[i].duration / 1000) % 60);
          if (sec < 10) sec = "0" + sec;
          this.lists[i].duration = `${min}:${sec}`;
        }
        this.loading =false;
      });
    },
    playmusic: function (id) {
      this.axios.get("http://localhost:3000/song/url?id=" + id).then((res) => {
        let url = res.data.data[0].url;
        this.$parent.musicurl = url;
      });
    },
  },
  created() {
    this.getList();
  },
  watch: {
    tag() {
      this.getList();
    },
  },
};
</script>

<style>
.songs-container .tab-bar {
  display: flex;
  justify-content: flex-end;
}

.songs-container .tab-bar .item {
  font-size: 15px;
  color: gray;
  margin-right: 20px;
  cursor: pointer;
}

.songs-container .tab-bar .item.active {
  color: #dd6d60;
}

.songs-container .song-table .song-wrap > span {
  margin-top: 20px;
  display: inline-block;
  color: #bebebe;
}

.songs-container .song-table .song-wrap .icon-mv {
  padding-left: 5px;
  color: #dd6d60;
}

.songs-container .song-table .img-wrap {
  position: relative;
  width: 70px;
  height: 70px;
}

.songs-container .song-table .img-wrap img {
  width: 70px;
  height: 70px;
  border-radius: 5px;
}

.songs-container .song-table .img-wrap .icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  color: #dd6d60;
  font-size: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
}

.songs-container .song-table .img-wrap .icon-play::before {
  transform: translateX(1px);
}
</style>
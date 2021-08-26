<template>
  <div class="result-container">
    <div class="title-wrap">
      <!-- 参数 -->
      <h2 class="title">{{ $route.query.q }}</h2>
      <span class="sub-title">找到{{ count }}个结果</span>
    </div>
    <el-tabs v-model="type">
      <el-tab-pane label="歌曲" name="1">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in songs"
              :key="index"
              @dblclick="playmusic(item.id)"
            >
              <td>{{ index &lt; 9 ? "0" + (index + 1) : index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span class="iconfont icon-mv" v-if="item.mvid"></span>
                  </div>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="1000">
        <div class="items">
          <div class="item" v-for="(item, index) in lists" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="1004">
        <div class="items mv">
          <div class="item" v-for="(item,index) in mvs" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount}}</div>
              </div>
              <span class="time">{{item.duration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "result",
  data() {
    return {
      //activeIndex: "songs",
      type: "1",
      count: 0,
      songs: [],
      lists: [],
      mvs: [],
    };
  },
  methods: {
    getResult() {
      this.axios({
        url: "https://autumnfish.cn/search",
        methods: "get",
        params: {
          keywords: this.$route.query.q,
          type: this.type,
          //   limit: this.limit,
          //   offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        console.log(res);
        if (this.type == 1) {
          this.count = res.data.result.songCount;
          this.songs = res.data.result.songs;
          this.time(this.songs);
        } else if (this.type == 1000) {
          this.count = res.data.result.playlistCount;
          this.lists = res.data.result.playlists;
          this.lists.forEach(x=>{
              if(x.playCount >= 100000) x.playCount = parseInt(x.playCount/10000) + '万'
          })
        } else {
          this.count = res.data.result.mvCount;
          this.mvs = res.data.result.mvs;
          this.time(this.mvs);
          this.mvs.forEach(x=>{
              if(x.playCount >= 100000) x.playCount = parseInt(x.playCount/10000) + '万'
          })
        }
      });
    },
    //时间转换函数
    time(arr) {
      for (let i in arr) {
        let min = parseInt(arr[i].duration / 1000 / 60);
        if (min < 10) min = "0" + min;
        let sec = parseInt((arr[i].duration / 1000) % 60);
        if (sec < 10) sec = "0" + sec;
        arr[i].duration = `${min}:${sec}`;
      }
    },
    playmusic: function (id) {
      this.axios.get("https://autumnfish.cn/song/url?id=" + id).then((res) => {
        let url = res.data.data[0].url;
        this.$parent.musicurl = url;
      });
    },
  },
  watch: {
    $route() {
      this.getResult();
    },
    type() {
      this.getResult();
    },
  },
  created() {
    this.getResult();
  },
};
</script>

<style >
</style>

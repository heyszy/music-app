<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlistimfo.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ playlistimfo.name }}</p>
        <div class="author-wrap" v-if="playlistimfo.creator">
          <img class="avatar" :src="playlistimfo.creator.avatarUrl" alt="" />
          <span class="name">{{ playlistimfo.creator.nickname }}</span>
          <span class="time"
            >{{ formatDate(playlistimfo.createTime, "yyyy-MM-dd") }}创建</span
          >
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item, index) in playlistimfo.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ playlistimfo.description }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
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
            <tr
              class="el-table__row"
              v-for="(item, index) in playlistimfo.tracks"
              :key="index"
            >
              <td>{{ index &lt; 9 ? "0" + (index + 1) : index + 1 }}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play"></span>
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
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论(66)" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">精彩评论<span class="number">(666)</span></p>
          <div class="comments-wrap">
            <div class="item">
              <div class="icon-wrap">
                <img src="../assets/avatar.jpg" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">爱斯基摩：</span>
                  <span class="comment">谁说的，长大了依旧可爱哈</span>
                </div>
                <div class="re-content">
                  <span class="name">小苹果：</span>
                  <span class="comment">还是小时候比较可爱</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">最新评论<span class="number">(666)</span></p>
          <div class="comments-wrap">
            <div class="item">
              <div class="icon-wrap">
                <img src="../assets/avatar.jpg" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">爱斯基摩：</span>
                  <span class="comment">谁说的，长大了依旧可爱哈</span>
                </div>
                <div class="re-content">
                  <span class="name">小苹果：</span>
                  <span class="comment">还是小时候比较可爱</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
            <div class="item">
              <div class="icon-wrap">
                <img src="../assets/avatar.jpg" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">爱斯基摩：</span>
                  <span class="comment">谁说的，长大了依旧可爱哈</span>
                </div>
                <div class="re-content">
                  <span class="name">小苹果：</span>
                  <span class="comment">还是小时候比较可爱</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
            <div class="item">
              <div class="icon-wrap">
                <img src="../assets/avatar.jpg" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">爱斯基摩：</span>
                  <span class="comment">谁说的，长大了依旧可爱哈</span>
                </div>
                <div class="re-content">
                  <span class="name">小苹果：</span>
                  <span class="comment">还是小时候比较可爱</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "playlist",
  data() {
    return {
      activeIndex: "1",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      playlistimfo: {},
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    formatDate(date, fmt = "yyyy-MM-dd hh:mm:ss") {
      date = date instanceof Date ? date : new Date(date);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          );
        }
      }
      return fmt;
    },
    padLeftZero(str) {
      return ("00" + str).substr(str.length);
    },
  },
  created() {
    this.axios({
      url: "http://localhost:3000/playlist/detail",
      methods: "get",
      params: {
        id: this.$route.query.id,
      },
    }).then((res) => {
      this.playlistimfo = res.data.playlist;
      console.log(res);
      for (let i in this.playlistimfo.tracks) {
        let min = parseInt(this.playlistimfo.tracks[i].dt / 1000 / 60);
        if (min < 10) min = "0" + min;
        let sec = parseInt((this.playlistimfo.tracks[i].dt / 1000) % 60);
        if (sec < 10) sec = "0" + sec;
        this.playlistimfo.tracks[i].dt = `${min}:${sec}`;
      }
    });
  },
};
</script>

<style >
</style>

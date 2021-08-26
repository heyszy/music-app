<template>
  <div class="layout">
    <layout-header />

    <div class="index-container">
      <div class="nav">
        <ul>
          <li>
            <router-link to="/discovery">
              <span class="iconfont icon-find-music"></span>
              发现音乐
            </router-link>
          </li>
          <li>
            <router-link to="/playlists">
              <span class="iconfont icon-music-list"></span>
              推荐歌单
            </router-link>
          </li>
          <li>
            <router-link to="/songs">
              <span class="iconfont icon-music"></span>
              最新音乐
            </router-link>
          </li>
          <li>
            <router-link to="/mvs">
              <span class="iconfont icon-mv"></span>
              最新MV
            </router-link>
          </li>
        </ul>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>

    <div class="player">
        <!-- 自动播放 -->
        <audio :src="musicurl" controls autoplay></audio>
    </div>
  </div>
</template>

<script>

import LayoutHeader from "./Header.vue";
import LayoutMenu from "./Menu.vue";
export default {
  data() {
    return {
        musicurl:''
    };
  },
  components: {
    LayoutHeader,
    LayoutMenu,
  },
};
</script>

<style>
.layout {
  height: 100%;
}
.index-container {
  height: 100%;
  padding-top: 60px;
  padding-bottom: 60px;
}
.index-container {
  display: flex;
}

.index-container .nav {
  background-color: #ededed;
  width: 200px;
  height: 100%;
}

.index-container .nav li {
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.index-container .nav li:hover {
  background-color: #e7e7e7;
}

.index-container .nav li .iconfont {
  margin-right: 10px;
  font-size: 20px;
}

.index-container .nav li a {
  color: black;
  padding-left: 30px;
  font-size: 18px;
  line-height: 60px;
  width: 100%;
  height: 100%;
}

.index-container .nav li a.router-link-active {
  color: #dd6d60;
}

.index-container .nav li a.router-link-active .iconfont {
  color: #dd6d60;
}

.index-container .main {
  flex: 1;
  overflow-y: scroll;
  padding: 10px 20px;
}

.index-container .main > div {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0px;
  /* border-radius: 15px;
  background-color: #f0f0f0; */
}

.player {
  background: #f1f3f4;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

audio {
  width: 100%;
  border-radius: none;
  outline: none;
}
</style>
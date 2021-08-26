<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from "@/layout";

export default {
  components: {
    Layout,
  }
};
</script>

<style>
</style>



<style>
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
 Microsoft YaHei, '\5FAE\8F6F\96C5\9ED1', Arial, sans-serif;
}
#app {
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* 自己写的 */
.header {
  background-color: lightblue;
}
</style>

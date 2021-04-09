<template>
  <main>
    <h1>{{msg}}</h1>
    <h3>
      <a target="_blank" rel="noopener noreferrer" class="buttonText" @click="turnRouter()">官网访问地址</a>
    </h3>
  </main>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      msg: "欢迎来到思空官网后台"
    };
  },
  methods: {
    turnRouter() {
      let Logistics;
      Logistics = this.$router.resolve({
        path: "/"
      });
      window.open(Logistics.href, "_blank");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

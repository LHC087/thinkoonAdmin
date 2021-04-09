<template>
  <div>
    <Banner></Banner>
    <Resource></Resource>
    <Case :message="sendmsg"></Case>
    <Red></Red>
  </div>
</template>

<script>
import Banner from "./Banner";
import Resource from "./Resource";
import Case from "./Case";
import Red from "./Red";
export default {
  name: "Main",
  components: {
    Banner,
    Resource,
    Case,
    Red
  },
  data() {
    return {
      sendmsg: "indexcase"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

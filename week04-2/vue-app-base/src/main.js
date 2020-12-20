import Vue from "vue";
import App from "./App.vue";

import "./style.less";

Vue.config.productionTip = false;

const foo = () => {
  let a = 1;
  console.log(a);
};
foo();
new Vue({
  render: (h) => h(App),
}).$mount("#app");

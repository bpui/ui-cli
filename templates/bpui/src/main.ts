import "core-js/stable";
import "regenerator-runtime/runtime";

import "./registerHook";
import "./registerServiceWorker";

import Vue from "vue";
import * as ui from "@bpui/ui";

import App from "./app.vue";
import routers from "./router/_tmpConfig";

__debug = process.env.NODE_ENV === "development";
Vue.config.productionTip = false;

// setup.
ui.setNavbarDefaultCfg({
  retainPageInPush: false,
});

// register app.
// 404 使用nginx指向 /404.html 页面.
// routers.push({ name: null, path: '*', component: () => import('./pages/404.vue') });
ui.registerApp({ routePath: routers, basePath: '/' });

// create instance.
export default new Vue({
  render: h => h(App)
}).$mount("#app");

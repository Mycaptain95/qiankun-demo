import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';
import { initGlobalState, registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';
import { MicroApps } from './microApps'
import './styles/index.less'

Vue.config.productionTip = false;

Vue.use(ElementUI);

let router = null;
let instance = null;

function render(props = {}) {
    const { container } = props;
    // router = new VueRouter({
    //     base: window.__POWERED_BY_QIANKUN__ ? '/vue' : '/',
    //     mode: 'history',
    //     routes,
    // });

    instance = new Vue({
        // router,
        store,
        render: h => h(App),
    }).$mount(container ? container.querySelector('#subapp-container') : '#subapp-container');
}

render();


registerMicroApps(MicroApps, {
    beforeLoad: [
        (app) => {
            console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
        },
    ],
    beforeMount: [
        (app) => {
            console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
        },
    ],
    afterUnmount: [
        (app) => {
            console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
        },
    ],
})

const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: 'qiankun',
  });
  
  onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));
  
  setGlobalState({
    ignore: 'master',
    user: {
      name: 'master',
    },
  });
  
  /**
   * Step3 设置默认进入的子应用
   */
  setDefaultMountApp('/demo1');
  
  /**
   * Step4 启动应用
   */
  start();
  
  runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
  });
  
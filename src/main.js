import { createApp } from 'vue'
import App from './App.vue'

//Element plus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css' // Importa los estilos de Element Plus
import '@element-plus/icons-vue'


const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')

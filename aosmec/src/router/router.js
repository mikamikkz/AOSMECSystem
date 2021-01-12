import login from '../views/Login';
import queuelist from '../views/QueueList';
import manageBusiness from '../views/ManageBusiness';
import manageAccount from '../views/ManageAccount';
import manageBranch from '../views/ManageBranch';
// Vue.use(VueRouter);

export default[
    {path:'/login',component: login},
    {path:'/queueList',component: queuelist},
    {path:'/business', component: manageBusiness},
    {path:'/account', component: manageAccount},
    {path:'/branch', component: manageBranch},
] 
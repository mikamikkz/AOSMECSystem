import dashboard from '../views/Dashboard'
import reservation from '../views/Reservation';
import checkin from '../views/Checkin';
import floor1 from '../views/Floor1';
import floor2 from '../views/Floor2';
import floor3 from '../views/Floor3';
import login from '../views/Login';
// temporary
import reg from '../views/Register';

export default[
    {path:'/dashboard', component: dashboard},
    {path:'/reservation', component: reservation},
    {path:'/checkin', component: checkin},
    {path:'/room-mgmt/floor-1', component: floor1},
    {path:'/room-mgmt/floor-2', component: floor2},
    {path:'/room-mgmt/floor-3', component: floor3},
    {path:'/login', component: login},
    {path:'/register', component: reg},
]




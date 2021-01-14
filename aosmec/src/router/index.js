import dashboard from '../views/Dashboard'
import reservation from '../views/Reservation';
import checkin from '../views/Checkin';
import floor1 from '../views/Floor 1';
import floor2 from '../views/Floor 2';
import floor3 from '../views/Floor 3';

export default[
    {path:'/dashboard', component: dashboard},
    {path:'/reservation', component: reservation},
    {path:'/checkin', component: checkin},
    {path:'/room-mgmt/floor-1', component: floor1},
    {path:'/room-mgmt/floor-2', component: floor2},
    {path:'/room-mgmt/floor-3', component: floor3}
]




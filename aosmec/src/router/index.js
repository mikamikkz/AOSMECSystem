import dashboard from '../views/Dashboard'
import reservation from '../views/Reservation';
import checkin from '../views/Checkin';
<<<<<<< HEAD
import roommanagement from '../views/RoomManagement';
=======
import floor1 from '../views/Floor1';
import floor2 from '../views/Floor2';
import floor3 from '../views/Floor3';
import login from '../views/Login';
// temporary
import reg from '../views/Register';
>>>>>>> 35dde75e1eb67092dbeed9a2bbe43506572fdc4e

export default[
    {path:'/dashboard', component: dashboard},
    {path:'/reservation', component: reservation},
    {path:'/checkin', component: checkin},
<<<<<<< HEAD
    {path:'/room-mgmt',component: roommanagement}
=======
    {path:'/room-mgmt/floor-1', component: floor1},
    {path:'/room-mgmt/floor-2', component: floor2},
    {path:'/room-mgmt/floor-3', component: floor3},
    {path:'/login', component: login},
    {path:'/register', component: reg},
>>>>>>> 35dde75e1eb67092dbeed9a2bbe43506572fdc4e
]




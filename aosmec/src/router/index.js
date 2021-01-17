import dashboard from '../views/Dashboard'
import reservation from '../views/Reservation';
import checkin from '../views/Checkin';
import roommanagement from '../views/RoomManagement';

export default[
    {path:'/dashboard', component: dashboard},
    {path:'/reservation', component: reservation},
    {path:'/checkin', component: checkin},
    {path:'/room-mgmt',component: roommanagement}
]




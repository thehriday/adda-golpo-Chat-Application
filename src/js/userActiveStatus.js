import cookieParser from './util/cookieParser';
import io from 'socket.io-client';

import { USER_ACTIVE_STATUS } from '../../socket.io/emitType';

const socket = io();
const { token } = cookieParser();

const handleActiveStatus = () => {
  if (token) {
    socket.emit(USER_ACTIVE_STATUS, { token, isActive: navigator.onLine });
  }
};

window.addEventListener('online', handleActiveStatus);
window.addEventListener('offline', handleActiveStatus);
window.addEventListener('load', handleActiveStatus);

window.addEventListener('unload', () => {
  socket.emit(USER_ACTIVE_STATUS, { token, isActive: false });
});

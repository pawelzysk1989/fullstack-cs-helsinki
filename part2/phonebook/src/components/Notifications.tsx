import React from 'react';

import { Notification as NotificationType } from '../models/Notification';
import Notification from './Notification';

type Props = {
  notifications: NotificationType[];
};

function Notifications({ notifications }: Props) {
  return (
    <div>
      {notifications.map((notification) => (
        <Notification key={notification.message} notification={notification} />
      ))}
    </div>
  );
}

export default Notifications;

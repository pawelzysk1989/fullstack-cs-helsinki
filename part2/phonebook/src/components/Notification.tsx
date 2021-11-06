import React from 'react';

import { Notification as NotificationType } from '../models/Notification';

type Props = {
  notification: NotificationType;
};

function Notification({ notification: { type, message } }: Props) {
  return (
    <div className={`notification notification--${type}`}>
      <span className="notification__message">{message}</span>
    </div>
  );
}

export default Notification;

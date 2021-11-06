import React from 'react';

import { Notification as NotificationType } from '../models/Notification';

type Props = {
  notification: NotificationType;
};

function Notification({ notification: { type, message } }: Props) {
  return (
    <div>
      {type} {message}
    </div>
  );
}

export default Notification;

type SuccessNotification = {
  type: 'success';
  message: string;
  duration: number;
};

type ErrorNotification = {
  type: 'error';
  message: string;
  retry: boolean;
  errorCode: string | number;
};

type WarningNotification = {
  type: 'warning';
  message: string;
};

type Notification = 
  | SuccessNotification 
  | ErrorNotification 
  | WarningNotification;


type NotificationType = Notification['type'];

type NotificationConfig = {
  [K in NotificationType]: {
    icon: string;
    color: string;
  };
};

const NOTIFICATION_CONFIG = {
  success: {
    icon: 'иконка 1',
    color: 'green'
  },
  error: {
    icon: 'иконка 2',
    color: 'red'
  },
  warning: {
    icon: 'иконка 3',
    color: 'orange'
  }
} as const


type NotificationPreview = Pick<Notification, 'type' | 'message'>;

type NotificationWithoutMeta = Pick<ErrorNotification, 'type' | 'message'| 'retry'>;

type Tracked = {
  id: string;
  createdAt: Date;
  readAt?: Date | null;
};

type TrackedNotification = Notification & Tracked;



// Для тестирования
const notifications: TrackedNotification[] = [
  {
    type: 'success',
    message: 'Сохранено!',
    duration: 3000,
    id: '1',
    createdAt: new Date()
  },
  {
    type: 'error',
    message: 'Ошибка сети',
    retry: true,
    errorCode: 503,
    id: '2',
    createdAt: new Date()
  },
  {
    type: 'warning',
    message: 'Низкий заряд',
    id: '3',
    createdAt: new Date(),
    readAt: new Date()
  }
];


function renderNotification(notif: Notification): string {
  switch (notif.type) {
    case 'success':
      return `${NOTIFICATION_CONFIG.success.color}, ${NOTIFICATION_CONFIG.success.icon}`
    
    case 'error':
      return `${NOTIFICATION_CONFIG.error.color}, ${NOTIFICATION_CONFIG.error.icon}`
    
    case 'warning':
      return `${NOTIFICATION_CONFIG.warning.color}, ${NOTIFICATION_CONFIG.warning.icon}`
    
    default:
      const _exhaustive: never = notif
      return _exhaustive;
  }
}

function isErrorNotification(notif: Notification) {
  if (notif.type === 'error') {
    console.log(`Retry: ${notif.retry}, Code: ${notif.errorCode}`);
  }
}

function getUnread(notifications: TrackedNotification[]): TrackedNotification[] {
  return notifications.filter(n => !n.readAt)
}




// Тестирование

console.log(renderNotification(notifications[0]!))
console.log(renderNotification(notifications[1]!))

isErrorNotification(notifications[1]!)

console.log(getUnread(notifications))
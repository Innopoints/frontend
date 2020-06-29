import StockChangeStatuses from 'src/constants/backend/stock-change-statuses.js';
import NotificationTypes from 'src/constants/backend/notification-types.js';

export default function getNotificationContent({ type, payload }) {
  let fragments;
  try {
    switch (type) {
      case NotificationTypes.PURCHASE_STATUS_CHANGED: {
        const statuses = {
          [StockChangeStatuses.READY_FOR_PICKUP]: 'is ready to be picked up at 319 Office',
          [StockChangeStatuses.PENDING]: 'is not yet ready for pick up',
          [StockChangeStatuses.CARRIED_OUT]: 'has been delivered to you',
          [StockChangeStatuses.REJECTED]: 'was rejected',
        };
        fragments = [
          'Your ',
          {
            text: (payload.product.type == null ?
              payload.product.name : `'${payload.product.name}' ${payload.product.type}`),
            url: '/products/' + payload.product.id,
          },
          ' purchase ',
          statuses[payload.stock_change.status] || '-- well, something happened to it',
        ];
        break;
      }

      case NotificationTypes.NEW_ARRIVALS: {
        fragments = [
          'New products have arrived at ',
          {
            text: 'the InnoStore',
            url: '/products',
          },
        ];
        break;
      }

      case NotificationTypes.APPLICATION_STATUS_CHANGED: {
        fragments = [
          'Your volunteering application for ',
          {
            text: payload.activity.name,
            url: '/projects/' + payload.project.id,
          },
          ' was ',
        ];

        if (payload.application.status === 'approved') {
          fragments.push('approved');
        } else if (payload.application.status === 'rejected') {
          fragments.push('rejected');
        } else {
          fragments.push('moved back to pending');
        }

        break;
      }

      case NotificationTypes.CLAIM_INNOPOINTS: {
        fragments = [
          'Leave feedback on ',
          {
            text: `your ${payload.activity.internal ? 'organizational' : 'volunteering'} work`,
            url: '/projects/' + payload.project.id,
          },
        ];
        if (payload.application.actual_hours !== 0) {
          fragments = fragments.concat([
            ' to claim ',
            (payload.application.actual_hours * payload.activity.reward_rate).toString(),
            ' innopoints',
          ]);
        }
        break;
      }

      case NotificationTypes.PROJECT_REVIEW_STATUS_CHANGED: {
        fragments = [
          'The project ',
          {
            text: payload.project.name,
            url: '/projects/' + payload.project.id,
          },
          ' was ',
          payload.project.review_status,
          ' by the administrator',
        ];
        break;
      }

      case NotificationTypes.ADDED_AS_MODERATOR: {
        fragments = [
          'You have been promoted to moderate ',
          {
            text: payload.project.name,
            url: '/projects/' + payload.project.id,
          },
        ];
        break;
      }

      case NotificationTypes.ALL_FEEDBACK_IN: {
        fragments = [
          'All volunteers of ',
          {
            text: payload.project.name,
            url: '/projects/' + payload.project.id,
          },
          ' have submitted feedback',
        ];
        break;
      }

      case NotificationTypes.OUT_OF_STOCK: {
        fragments = [
          'The ',
          {
            text: (payload.product.type == null ?
              payload.product.name : `'${payload.product.name}' ${payload.product.type}`),
            url: '/products/' + payload.product.id,
          },
          ' was sold out',
        ];
        break;
      }

      case NotificationTypes.NEW_PURCHASE: {
        fragments = [
          {
            text: payload.account.full_name,
            url: '/profile?user=' + payload.account.email,
          },
          ' has purchased the ',
          {
            text: (payload.product.type == null ?
              payload.product.name : `'${payload.product.name}' ${payload.product.type}`),
            url: '/products/' + payload.product.id,
          },
        ];
        break;
      }

      case NotificationTypes.PROJECT_REVIEW_REQUESTED: {
        fragments = [
          'The project ',
          {
            text: payload.project.name,
            url: '/projects/' + payload.project.id,
          },
          ' is ready for review',
        ];
        break;
      }

      case NotificationTypes.SERVICE: {
        fragments = [
          {
            text: 'Administrator\'s message: ',
            bold: true,
          },
          payload.message,
        ];
        break;
      }

      case NotificationTypes.MANUAL_TRANSACTION: {
        fragments = [
          'The administrator ',
        ];
        if (payload.transaction.change > 0) {
          fragments.push(`granted ${payload.transaction.change} innopoints to you`);
        } else {
          fragments.push(`deducted ${-payload.transaction.change} innopoints from you`);
        }
        break;
      }

      default: {
        fragments = ['Just a message from heaven wishing you a great day'];
      }
    }
  } catch (e) {
    console.error(e);
    return [];
  }
  return fragments;
}

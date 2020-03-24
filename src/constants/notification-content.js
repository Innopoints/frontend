export default function getNotificationContent({ type, payload }) {
  let fragments;
  switch (type) {
    case "purchase_status_changed": {
      const statuses = {
        'ready_for_pickup': 'is ready to be picked up at 319 Office',
        'pending': 'is not yet ready for pick up',
        'carried_out': 'has been delivered to you',
        'rejected': 'was rejected',
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

    case "new_arrivals": {
      fragments = [
        'New products have arrived at ',
        {
          text: 'the InnoStore',
          url: '/store',
        },
      ];
      break;
    }

    case "application_status_changed": {
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

    case "claim_innopoints": {
      fragments = [
        'Leave feedback on ',
        {
          text: 'your volunteering work',
          url: '/projects/' + payload.project.id,
        },
        ' to claim ',
        payload.application.actual_hours * payload.activity.reward_rate,
        ' innopoints',
      ];
      break;
    }

    case "project_review_status_changed": {
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

    case "added_as_moderator": {
      fragments = [
        'You have been promoted to moderate ',
        {
          text: payload.project.name,
          url: '/projects/' + payload.project.id,
        },
      ];
      break;
    }

    case "all_feedback_in": {
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

    case "out_of_stock": {
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

    case "new_purchase": {
      fragments = [
        {
          text: payload.account.full_name,
          url: 'mailto:' + payload.account.email,
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

    case "project_review_requested": {
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

    case "service": {
      fragments = [
        {
          text: 'Administrator\'s message: ',
          bold: true,
        },
        payload.message,
      ];
      break;
    }

    case "manual_transaction": {
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

  return fragments;
}

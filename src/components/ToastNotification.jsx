import React, { useEffect } from 'react';
import { StarIcon, CheckIcon, TrophyIcon, ArchiveBoxIcon, CloseIcon } from './ReiconIcons';
import { User } from './UserIcon';

export const ToastNotification = ({ notification, onClose }) => {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, notification.duration || 3400);

    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const { title, message, type = 'info', amount } = notification;

  const getIcon = () => {
    switch (type) {
      case 'xp':
        return (
          <div className="toast-icon-wrapper toast-icon-xp">
            <StarIcon size={20} color="#F59E0B" />
          </div>
        );
      case 'profile':
      case 'avatar':
        return (
          <div className="toast-icon-wrapper toast-icon-profile">
            <User size={20} color="#8B5CF6" />
          </div>
        );
      case 'chest':
        return (
          <div className="toast-icon-wrapper toast-icon-chest">
            <ArchiveBoxIcon size={20} color="#06B6D4" />
          </div>
        );
      case 'achievement':
        return (
          <div className="toast-icon-wrapper toast-icon-achievement">
            <TrophyIcon size={20} color="#EC4899" />
          </div>
        );
      case 'success':
      default:
        return (
          <div className="toast-icon-wrapper toast-icon-success">
            <CheckIcon size={20} color="#10B981" />
          </div>
        );
    }
  };

  return (
    <div className={`bottom-left-toast-container toast-type-${type}`} role="alert">
      <div className="toast-card-inner">
        {getIcon()}
        
        <div className="toast-text-content">
          <div className="toast-header-row">
            <span className="toast-title">{title}</span>
            {amount && <span className="toast-amount-pill">{amount}</span>}
          </div>
          {message && <p className="toast-message">{message}</p>}
        </div>

        <button
          className="toast-close-btn"
          onClick={onClose}
          title="Dismiss"
          aria-label="Close notification"
        >
          <CloseIcon size={14} color="#94A3B8" />
        </button>

        {/* Subtle bottom animated progress line */}
        <div className="toast-progress-bar" />
      </div>
    </div>
  );
};

export default ToastNotification;

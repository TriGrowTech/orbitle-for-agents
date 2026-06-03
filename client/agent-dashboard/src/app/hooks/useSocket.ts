import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { notificationApi } from '../api/notificationApi';
import { leadsApi } from '../api/leadsApi';

const SOCKET_URL = (import.meta as any).env.VITE_API_BASE_URL
  ? (import.meta as any).env.VITE_API_BASE_URL.replace('/api', '')
  : 'http://localhost:5000';

/**
 * Socket.io hook for real-time notifications.
 * Connects using the httpOnly cookie (same-origin credentials).
 * Listens for 'notification' events and invalidates RTK Query cache.
 */
export function useSocket(isAuthenticated: boolean) {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();

  const invalidateNotifications = useCallback(() => {
    dispatch(notificationApi.util.invalidateTags(['Notifications', 'UnreadCount']));
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = io(SOCKET_URL, {
      withCredentials: true,     // sends cookies with the connection handshake
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10,
    });

    socket.on('connect', () => {
      console.log('[SOCKET] Connected:', socket.id);
    });

    socket.on('notification', (data) => {
      console.log('[SOCKET] Notification received:', data);
      // Invalidate RTK Query cache so bell icon + dropdown refresh
      invalidateNotifications();
      // If it's a new lead notification, also invalidate Leads query cache
      if (data?.type === 'new_lead') {
        dispatch(leadsApi.util.invalidateTags(['Lead']));
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('[SOCKET] Disconnected:', reason);
    });

    socket.on('connect_error', (err) => {
      console.error('[SOCKET] Connection error:', err.message);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, invalidateNotifications, dispatch]);

  return socketRef.current;
}

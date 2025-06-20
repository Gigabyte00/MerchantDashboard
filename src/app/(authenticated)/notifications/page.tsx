
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BellRing, Mail, MessageSquare, Smartphone } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'transaction' | 'dispute' | 'payout' | 'system';
}

const initialNotifications: NotificationItem[] = [
  { id: "1", title: "New Transaction: #TXN72845", description: "Payment of $75.00 received via Stripe.", date: "2 hours ago", read: false, type: 'transaction' },
  { id: "2", title: "Dispute Alert: #DSP001", description: "A new dispute has been opened for transaction #TXN72845.", date: "1 day ago", read: false, type: 'dispute' },
  { id: "3", title: "Payout Successful", description: "Your payout of $2,340.10 has been processed.", date: "3 days ago", read: true, type: 'payout' },
  { id: "4", title: "System Maintenance Scheduled", description: "Scheduled maintenance on Oct 15, 2:00 AM UTC.", date: "5 days ago", read: true, type: 'system' },
];

const notificationTypeIcons = {
    transaction: <CreditCard className="h-5 w-5 text-green-500" />,
    dispute: <AlertTriangle className="h-5 w-5 text-red-500" />,
    payout: <DollarSign className="h-5 w-5 text-blue-500" />,
    system: <Settings className="h-5 w-5 text-gray-500" />,
};

function CreditCard(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    );
}
function AlertTriangle(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
}
function DollarSign(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
}
function Settings(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.19l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.19l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
}


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [prefs, setPrefs] = useState({
    transactionsEmail: true,
    transactionsSms: false,
    transactionsPush: true,
    disputesEmail: true,
    disputesSms: true,
    disputesPush: true,
    payoutsEmail: true,
    payoutsSms: false,
    payoutsPush: false,
    systemEmail: true,
    systemSms: false,
    systemPush: true,
  });

  const toggleRead = (id: string) => {
    setNotifications(
      notifications.map(n => n.id === id ? { ...n, read: !n.read } : n)
    );
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const handlePrefChange = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Notifications &amp; Alerts</h2>
        <p className="text-muted-foreground">Manage your notifications and communication preferences.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5"/> Recent Notifications</CardTitle>
            <CardDescription>
              You have {unreadCount} unread notification{unreadCount === 1 ? '' : 's'}.
            </CardDescription>
          </div>
          <Button variant="outline" onClick={markAllRead} disabled={unreadCount === 0}>Mark all as read</Button>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No notifications yet.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li key={notification.id} className={`p-4 rounded-lg border flex items-start gap-4 transition-colors ${notification.read ? 'bg-background' : 'bg-primary/5 border-primary/20'}`}>
                  <div className="flex-shrink-0 mt-1">{notificationTypeIcons[notification.type]}</div>
                  <div className="flex-grow">
                    <h3 className={`font-semibold ${notification.read ? 'text-foreground' : 'text-primary'}`}>{notification.title}</h3>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleRead(notification.id)}>
                    {notification.read ? 'Mark as unread' : 'Mark as read'}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how you want to be notified for different events.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { title: "Transactions", keys: { email: 'transactionsEmail', sms: 'transactionsSms', push: 'transactionsPush' } },
            { title: "Disputes", keys: { email: 'disputesEmail', sms: 'disputesSms', push: 'disputesPush' } },
            { title: "Payouts", keys: { email: 'payoutsEmail', sms: 'payoutsSms', push: 'payoutsPush' } },
            { title: "System Alerts", keys: { email: 'systemEmail', sms: 'systemSms', push: 'systemPush' } },
          ].map(category => (
            <div key={category.title}>
              <h4 className="font-medium mb-3">{category.title}</h4>
              <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
                {(Object.keys(category.keys) as Array<'email' | 'sms' | 'push'>).map(channel => (
                  <div key={channel} className="flex items-center justify-between sm:justify-start space-x-2 p-3 border rounded-md bg-background hover:bg-muted/50 transition-colors">
                     {channel === 'email' && <Mail className="h-5 w-5 text-muted-foreground" />}
                     {channel === 'sms' && <MessageSquare className="h-5 w-5 text-muted-foreground" />}
                     {channel === 'push' && <Smartphone className="h-5 w-5 text-muted-foreground" />}
                    <Label htmlFor={`${category.title}-${channel}`} className="capitalize flex-grow">{channel} Notifications</Label>
                    <Switch
                      id={`${category.title}-${channel}`}
                      checked={prefs[category.keys[channel] as keyof typeof prefs]}
                      onCheckedChange={() => handlePrefChange(category.keys[channel] as keyof typeof prefs)}
                      aria-label={`${category.title} ${channel} notifications`}
                    />
                  </div>
                ))}
              </div>
              {category.title !== "System Alerts" && <Separator className="mt-6" />}
            </div>
          ))}
        <div className="flex justify-end mt-6">
            <Button>Save Preferences</Button>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}

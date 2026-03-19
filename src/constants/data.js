export const DEMO = {
  customer: {
    name: 'Sarah',
    lastName: 'Mitchell',
    address: '42 Banksia Drive, Epping NSW 2121',
    email: 'sarah.mitchell@email.com',
    phone: '0412 345 678',
  },
  system: {
    name: 'Alpha ESS 26.6kWh',
    capacity: '26.6 kWh',
    panels: '6.6kW Solar Array',
    price: '$14,990',
    priceNum: 14990,
  },
  installer: {
    name: 'James Cooper',
    company: 'Precision Solar',
    rating: 4.9,
    installs: 847,
    initials: 'JC',
  },
  scheduledDate: 'Thursday, 27 March',
  scheduledWindow: '8:00 AM – 12:00 PM',
  savings: { monthly: 187, annual: 2244, payback: '6.7 years' },
  staff: [
    { name: 'Morgan', role: 'Sales Agent', initials: 'MR', color: '#2979FF' },
    { name: 'Kelsey', role: 'Scoping Lead', initials: 'KT', color: '#7C4DFF' },
    { name: 'Jen', role: 'Scheduling Lead', initials: 'JW', color: '#FF6D00' },
    { name: 'James C.', role: 'Install Coordinator', initials: 'JC', color: '#00BFA5' },
  ],
  payments: [
    { label: 'Deposit', amount: '$350', amountNum: 350, status: 'paid', date: '12 Mar', method: 'Visa •••• 4821' },
    { label: 'Progress (80%)', amount: '$11,712', amountNum: 11712, status: 'paid', date: '15 Mar', method: 'Visa •••• 4821' },
    { label: 'Balance on install', amount: '$2,928', amountNum: 2928, status: 'pending', date: '27 Mar', method: 'Due on install day' },
  ],
  upsells: [
    { id: 'switchboard', label: 'Switchboard Upgrade', price: '$1,800', priceNum: 1800, reason: 'Your switchboard has no spare slots for battery circuits. A 12-pole upgrade ensures safe, compliant installation.', icon: '⚡', required: true },
    { id: 'blackout', label: 'Blackout Protection', price: '$890', priceNum: 890, reason: "Without this, your battery won't power your home during an outage. Includes dedicated circuits back to battery.", icon: '🔋', required: false },
    { id: 'bollards', label: 'Safety Bollards (×2)', price: '$450', priceNum: 450, reason: 'Required by Australian law when battery is installed in a garage. Protects battery from vehicle impact.', icon: '🛡️', required: true },
  ],
  supportTickets: [
    { id: 'TK-4821', subject: 'Battery not charging after 3pm', status: 'in_progress', priority: 'medium', created: '2 Mar', agent: 'Dean', lastUpdate: 'Installer scheduled to check CT clamp wiring' },
    { id: 'TK-4756', subject: 'Wi-Fi module disconnecting', status: 'resolved', priority: 'low', created: '25 Feb', agent: 'AI Assistant', lastUpdate: 'Resolved — router channel conflict fixed' },
  ],
};

export const PHOTO_STEPS = [
  { id: 'switchboard', label: 'Switchboard', desc: 'Open the switchboard and photograph the full panel', tip: 'Make sure all circuit breakers are visible', icon: '⚡' },
  { id: 'inverter', label: 'Inverter', desc: 'Photograph your solar inverter showing the model label', tip: 'Include the serial number sticker if visible', icon: '◫' },
  { id: 'meter', label: 'Electricity Meter', desc: 'Photograph your meter showing the display screen', tip: "We'll auto-read your meter number via OCR", icon: '◎' },
  { id: 'wall', label: 'External Wall', desc: 'Photograph the external wall for battery mounting', tip: 'Stand back 2m for full view · include ground level', icon: '◇' },
  { id: 'battery_loc', label: 'Battery Location', desc: 'Stand at your preferred battery position', tip: 'Ensure 1m clearance on each side', icon: '⬡' },
];

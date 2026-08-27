/**
 * One-time CLI script to grant the `admin` custom claim to a Firebase user.
 *
 * Usage:
 *   cd server
 *   npm run set-admin -- someone@example.com
 *   npm run set-admin -- <uid>
 */
import dotenv from 'dotenv';
dotenv.config();

import { auth } from '../src/config/firebase';

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: npm run set-admin -- <email-or-uid>');
    process.exit(1);
  }

  try {
    const user = arg.includes('@') ? await auth.getUserByEmail(arg) : await auth.getUser(arg);
    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`Granted admin claim to ${user.email || user.uid} (uid: ${user.uid})`);
    console.log('The user must sign out and back in (or refresh their ID token) for the claim to take effect.');
  } catch (error) {
    console.error('Failed to set admin claim:', error);
    process.exit(1);
  }
}

main();

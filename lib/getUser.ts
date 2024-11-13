import { clerkClient } from "@clerk/clerk-sdk-node";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export async function getUsers(): Promise<User[]> {
  try {
    const users = await clerkClient.users.getUserList({
      limit: 100,
      orderBy: '-created_at'
    });

    return users.data.map((user: { id: any; firstName: any; lastName: any; emailAddresses: { emailAddress: any; }[]; createdAt: string | number | Date; }) => ({
      id: user.id,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      email: user.emailAddresses[0]?.emailAddress || '',
      createdAt: new Date(user.createdAt)
    }));

  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}
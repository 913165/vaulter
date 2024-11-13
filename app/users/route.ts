import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { getUsers } from "../../lib/getUser";

export async function GET(request: NextRequest) {
  try {
    // Verify the current user is authenticated
    const { userId } = getAuth(request);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get list of users
    const users = await getUsers();
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error in users API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
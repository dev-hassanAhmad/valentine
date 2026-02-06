import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database, ref, push } from 'firebase/database';

// Firebase configuration (server-side only)
const firebaseConfig = {
  apiKey: "AIzaSyDlofwLTSWBIlD4orTOpiIGLvM4sFuhu_Y",
  authDomain: "valentine-f2bda.firebaseapp.com",
  databaseURL: "https://valentine-f2bda-default-rtdb.firebaseio.com",
  projectId: "valentine-f2bda",
  storageBucket: "valentine-f2bda.firebasestorage.app",
  messagingSenderId: "22013889623",
  appId: "1:22013889623:web:0eee77f6c6823093372712"
};

// Initialize Firebase (server-side only)
let app: FirebaseApp | null = null;
let database: Database | null = null;

function getFirebaseInstance(): Database {
  if (!app || !database) {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
  }
  return database;
}

export interface ProposalAcceptance {
  receiverName: string | null;
  timestamp: number;
  date: string;
  userAgent?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { receiverName } = body;

    const acceptanceData: ProposalAcceptance = {
      receiverName: receiverName || "Anonymous",
      timestamp: Date.now(),
      date: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || undefined,
    };

    // Get Firebase instance and push data
    const db = getFirebaseInstance();
    const proposalsRef = ref(db, "proposals");
    await push(proposalsRef, acceptanceData);

    return NextResponse.json(
      { success: true, message: 'Proposal acceptance logged successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging proposal acceptance:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log proposal acceptance' },
      { status: 500 }
    );
  }
}

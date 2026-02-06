import { ref, push } from "firebase/database";
import { database } from "../config/firebase";

export interface ProposalAcceptance {
  receiverName: string | null;
  timestamp: number;
  date: string;
  userAgent?: string;
}

/**
 * Logs a proposal acceptance to Firebase Realtime Database
 * @param receiverName - The name of the person who received the proposal (if provided)
 */
export async function logProposalAcceptance(receiverName: string | null): Promise<void> {
  try {
    const acceptanceData: ProposalAcceptance = {
      receiverName: receiverName || "Anonymous",
      timestamp: Date.now(),
      date: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    // Push data to Firebase Realtime Database
    const proposalsRef = ref(database, "proposals");
    await push(proposalsRef, acceptanceData);
    
    console.log("Proposal acceptance logged successfully");
  } catch (error) {
    console.error("Error logging proposal acceptance:", error);
    // Don't throw - we don't want to break the user experience if logging fails
  }
}

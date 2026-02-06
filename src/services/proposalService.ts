/**
 * Logs a proposal acceptance via API
 * @param receiverName - The name of the person who received the proposal (if provided)
 */
export async function logProposalAcceptance(receiverName: string | null): Promise<void> {
  try {
    const response = await fetch('/api/proposals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        receiverName,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to log proposal acceptance');
    }

    const data = await response.json();
    console.log("Proposal acceptance logged successfully:", data.message);
  } catch (error) {
    console.error("Error logging proposal acceptance:", error);
    // Don't throw - we don't want to break the user experience if logging fails
  }
}

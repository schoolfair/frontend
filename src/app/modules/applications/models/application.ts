export interface Application {

  uid?: string;

  userId: string;
  listingId: string;

  resumeId ?: string;
  essays ?: string[];
  interestStatement ?: string;

  status?: boolean;
}

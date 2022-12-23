
/**
 * Represents the requirements for applying to a Listing
 */
export interface Requirements {
  resume?: boolean;

  /**
   * The applicant's statement of interest
   */
  interestStatement?: boolean;

  essays?:boolean;
  essayPrompts?: string[]

}

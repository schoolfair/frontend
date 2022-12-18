export interface Listing {

  uid?: string;

  /**
   * The position the listing refers to
   */
  position: string;

  /**
   * A description of what the listing entails
   */
  description: string;

  /**
   * The company or institution that provides this opportunity
   */
  institution: string;

  /**
   * The uid of the user that created this listing
   */
  creator: string;


}


export interface Config {
  testkube?: {
    /**
     * The flag to confirm if it's an Testkube Enterprise integration.
     * @visibility frontend
     */
    enterprise?: boolean;
    /**
     * The API url of the Testkube (Enterprise|OSS) instance.
     * @visibility frontend
     */
    api?: string;
    /**
     * The UI url of the Testkube Enterprise instance.
     * @visibility frontend
     */
    ui?: string;
  }
}

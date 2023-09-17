



export class NPM_api_engine 
{
    private metadata_host = "https://registry.npmjs.org/";

    constructor()
    {

    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :string: package_name
    // Output: None
    // Associated: 
    // Description: Makes the api call for the metadata, handling errors if any occur.
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    async get_metadata(package_name: string)
    {
        let endpoint = this.metadata_host + package_name;
        try {
            const response = await fetch(endpoint);
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.json();

            return data;

          } catch (error) {
            console.error('Error:', error);
          }
    }
}

class GitHub_api_engine
{

}
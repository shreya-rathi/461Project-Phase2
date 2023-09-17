import axios from "axios";
import { Package } from "./package";



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
    async get_metadata(pkg: Package)
    {
        let endpoint = this.metadata_host + pkg.get_name();
        try {
            const response = await axios.get(endpoint);

            if (response.status == 500) {
              throw new Error(`HTTP error! Status: ${response.status}`);
              //Perform logging
            }
            
            return response.data;


          } catch (error) {
            console.error('Error:', error);
            //Perform logging
          }
    }
    
    get_metadata_host() { return this.metadata_host; }
}

class GitHub_api_engine
{

}
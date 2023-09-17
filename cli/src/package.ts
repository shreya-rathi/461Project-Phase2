

export class Package 
{
    private name: string;
    private domain: string;
    private metadata: Object;
    private url: string;

    constructor(_url: string) 
    {  
        this.url = _url;
        //Put regex stuff here to store things like domain, pkg name, etc.
        //this.name = match.group() ... 
        //this.domain = match.group() ...
        this.metadata = {};
    }

    public get_name()
    {
        return this.name;
    }

    public get_domain()
    {
        return this.domain;
    }

    public get_metadata()
    {
        return this.metadata;
    }

    public get_url()
    {
        return this.url;
    }
}
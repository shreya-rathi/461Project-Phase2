

export class Package 
{
    private name: string;
    private domain: string;
    private metadata: Object;

    constructor(_name: string, _domain: string) 
    {
        this.name = _name;
        this.domain = _domain;
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
}
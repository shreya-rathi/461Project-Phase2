
export interface Metric 
{
    name: string;
    get_name(): string;
    score(package_name: string, metadata: Object): number;

}

export class Correctness implements Metric
{
    name = "Correctness";

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :string: package_name
    //  param :Object: metadata
    // Output: None
    // Associated: 
    // Description: Uses the available data to calculate the score for correctness
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    public score(package_name: string, metadata: Object)
    {
        return 0;
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: None
    // Output: None
    // Associated: 
    // Description: Gets the metric name. 
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    public get_name() : string
    {
        return this.name;
    }
}

export class BusFactor implements Metric
{
    name = "BusFactor";

    public score(package_name: string, metadata: Object)
    {
        

        return 0;
    }

    public get_name() : string 
    {
        return this.name;
    }
}

export class ResponsiveMaintainer implements Metric
{
    name = "ResponsiveMaintainer";

    public score(package_name: string, metadata: Object)
    {
        return 0;
    }

    public get_name() : string 
    {
        return this.name;
    }
}

export class RampUp implements Metric
{
    name = "RampUp";

    public score(package_name: string, metadata: Object)
    {
        return 0;
    }

    public get_name() : string 
    {
        return this.name;
    }
}

export class License implements Metric
{
    name = "License";

    public score(package_name: string, metadata: Object)
    {
        return 0;
    }

    public get_name() : string 
    {
        return this.name;
    }
}

export class NetScore implements Metric
{
    name = "NetScore";

    public score(package_name: string, metadata: Object)
    {
        return 0;
    }

    public get_name() : string 
    {
        return this.name;
    }
}


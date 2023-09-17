
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
        let top_commiter_perc = this.get_top_committer_perc();
        let top_x_commiter_perc = this.get_top_x_committer_perc();
        let number_committers = this.get_number_committers();

        let func_steepness = 0.1;
        let top_commiter_weight = 0.3;
        let top_x_commiter_weight = 0.3;
        let number_committers_weight = 0.4;

        let top_commiter_perc_func = 1 / (1 + Math.exp(-func_steepness * (top_commiter_perc - 0.5)));
        let top_x_commiter_perc_func = 1 / (1 + Math.exp(-func_steepness * (top_x_commiter_perc - 0.5)));
        let number_committers_func = 1 / (1 + Math.exp(-func_steepness * number_committers));

        let bus_factor = (top_commiter_weight * top_commiter_perc_func) + (top_x_commiter_weight * top_x_commiter_perc_func) + (number_committers_weight * number_committers_func);

        return bus_factor;
    }

    public get_name() : string 
    {
        return this.name;
    }

    private get_top_committer_perc()
    {
        return 0;
    }

    private get_top_x_committer_perc()
    {
        return 0;
    }

    private get_number_committers()
    {
        return 0;
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


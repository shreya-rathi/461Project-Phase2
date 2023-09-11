
export interface Metric 
{
    name: string;
    get_name(): string;
    score(package_name: string, metadata: Object): number;

}

export class Correctness implements Metric
{
    name = "Correctness";

    public score(package_name: string, metadata: Object)
    {
        return 0;
    }

    public get_name()
    {
        return this.name;
    }
}
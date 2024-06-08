import { Aggregate, Document, FilterQuery } from "mongoose";

class AggregationBuilder<T extends Document> {
  public aggregation: Aggregate<T[]>;
  public query: Record<string, unknown>;

  constructor(aggregation: Aggregate<T[]>, query: Record<string, unknown>) {
    this.aggregation = aggregation;
    this.query = query;
  }

  lookup(from: string, localField: string, foreignField: string, as: string) {
    const lookupStage = {
      $lookup: {
        from: from,
        localField: localField,
        foreignField: foreignField,
        as: as,
      },
    };
    this.aggregation = this.aggregation.append(lookupStage);
    return this;
  }

  sort(sortQuery: Record<string, number>) {
    const sort = this.query.sort || { createdAt: -1 };
    this.aggregation = this.aggregation.sort(sort as FilterQuery<T>);
    return this;
  }

  limit(limit: number) {
    this.aggregation = this.aggregation.limit(limit);
    return this;
  }

  skip(skip: number) {
    this.aggregation = this.aggregation.skip(skip);
    return this;
  }
  match(searchableFields: string[]) {
    const search = this.query?.searchTerm;
    if (search) {
      const matchQuery = {
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        })),
      };
      this.aggregation = this.aggregation.match(matchQuery);
    }
    return this;
  }
}

export default AggregationBuilder;

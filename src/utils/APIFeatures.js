const { SelectQueryBuilder } = require('typeorm');

class APIFeatures {
    constructor(queryBuilder, queryString) {
        this.queryBuilder = queryBuilder; // Use the query builder
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.queryBuilder.where(JSON.parse(queryStr)); // Use where() method for filtering

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.queryBuilder.orderBy(sortBy); // Use orderBy() for sorting
        } else {
            this.queryBuilder.orderBy('createdAt', 'DESC'); // Default sort order
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(', ');
            this.queryBuilder.select(fields); // Select specified fields
        } else {
            this.queryBuilder.select(); // Select all fields by default
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.queryBuilder.skip(skip).take(limit); // Use skip() and take() for pagination

        return this;
    }

    // Method to execute the query
    async exec() {
        return await this.queryBuilder.getMany(); // Execute the query and get results
    }
}

module.exports = APIFeatures;

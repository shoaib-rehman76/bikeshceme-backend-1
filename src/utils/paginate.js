const paginate = (repository) => {
    repository.paginate = async function (filter = {}, options = {}) {
        const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
        const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
        const skip = (page - 1) * limit;

        const queryBuilder = this.createQueryBuilder('entity'); // Adjust 'entity' to your entity name

        // Process filters
        Object.entries(filter).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                return; // Skip undefined or null values
            }

            // Handle integer fields (e.g., categoryId)
            if (!isNaN(value)) {
                queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
            }
            // Handle string fields (e.g., title)
            else if (typeof value === 'string' || value instanceof String) {
                queryBuilder.andWhere(`LOWER(entity.${key}) LIKE :${key}`, { [key]: `%${value.toLowerCase()}%` });
            }
            // Handle boolean fields (e.g., isActive)
            else if (typeof value === 'boolean') {
                queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
            }
        });

        // Apply sorting
        if (options.sortBy) {
            const sortingCriteria = options.sortBy.split(',').map((sortOption) => {
                const [key, order] = sortOption.split(':');
                return order === 'desc' ? `entity.${key} DESC` : `entity.${key} ASC`;
            });
            queryBuilder.orderBy(sortingCriteria.join(', '));
        } else {
            queryBuilder.orderBy('entity.createdAt', 'DESC'); // Default sorting
        }

        // Execute the query
        const [results, totalResults] = await queryBuilder.skip(skip).take(limit).getManyAndCount();

        // Calculate total pages
        const totalPages = Math.ceil(totalResults / limit);

        return {
            page,
            limit,
            totalPages,
            totalResults,
            results,
        };
    };
};

module.exports = paginate;

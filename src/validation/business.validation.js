const Joi = require('joi');
const validate = require('../middlewares/validate');


const businessSchema = Joi.object({
    name: Joi.string().max(255).required(),
    ownerId: Joi.number().integer().required(),
    slug: Joi.string().max(255).required(),
    description: Joi.string().allow(null),
    address: Joi.string().required(),
    city: Joi.number().integer().required(),
    state: Joi.number().integer().required(),
    latitude: Joi.number().precision(8).allow(null),
    longitude: Joi.number().precision(8).allow(null),
    type: Joi.string().valid('restaurant', 'shop').required(),
    isActive: Joi.boolean().default(true),
    logo: Joi.string().allow(null),
    cover: Joi.string().allow(null),
    seatingCapacity: Joi.string().valid('Up to 50 persons', '51 to 100 persons').allow(null),
    amenities: Joi.array().items(Joi.string()).allow(null),
    services: Joi.array().items(Joi.string()).allow(null),
    seatingType: Joi.array().items(Joi.string()).allow(null),
    serves: Joi.array().items(Joi.string()).allow(null),

    // Conditional fields for restaurant type
    wifi: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.forbidden(), // Forbidden if not a restaurant
    }),
    outdoorSeating: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    reservationsRequired: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    cuisineType: Joi.string().max(100).when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    hasDelivery: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    hasTakeout: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    openForBreakfast: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    openForLunch: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    openForDinner: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    hasParking: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    
    // Additional fields with conditional validation
    dailySpecials: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.allow(null), // Allow null if not a restaurant
    }),
    hasHappyHour: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.allow(null),
    }),
    acceptsReservations: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.allow(null),
    }),
    kidFriendly: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.allow(null),
    }),
    offersCatering: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.allow(null),
    }),
    hasOutdoorDining: Joi.boolean().when(Joi.ref('type'), {
        is: 'restaurant',
        then: Joi.required(),
        otherwise: Joi.allow(null),
    }),

    createdAt: Joi.date().default(() => new Date()),
    updatedAt: Joi.date().default(() => new Date()),
});

const validateBusiness=validate(businessSchema);
module.exports=validateBusiness;
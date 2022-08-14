const properties = require('./json/properties.json');
const users = require('./json/users.json');
//connect to database
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

// the following assumes that you named your connection variable `pool`
pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log('connected to database successfully')});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return Promise.resolve(pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      console.log(result.rows[0]);
      if (users)
        return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    }));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return Promise.resolve(pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      console.log(result.rows[0]);
      if (users)
        return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    }));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return Promise.resolve(pool.
    query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [user.name, user.email, user.password])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    }));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  let queryString = `
  SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
  FROM property_reviews
  JOIN reservations ON property_reviews.property_id = reservations.property_id
  JOIN properties ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1 and end_date < now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY start_date ASC
  LIMIT $2
  `;
  return Promise.resolve(pool
    .query(queryString, [guest_id, limit])
    .then((result) => {
      return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  }));
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = (options, limit = 10) => {
  const queryParams = [];

  //begin query
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  //if city is set, add to query
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  
  //if minimum_price is set, add to query
  if (options.minimum_price_per_night && queryParams.length > 0) {
    queryParams.push(`${(options.minimum_price_per_night * 100)}`);
    queryString += `AND cost_per_night >= $${queryParams.length}`;
  }
  if (options.minimum_price_per_night && queryParams.length === 0) {
    queryParams.push(`${(options.minimum_price_per_night * 100)}`);
    queryString += `WHERE cost_per_night >= $${queryParams.length}`;
  }
  //if maximum_price_per_night is set, add to query
  if (options.maximum_price_per_night && queryParams.length > 0) {
    queryParams.push(`${(options.maximum_price_per_night * 100)}`);
    queryString += `AND cost_per_night <= $${queryParams.length}`;
  }
  if (options.maximum_price_per_night && queryParams.length === 0) {
    queryParams.push(`${(options.maximum_price_per_night * 100)}`);
    queryString += `WHERE cost_per_night <= $${queryParams.length}`;
  }
  //if owner is set, add to query
  if (options.owner_id && queryParams.length > 0) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length}`;
  }
  if (options.owner_id && queryParams.length === 0) {
    queryParams.push(`${options.owner_id}`);
    queryString += `WHERE owner_id = $${queryParams.length}`;
  }

  //add GROUP BY to the query string
  queryString += `GROUP BY properties.id`;

  //if minimum_rating is set, add to query
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING average_rating >= $${queryParams.length}`;
  }
  //order by cose per night and add limit to the query string
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}
  `;
  return Promise.resolve(pool
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    }));
};


exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;

const validate = async (schema, data) => {
  const { error, value } = await schema.validateAsync(data);
  if (error) {
    throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
  }
  return value;
};


module.exports = function (schemas) {
    return Object.entries(schemas).reduce((acc, [key, schema]) => {
        acc[key] = async (req, res, next) => {
            try {
                if (schema.params) {
                    await validate(schema.params, req.params);
                }
                if (schema.query) {
                    await validate(schema.query, req.query);
                }

                if (schema.body) {
                    await validate(schema.body, req.body);
                } else if (!schema.params && !schema.query) {
                    await validate(schema, req.body);
                }
                next();
            } catch (error) {
                console.log(error)
                res.status(400).send(error);
            }
        }

        return acc;
    }, {});
};
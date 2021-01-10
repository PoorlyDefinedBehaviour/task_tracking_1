const formatYupError = error =>
  error.inner.flatMap(({ path, errors }) =>
    errors.map(({ message }) => ({ type: "validation", field: path, message }))
  )

module.exports = formatYupError

// response status code constants
const responseStatusConstants = {
    // business response codes
    success: 200,

    // HTTP response codes
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    serverError: 500,
} as const

export default responseStatusConstants;

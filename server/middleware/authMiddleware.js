import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "My Collection App Identifier",
  issuerBaseURL: "https://dev-jqdqwojbjl1r2osf.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export { jwtCheck };

// ** JWT Service Import
import JwtService from './jwtService'

// ** Export Service as useJwt
export default function JwtHook(jwtOverrideConfig) {
  const jwt = new JwtService(jwtOverrideConfig)

  return {
    jwt
  }
}

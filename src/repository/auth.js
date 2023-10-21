import httpClient from '../utils/httpClient'

class AuthRepository extends httpClient {
   resource = '/auth';
   async login (email, password) {
     const response = await this.post(`${this.resource}/login`, { email, password })
     return response
   }
}
export default AuthRepository


import httpClient from '../utils/httpClient'

class UserRepository extends httpClient {
   resource = '/user';

   async getMe () {
     const response = await this.get(`${this.resource}/me`)
     return response
   }

   async switchPark (parkID) {
     const response = await this.get(`${this.resource}/switch_park/${parkID}`)
     return response
   }
}

export default UserRepository

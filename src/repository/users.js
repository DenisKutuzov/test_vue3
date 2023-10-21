
import httpClient from '../utils/httpClient'

class UsersRepository extends httpClient {
   resource = '/users';

   async getUsersByParkId (parkID) {
     const response = await this.get(`${this.resource}/park/${parkID}`)
     return response
   }

   async unbindParkForUser (data) {
     const response = await this.post(`${this.resource}/unbind-park`, data)
     return response
   }

   async removeRoleInUser (data) {
     const response = await this.post(`${this.resource}/remove-role`, data)
     return response
   }

   async updateUser (data) {
     const response = await this.put(`${this.resource}`, data)
     return response
   }

   async setRoleToUser (data) {
     const response = await this.post(`${this.resource}/set-role`, data)
     return response
   }

   async createUser (data) {
     const response = await this.post(`${this.resource}`, data)
     return response
   }
}

export default UsersRepository

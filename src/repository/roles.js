
import httpClient from '../utils/httpClient'

class RolesRepository extends httpClient {
   resource = '/roles';

   async getRolesByParkId (parkID) {
     const response = await this.get(`${this.resource}/all/${parkID}`)
     return response
   }

   async updateRole (data) {
     const response = await this.put(`${this.resource}`, data)
     return response
   }

   async createRole (data) {
     const response = await this.post(`${this.resource}`, data)
     return response
   }

   async getRolesAccesses () {
     const response = await this.get(`${this.resource}/accesses`)
     return response
   }

   async deleteRoleById (id) {
     const response = await this.delete(`${this.resource}/accesses/${id}`)
     return response
   }

   async getAccessesSplitted () {
     const response = await this.get(`${this.resource}/accesses/splitted`)
     return response
   }
}

export default RolesRepository

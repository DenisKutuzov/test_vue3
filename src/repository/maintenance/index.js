
import httpClient from '@/utils/httpClient'
import MaintenanceWarehouseRepository from './warehouse'
import MaintenanceSupplierRepository from './supplier'
import MaintenanceSparePartRepository from './spare-part'
import MaintenanceSparePartCategoryRepository from './spare-part-category'
import MaintenanceOrderRepository from './orders'
import MaintenanceDecommissionPartRepository from './decommissionpart'
import MaintenanceWarehouseItemRepository from './warehouse-item'
import MaintenanceTransferReqsRepository from './transfer-requests'
import MaintenanceMovementRepository from './movement'
class MaintenanceRepository extends httpClient {
   resource = '/maintenance';

   async getMaintenances (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.maintenances ?? []
   }

   async getTransferHistoryList (warehouseId) {
     const response = await this.get(`${this.resource}/transfer-history-list/${warehouseId ?? ''}`)
     return response?.histories ?? []
   }

   async getMaintenanceById (maintenanceId) {
     const response = await this.get(`${this.resource}/id`, { params: { maintenanceId } })
     return response ?? {}
   }

   async getMaintenanceFreezeItems (params) {
     const response = await this.get(`${this.resource}/freeze-item`, { params })
     return response?.freezeItems ?? {}
   }

   async getReturnCarOnLine (carId) {
     const response = await this.get(`${this.resource}/car-online`, { params: { carId } })
     return response ?? {}
   }

   async aceptCarMaintenance (data) {
     const response = await this.post(`${this.resource}/accept-car`, data)
     return response ?? {}
   }

   async toActualCarMaintenance (id) {
     const response = await this.patch(`${this.resource}/to-actual/${id}`)
     return response ?? {}
   }

   async completeCarMaintenance (id) {
     const response = await this.patch(`${this.resource}/complite/${id}`)
     return response ?? {}
   }

   async deleteMaintenance (params) {
     const response = await this.delete(`${this.resource}`, { params })
     return response?.maintenance ?? []
   }

   async updateMaintenance (data) {
     const response = await this.put(`${this.resource}`, data)
     return response?.maintenance ?? []
   }

   async getMaintenanceTypes (params) {
     const response = await this.get(`${this.resource}/type`, { params })
     //  TODO: Если не работает удали
     return response?.maintenanceTypes.map(x => {
       return {
         ...x,
         parentId: '00000000-0000-0000-0000-000000000000'
       }
     })
   }

   async getMaintenanceHistoryByCarId (carId) {
     const response = await this.get(`${this.resource}/history-id`, { params: { carId } })
     return response?.maintenances ?? []
   }

   async getMaintenanceHistory (params) {
     const response = await this.get(`${this.resource}/hisory`, { params })
     return response?.maintenances ?? []
   }

   async getMeasureUnits (params) {
     const response = await this.get(`${this.resource}/measure`, { params })
     return response?.measureUnits ?? []
   }

   async createRequestMaintenance (data) {
     const response = await this.post(`${this.resource}/create-request`, data)
     return response?.maintenances ?? {}
   }

   async getTransferHistoryByWarehouseItemId (warehouseItemId) {
     const response = await this.get(`${this.resource}/transfer-history/${warehouseItemId}`)
     return response?.items ?? []
   }

   async fromActual (warehouseItemId) {
     const response = await this.patch(`${this.resource}/from-actual/${warehouseItemId}`)
     return response
   }
}

const MaintenanceRepositoryes = {
  index: new MaintenanceRepository(),
  warehouse: new MaintenanceWarehouseRepository(),
  warehouseItem: new MaintenanceWarehouseItemRepository(),
  supplier: new MaintenanceSupplierRepository(),
  sparePart: new MaintenanceSparePartRepository(),
  sparePartCategory: new MaintenanceSparePartCategoryRepository(),
  orders: new MaintenanceOrderRepository(),
  decommissionpart: new MaintenanceDecommissionPartRepository(),
  transferReqs: new MaintenanceTransferReqsRepository(),
  movement: new MaintenanceMovementRepository()
}
export default MaintenanceRepositoryes

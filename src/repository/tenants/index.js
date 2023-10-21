
import httpClient from '@/utils/httpClient'
import TenantsBalanceRepository from './balance'
import TenantsIncomeRepository from './income'
import TenantsTransactionsRepository from './transaction'
import TenantsFinesRepository from './fines'
import TenantsDepositRepository from './deposit'

class TenantsRepository extends httpClient {
   resource = '/tenants';

   async getDriverTransactionsIsOpen (params) {
     const response = await this.get(`${this.resource}/driver-transactions-is-open`, { params })
     return response?.driverDebts ?? {}
   }

   async getDriversDebts (params) {
     const response = await this.get(`${this.resource}/debts`, { params })
     return response?.driversDebts ?? []
   }
}

const TenantsRepositoryes = {
  index: new TenantsRepository(),
  balance: new TenantsBalanceRepository(),
  income: new TenantsIncomeRepository(),
  transaction: new TenantsTransactionsRepository(),
  fines: new TenantsFinesRepository(),
  deposit: new TenantsDepositRepository()
}
export default TenantsRepositoryes

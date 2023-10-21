import AuthRepository from './auth'
import UserRepository from './user'
import DashbordRepository from './dashboard'
import ScheduleRepositoryes from './schedule'
import ParkManagementRepositoryes from './park-management'
import UsersRepository from './users'
import RolesRepository from './roles'
import MonthlyPerortRepository from './monthly-report'
import TenantsRepositoryes from './tenants'
import WorkersRepository from './worker'
import СontractsRepositoryes from './contracts'
import MaintenanceRepositoryes from './maintenance'
import RepairWorksRepository from './repair-works'
import MonthlyMaintenancePeportRepository from './monthly-maintenance'
import ReportGlobalRepository from './reports'
import EventRepository from './event'
const api = {
  auth: new AuthRepository(),
  user: new UserRepository(),
  users: new UsersRepository(),
  dashbord: new DashbordRepository(),
  roles: new RolesRepository(),
  monthly: new MonthlyPerortRepository(),
  worker: new WorkersRepository(),
  schedule: ScheduleRepositoryes,
  parkManager: ParkManagementRepositoryes,
  tenants: TenantsRepositoryes,
  contracts: СontractsRepositoryes,
  maintenance: MaintenanceRepositoryes,
  reports: new ReportGlobalRepository(),
  repairWorks: new RepairWorksRepository(),
  monthlyMaintenance: new MonthlyMaintenancePeportRepository(),
  event: new EventRepository()
}

export default api

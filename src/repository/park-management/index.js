import ParkManagmentDriversRepository from '@/repository/park-management/drivers'
import ParkManagmentCarsRepository from '@/repository/park-management/cars'
import ParkManagmentCarConditionsRepository from '@/repository/park-management/car-conditions'
import ParkManagmentRatingRepository from '@/repository/park-management/rating'
import ParkManagmentSettingsRepository from '@/repository/park-management/settings'
import TenantsFormulasRepository from '@/repository/park-management/formulas'
import ParkManagmentInvestorsRepository from '@/repository/park-management/investors'
const ParkManagementRepositoryes = {
  drivers: new ParkManagmentDriversRepository(),
  cars: new ParkManagmentCarsRepository(),
  conditions: new ParkManagmentCarConditionsRepository(),
  rating: new ParkManagmentRatingRepository(),
  settings: new ParkManagmentSettingsRepository(),
  formuls: new TenantsFormulasRepository(),
  investors: new ParkManagmentInvestorsRepository()
}
export default ParkManagementRepositoryes

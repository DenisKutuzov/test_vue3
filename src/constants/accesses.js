const getElementsAccesses = {
  tenantsInfo: {
    update_driver_btn: ['write_drivers'],
    delete_driver_btn: ['delete_drivers'],
    add_photos_btn: ['add_photos'],
    delete_photos_btn: ['delete_photos'],
    change_balance_btn: ['spec_access_change_balance'],
    change_deposit_btn: ['spec_access_change_deposit'],
    balance_zero_btn: ['balance_zero']
  },
  global: {
    change_status_driver: ['change_status']
  },
  carpark: {
    car_history_btn: ['read_car_conditions'],
    return_car_online_maintenance_btn: ['read_park_maintenance'],
    add_condition_btn: ['write_car_conditions'],
    delete_condition_btn: ['delete_car_conditions'],
    save_from_aggregator_btn: ['write_cars'],
    update_btn: ['CarPark']
  },
  investors: {
    add_investor_btn: ['write_investors'],
    update_investor_btn: ['write_investors'],
    delete_investor_btn: ['delete_investors']
  },
  shedule: {
    change_driver_btn: ['write_schedule'],
    select_driver_btn: ['write_schedule'],
    transplant_driver_btn: ['write_schedule'],
    delete_driver_btn: ['delete_schedule'],
    about_change_btn: ['read_driver_rating'],
    add_raiting_driver_btn: ['write_driver_rating'],
    about_driver_btn: ['read_shedule_cars']
  },
  regionPark: {
    delete_region_park_btn: ['delete_region_parks'],
    create_region_park_btn: ['write_region_parks'],
    update_region_park_btn: ['write_region_parks'],
    settings_region_park_btn: ['write_park_settings'],
    contracts_btn: ['read_contract_templates_and_types'],
    contracts: {
      create_tamplate_btn: ['write_contract_templates'],
      delete_tamplate_btn: ['delete_contract_templates'],
      create_contract_type_btn: ['write_contract_types'],
      delete_contract_type_btn: ['delete_contract_types']
    }
  },
  techInspection: {
    delete_techInspection_btn: ['delete_maintenance'],
    techInspection_history_tab: ['read_techInspection.history'],

    send_to_techInspection_btn: ['write_maintenance', 'write_repair_works'],
    send_techInspection_btn: ['write_maintenance', 'write_repair_works'],
    update_techInspection_btn: ['write_maintenance', 'write_repair_works'],

    add_service_works_btn: ['read_service_works'],
    create_service_works_btn: ['create_service_works']
  },
  parts: {
    delete_trasfer_req_btn: ['delete_maintenance_transfer_request'],
    delete_warehouse_btn: ['delete_maintenance_warehouse'],

    update_order_btns: ['write_maintenance_order'],
    delete_order_btn: ['delete_maintenance_order'],

    update_warehouse_btn: ['write_maintenance_warehouse'],
    create_warehouse_btn: ['write_maintenance_warehouse'],

    decommission_tab: ['read_decommissionpart'],
    return_decommission_btn: ['delete_decommissionpart'],

    add_item_to_warehouse_btn: ['write_maintenance_ware_house_item'],
    providers: {
      delete_provider_btn: ['delete_maintenance_supplier'],
      create_provider_btn: ['write_maintenance_supplier'],
      update_provider_btn: ['write_maintenance_supplier']
    },
    categories: {
      delete_category_btn: ['delete_maintenance_spare_part_category'],
      create_categories_btn: ['write_maintenance_spare_part_category'],
      update_categories_btn: ['write_maintenance_spare_part_category']
    },
    parts: {
      create_part_btn: ['write_maintenance_spare_part'],
      update_part_btn: ['write_maintenance_spare_part'],
      delete_part_btn: ['delete_maintenance_spare_part']
    },
    items: {
      write_off: ['write_decommissionpart']
    }
  },
  tenantsIncome: {
    delete_transaction_btns: ['delete_financial'],
    change_transaction_btns: ['write_financial'],
    calculate_transactions_in_registry_btn: ['calculate_financial_registry'],
    calculate_transactions_in_balance_btn: ['calculate_financial_balance'],
    balance_history_btns: ['read_financial'],
    delete_retention_btn: ['spec_delete_retention'],
    delete_surcharges_btn: ['spec_delete_surcharges']
  },
  fines: {
    fines_tab: ['read_fines'],
    fines_history_tab: ['read_fines_history'],
    paid_gibdd_checkbox: ['paid_gibdd'],
    confirm_fine_generate_payment_btn: ['confirm_fine_generate_payment'],
    delete_fines_btn: ['delete_fines'],
    set_driver_btn: ['set_driver'],
    approve_driver_btn: ['approve_driver'],
    change_driver_btn: ['change_driver']
  }
}

function getValueByStringPath (obj, path) {
  const keys = path.split('.') // Разбиваем путь на отдельные ключи
  let value = obj

  try {
    for (const key of keys) {
      value = value[key] // Переходим на следующий уровень вложенности
    }

    return value
  } catch (error) {
    return null // Если произошла ошибка доступа к значению, возвращаем null
  }
}
const getAccessesByStringPath = (path) =>
  getValueByStringPath(getElementsAccesses, path)
const getAccessesByFullPatch = (path) => getElementsAccesses[path]
export { getAccessesByStringPath, getElementsAccesses, getAccessesByFullPatch }

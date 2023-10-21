export const changeEnum = [
  {
    id: 1,
    val: 'all',
    rusVal: 'любое время'
  },
  {
    id: 2,
    val: 'morning',
    rusVal: 'день'
  },
  {
    id: 3,
    val: 'night',
    rusVal: 'ночь'
  }
]
export const sheduleEnum = [
  {
    id: 1,
    val: '5/2'
  },
  {
    id: 2,
    val: '2/2'
  }
]
export const workStatusEnum = [
  {
    id: 1,
    val: 'working',
    rusVal: 'Работает'
  },
  {
    id: 2,
    val: 'not_working',
    rusVal: 'Не работает'
  },
  {
    id: 3,
    val: 'fired',
    rusVal: 'Уволен'
  }
]
export const statusEnum = [
  {
    id: 1,
    val: 'offline',
    rusVal: 'Оффлайн'
  },
  {
    id: 2,
    val: 'busy',
    rusVal: 'Работает'
  },
  {
    id: 3,
    val: 'free',
    rusVal: 'Свободен'
  },
  {
    id: 4,
    val: 'in_order_free',
    rusVal: 'Свободен для заказа'
  },
  {
    id: 5,
    val: 'in_order_busy ',
    rusVal: 'Занят для заказов'
  }
]
export const driverCountryEnum = [
  {
    id: 1,
    val: 'rus',
    rusVal: 'Россия'
  },
  // {
  //   id: 2,
  //   val: 'aze',
  //   rusVal: 'Айзербайджан'
  // },
  {
    id: 3,
    val: 'blr',
    rusVal: 'Белорусь'
  },
  {
    id: 4,
    val: 'kaz',
    rusVal: 'Казахстан'
  },
  {
    id: 5,
    val: 'kgz',
    rusVal: 'Киргизстан'
  },
  {
    id: 6,
    val: 'ltu',
    rusVal: 'Литва'
  },
  {
    id: 7,
    val: 'pol',
    rusVal: 'Польша'
  },
  {
    id: 8,
    val: 'tjk',
    rusVal: 'Таджикистан'
  },
  {
    id: 9,
    val: 'tkm',
    rusVal: 'Туркменистан'
  },
  {
    id: 10,
    val: 'uzb',
    rusVal: 'Узбекистан'
  },
  {
    id: 11,
    val: 'ukr ',
    rusVal: 'Украина'
  }
]
export const driverPassportEnum = [
  {
    val: 'rus',
    rusVal: 'Россия'
  },
  {
    id: 3,
    val: 'blr',
    rusVal: 'Белорусь'
  },
  {
    id: 4,
    val: 'kaz',
    rusVal: 'Казахстан'
  },
  {
    id: 5,
    val: 'ukr ',
    rusVal: 'Украина'
  },
  {
    id: 6,
    val: 'abk',
    rusVal: 'Абхазия'
  },
  {
    id: 7,
    val: 'so',
    rusVal: 'Южной Осетия'
  },
  {
    id: 8,
    val: 'kgz',
    rusVal: 'Киргизия'
  },
  {
    id: 9,
    val: 'tjk',
    rusVal: 'Таджикистан'
  },
  {
    id: 10,
    val: 'uzb',
    rusVal: 'Узбекистан'
  }
]
export const driverRikStatusEnum = [
  {
    id: 1,
    val: 'beginner',
    statusName: '2 / 2',
    tagType: 'success'
  },
  {
    id: 2,
    val: 'first_week',
    statusName: 'Первую неделю',
    tagType: 'warning'
  },
  {
    id: 3,
    val: 'permanent',
    statusName: 'Постоянный работник',
    tagType: 'primary'
  },
  {
    id: 4,
    val: 'part_time',
    statusName: 'Подработчик',
    tagType: 'darkBlue'
  },
  {
    id: 5,
    val: '',
    statusName: 'Водитель',
    tagType: 'info'
  },
  {
    id: 6,
    val: 'on_control',
    statusName: 'На контроле',
    tagType: 'paleRed'
  }
]
export const balanceType = {
  manager: 'Менеджер',
  shift_calculation: 'Расчет смены',
  instant_payment: 'Списание через моментальные выплаты'
}

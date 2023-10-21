import { defineStore } from "pinia";
import { ref } from 'vue';
import { ICarData } from "@/types";
import cars2 from '@/mock/cars2';


interface IFilter {
    brand?: string,
    model?: string,
    number?: string,
    isValidate?: boolean,
    status?: string,
    year?: string,
    callsign?: string,
    offset?: number,
    limit?: number
}

export const useCarsParkStore = defineStore('carsParkStore', () => {
    const carParkData = ref<ICarData[]>([]);

    const totalCount = ref<number>(0)

    const   filters = ref<IFilter>( {
            brand: '',
            model: '',
            number: '',
            isValidate: true,
            status: 'working',
            year: '',
            callsign: '',
            offset: 0,
            limit: 40
        })


    const setParkData = (data : ICarData[]) => {
        carParkData.value = data
    }
    const getParkData = async () => {
        carParkData.value = cars2.cars
        totalCount.value = cars2.cars.length
    };


    const setFilters = (newFilters: IFilter) => {
        filters.value = { ...filters.value, ...newFilters };
    };


    const putTaxiCar = async (data : any) => {
        try {
            // const response = await Api.parkManager.cars.updateCarSettings({ ...data })
            // commit('UPDATE_CAR_BY_ID', { data: response })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return {
        carParkData,
        getParkData,
        totalCount,
        filters,
        setFilters,
        putTaxiCar,
        setParkData
    };
});
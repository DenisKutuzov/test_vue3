import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('stock')

const computed = {
  ...mapState({
    $_stockOrdersData: 'ordersData',
    $_stockData: 'stockData',
    $_suppliersData: 'suppliersData'
  }),
  ...mapGetters({
    $_filteredOrders: 'filteredOrders',
    $_filteredSuppliers: 'filteredSuppliers',
    $_filteredStock: 'filteredStock'
  })
}

const methods = {
  ...mapActions({
    $_fetchStockInfo: 'fetch',
    $_changeOrder: 'changeOrder',
    $_addOrder: 'addOrder',
    $_changeStock: 'changeStock',
    $_addStock: 'addStock',
    $_removeSupplier: 'removeSupplier',
    $_changeSupplier: 'changeSupplier',
    $_addSupplier: 'addSupplier',
    $_filterStock: 'filter'
  })
}

export default {
  computed,
  methods
}

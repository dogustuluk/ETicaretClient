//buradaki contract'lar entity'lerin birebir karşılığı değildir ama API'deki verinin birebir karşılığıdır
//aşağıda sadece Product olarak oluşturdum class'ı ama burda API'deki VM_Create_Product ya da VM_Update_Product'teki gibi her bir işleme özgü de oluşturulabilir.
export class Create_Product {
  name: string;
  stock: number;
  price: number;
}

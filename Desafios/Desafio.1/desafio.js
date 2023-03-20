// El codigo cumple con las rubricas de la consigna, se encuentran productos del 1 a 3 con distintos code,
// si se cambia el code a uno existente dira que no se puede, asi como si no se completan los campos.
// de poner un id inexistente tirara Product not found
// Cualquier critica o consejo es aceptado desde ya muchas gracias 

class ProductManager {
    constructor(){
        this.products=[]
    }
    getProducts(){
        return this.products;
    }
    addProduct(title,description,price,thumbnail,code,stock){
        let id_prod = this.getProducts().length;
        
        let producto={
            id:++id_prod,
            title:title,
            description:description,
            price:price,
            thumbnail:thumbnail,
            code:code,
            stock:stock
        }
        
        //VARIABLES PARA VALIDAR 
        let titleValid = (producto.title == null || producto.title == '')
        let descriptionValid=(producto.description == null || producto.description == '')
        let priceValid =(producto.price == null || producto.price == '')
        let stockValid =(producto.stock == null || producto.stock == '')
        let codeValid =(producto.code == null || producto.code == '')
        let codeRepeat= this.products.find(prod=> prod.code == producto.code)

        if(titleValid|| descriptionValid ||priceValid || stockValid || codeValid){
            return console.log(`Todos los campos son requeridos ingrese el que le falto`)
        }if(codeRepeat){
            console.log(`El CODE no esta disponible intente con otro`)
        }else{
            this.products.push(producto)
        }
         return this.productos

    }

    getProductById(id_prod){
        let product= this.products.find(prod=> prod.id == id_prod)

        if(product){
            return product
        }else{
            return console.log('Product not found')
        }
    }
}

const bebidas = new ProductManager();
bebidas.addProduct(
    'Coca-Cola',
    'Gaseosa 2.25lt altamente gasificada de excelente calidad',
    300,
    '',
    '123',
    25
)
bebidas.addProduct(
    'Fanta',
    'Gaseosa 2.25lt altamente gasificada de excelente calidad',
    300,
    '',
    '1245',
    25
)
bebidas.addProduct(
    'Sprite',
    'Gaseosa 2.25lt altamente gasificada de excelente calidad',
    300,
    '',
    '123fs',
    25
)
console.table(bebidas.getProducts())
console.log(bebidas.getProductById(2))


import fs from 'fs';

 export default class ProductManager {
    constructor(path) {
        this.path = path
    }


    async getProduct(){
        try{
            const objs= await fs.promises.readFile(this.path,'utf-8')
           
            return  JSON.parse(objs)
        }catch(error){
            console.log(error)
            return []
        }
    }

    async addProduct(obj){
        const objs= await this.getProduct();
        let newId;

        if (objs.length == 0){
            newId=1;
        }else{
            newId= objs[objs.length - 1].id + 1;
        }

        const newObj = {...obj, id: newId}
        objs.push(newObj);
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(objs,null,2));
                return newObj
        }catch(error){
            console.log(`Error to save the object ${error}`)
        }
    }

    async updateProd(id,newProd){
        //leo base de datos
        const productos = await this.getProduct()
        //encuentro el producto a modificar
        const idProd= parseInt(id)
        const productoAModificar = productos.find(producto => producto.id === idProd);
        
            //si no es el producto doy error
        if(!productoAModificar){
            return  `producto no disponible`
        }
        
        //obtengo indice del obj viejo para actualizar con el nuevo
        const index = productos.findIndex(producto=> producto === productoAModificar)
        
        //Leo datos de request
        const{title,description,code,price,status,stock,category,thumbnails} = newProd;
        
        //modifico obj
        productoAModificar.title= title;
        productoAModificar.description= description;
        productoAModificar.code= code;
        productoAModificar.price= price;
        productoAModificar.status=status
        productoAModificar.stock= stock;
        productoAModificar.category= category
        productoAModificar.thumbnails= thumbnails;

        //cambio posicion para luego guardar
        productos.splice(index, 1, productoAModificar);

        await fs.promises.writeFile(this.path, JSON.stringify(productos, 'utf-8'))

        //Respuesta sobre producto modificado
        return  productoAModificar
    }

    async getById(id){
        let objId= parseInt(id)
        const objs = await this.getProduct()
        const obj = objs.find(o => o.id === objId);
        return obj
        

    }

    async deleteProduct(id){
      
        const products = await this.getProduct();
        const productIndex = products.findIndex((product) => product.id === parseInt(id))
            if (productIndex === -1) {
              
                return console.error(`El producto con ID "${id}" no existe.`)
            }
        products.splice(productIndex, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
                return products;
        
    }

    async deleteAll(){
        await fs.promises.writeFile(`./${this.path}`, '');
        console.log('Delete all objects')
        
    }
}
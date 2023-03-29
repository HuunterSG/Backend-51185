import fs from 'fs';

 export default class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
    }


    async getAll(){
        try{
            const objs= await fs.promises.readFile(this.ruta,'utf-8')
            return JSON.parse(objs)
        }catch{
            return []
        }
    }

    async save(obj){
        const objs= await this.getAll();
        let newId;

        if (objs.length == 0){
            newId=1;
        }else{
            newId= objs[objs.length - 1].id + 1;
        }

        const newObj = {...obj, id: newId}
        objs.push(newObj);
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(objs,null,2));
                return newId
        }catch(error){
            console.log(`Error to save the object ${error}`)
        }
    }

    async updateProd(id,newProd){
        //leo base de datos
        const productos = await this.getAll()
        //encuentro el producto a modificar
        const productoAModificar = productos.find(producto => producto.id === id);
        
        //si no es el producto doy error
        if(!productoAModificar){
            return  `producto no disponible`
        }

        //obtengo indice del obj viejo para actualizar con el nuevo
        const index = productos.findIndex(producto=> producto === productoAModificar)
        
        //Leo datos de request
        const{title,price,thumbnail} = newProd;
        
        //modifico obj
        productoAModificar.title= title;
        productoAModificar.price= price;
        productoAModificar.thumbnail= thumbnail;

        //cambio posicion para luego guardar
        productos.splice(index, 1, productoAModificar);

        await fs.promises.writeFile(this.ruta, JSON.stringify(productos, 'utf-8'))

        //Respuesta sobre producto modificado
        return `msg: 'El producto fue modificado con exito', ${productoAModificar}`
    }

    async getById(id){
        
        const objs = await this.getAll()
        const obj = objs.find(o => o.id == id);
        return obj
        

    }

    async deleteById(id){
        let collection = []
        await fs.promises.readFile(`./${this.ruta}`,'utf-8')
        .then( cont => {
            let collect = JSON.parse(cont)
            for (const x of collect){
                if(x.id != id){
                    collection.push(x)
                }
            }
        })
        .catch( error => console.log(error));
        await fs.promises.writeFile(`./${this.ruta}`, JSON.stringify(collection));
        console.log('Delete Object with ID!');
       
    }

    async deleteAll(){
        await fs.promises.writeFile(`./${this.ruta}`, '');
        console.log('Delete all objects')
        
    }

}


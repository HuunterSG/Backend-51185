import fs from 'fs'


export default class ProductManager{
    constructor(path){
        this.path = path
    }

    getProducts= async () => {
        try {
            if(fs.existsSync(this.path)){
                const data= await fs.promises.readFile(this.path, 'utf-8')
                const objs= JSON.parse(data)
                return objs  
            }else{
                return []
            }
        } catch (error) {
           console.log(`No existen productos`)
        }
    }

    getProductsById= async (id)=>{
        try {
            const objs= await this.getProducts()
            const obj =objs.find(ob=>ob.id === id)
            return obj
        } catch (error) {
            console.log(`Objeto no encontrado ${error}`)
        }
    }

    addProduct= async (product)=>{
        try {
            const objs= await this.getProducts();
            if(objs.length === 0){
                product.id = 1
            }else{
                product.id = objs[objs.length-1].id+1;
            }
            objs.push(product)
            
            await fs.promises.writeFile(this.path, JSON.stringify(objs,null,'\t'))
            return product
        } catch (error) {
            console.log(`El producto no se pudo crear ${error}`)
        }
    }

    updateProduct= async (id, ...prod)=>{
        try {
            let oldProd= await this.getProductsById(id)
            let newProd=[{...prod,id},...oldProd]
            await fs.promises.writeFile(this.path, JSON.stringify(newProd))
            return newProd
        } catch (error) {
            console.log(`El producto no se pudo actualizar ${error}`)
        }
    }

    deleteProduct= async (id)=>{
        let prod = await this.getProducts()
        let deleteProd = prod.find(product=>product.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(deleteProd))
        console.log(`Producto eliminado ${deleteProd}`)
    }
}
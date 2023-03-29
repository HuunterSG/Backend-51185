import  Contenedor from './class/productManager.js'


// PRODUCTOS:
const product1 = {
        title: "Fernet",
        description:'Bebida alcoholica, delicatessen de la vida xD',
        thumbnail:'#',
        code:'fg13h',
        price: 2500,
        stock: 25
  }
const product2 = {
        title:'Coca Cola',
        description:'Bebida altamente gasificada',
        thumbnail:'#',
        code:'fg123h',
        price: 1500,
        stock: 25
  }
const product3 = {
        title:'Cerveza Andes Negra',
        description:'Bebida alcoholica altamente gasificada',
        thumbnail:'#',
        code:'fg126h',
        price: 1000,
        stock: 25
  }
const product4 = {
    title:'Cerveza Andes Roja',
    description:'Bebida alcoholica altamente gasificada',
    thumbnail:'#',
    code:'fg126h',
    price: 1000,
    stock: 25
  }
    const updatePro ={
        title:'whisky',
        description:'Bebida alcoholica altamente gasificada',
        thumbnail:'#',
        code:'fg155h',
        price: 13000,
        stock: 25
    }

async function challenge(){
    const file = new Contenedor('./db/Drinks.json');
    
    console.log('Products: ')
    let objs = await file.getAll();
    console.log(objs)
    console.log('-- xxxxxxxx --')

    console.log('Save products')
    let idP1= await file.save(product1)
    console.log(`ID of product: ${idP1}`);
    console.log('-- xxxxxxxx --')
    let idP2= await file.save(product2)
    console.log(`ID of product: ${idP2}`);
    console.log('-- xxxxxxxx --')
    let idP3= await file.save(product3)
    console.log(`ID of product: ${idP3}`);
    console.log('-- xxxxxxxx --')
    let idP4= await file.save(product4)
    console.log(`ID of product: ${idP4}`);
    console.log('-- xxxxxxxx --')

    console.log('Products: ')
    objs = await file.getAll();
    console.log(objs)
    console.log('-- xxxxxxxx --')

    console.log('Search product for ID')
    const res = await file.getById(idP2)
    console.log(`Your product is: ${res.title} \nThe cost is $${res.price}`)
    console.log('-- xxxxxxxx --')

    console.log('Delete for ID')
    objs = await file.deleteById(4)
    objs = await file.getAll();
    console.table(objs)
    console.log('-- xxxxxxxx --')
    
    console.log('Update Product \n')
    let prodModif = await file.updateProd(2, updatePro)
    console.log(prodModif)
    console.log('-- xxxxxxxx --')

    console.log('Products: ')
    objs = await file.getAll();
    console.table(objs)
    console.log('-- xxxxxxxx --')

    console.log('Delete All')
    objs = await file.deleteAll();
    objs = await file.getAll();
    console.table(objs)
    console.log('-- xxxxxxxx --')
}

challenge();
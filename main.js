window.addEventListener('load', () => {

    const principalUrl = 'https://fakestoreapi.com';
    let actualCategory = 'electronics';
    const nav = document.querySelector('nav');

    const button = document.querySelector('button');
    let limited = false;

    button.addEventListener('click', () => {
        limited =! limited;
        
        console.log(limited);

        button.innerHTML = limited ? 'Deslimitar' : 'Limitar';
    });

    const retrieveData =  async function(addInfo = '') {
        const response = await fetch(`${principalUrl}/${addInfo}`);
        const data = await response.json();
        console.log(data);
        return data;
    }

    const createElement = (parent, type, text = '') => {
        const element = document.createElement(type);

        if(text.length > 0){
            element.innerHTML = text;  
        }
        
        parent.appendChild(element);
    }

    retrieveData('products/categories').then((categories) => {
        createElement(nav, 'a', 'Products');
        categories.forEach((category, index) => {
            createElement(nav, 'a', category);
        
            if(index === 0) actualCategory = category;
        });

    });

    const retrieveProducts = (url) => {
        retrieveData(`${url}`).then((products) => {
            document.querySelector('.products').remove();
            const productsParent = document.createElement('div');
            productsParent.className = 'products';
            document.querySelector('body').appendChild(productsParent);
    
            products.forEach((product) => {
                const tempProduct = document.createElement('div');
                tempProduct.className = 'product';
    
                const tumb = document.createElement('div');
                tumb.className = 'product-tumb';
                const img = document.createElement('img');
                img.src = product.image;
                tumb.appendChild(img);
                tempProduct.appendChild(tumb);

                const info = document.createElement('div');
                info.classList = 'product-details';

                createElement(info, 'h3', product.category);
                createElement(info, 'h4', product.title);
                createElement(info, 'p', product.description);
    
                tempProduct.appendChild(info);
                productsParent.appendChild(tempProduct);
            });
    
        });
    }

    retrieveProducts(`products/category/${actualCategory}`);

    nav.addEventListener('click', (elem) => {
        const text = elem.target.textContent || '';

        if(text.length > 0){
            if(text.toLowerCase() !== 'products'){
                retrieveProducts(limited ? `products/category/${text}?limit=5` : `products/category/${text}`);
            }else{
                retrieveProducts(limited ? 'products?limit=5' : 'products');
            }
        }
    });

}); 
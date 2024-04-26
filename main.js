window.addEventListener('load', () => {

    const principalUrl = 'https://fakestoreapi.com';
    let actualCategory = 'electronics';
    const nav = document.querySelector('nav');

    const retrieveData =  async function(addInfo = '') {
        const response = await fetch(`${principalUrl}/${addInfo}`);
        const data = await response.json();
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
    
                const img = document.createElement('img');
                img.src = product.image;
                tempProduct.appendChild(img);
    
                createElement(tempProduct, 'h4', product.title);
                createElement(tempProduct, 'p', product.description);
                createElement(tempProduct, 'span', product.price);
    
                productsParent.appendChild(tempProduct);
            });
    
        });
    }

    retrieveProducts(`products/category/${actualCategory}`);

    nav.addEventListener('click', (elem) => {
        const text = elem.target.textContent || '';

        if(text.length > 0){
            retrieveProducts(`products/category/${text}`);
        }
    });

}); 
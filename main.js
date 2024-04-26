window.addEventListener('load', () => {

    const principalUrl = 'https://fakestoreapi.com';
    let actualCategory = 'electronics';

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
        const nav = document.querySelector('nav');

        categories.forEach((category, index) => {
            createElement(nav, 'a', category);
        
            if(index === 0) actualCategory = category;
        });

    });

    retrieveData(`products/category/${actualCategory}`).then((products) => {
        const productsParent = document.querySelector('.products');

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

}); 
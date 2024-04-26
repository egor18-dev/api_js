window.addEventListener('load', () => {

    const principalUrl = 'https://fakestoreapi.com';

    const retrieveData =  async function(addInfo = '') {
        const response = await fetch(`${principalUrl}/${addInfo}`);
        const data = await response.json();
        return data;
    }

    const createElement = (parent, type, text = '') => {
        const element = document.createElement(type);

        if(text.length > 0){
            console.log('append');
            element.innerHTML = text;  
        }

        parent.appendChild(element);
    }

    retrieveData('products/categories').then((categories) => {
        const nav = document.querySelector('nav');

        categories.forEach((category) => {
            createElement(nav, 'a', category);
        });

    });

}); 
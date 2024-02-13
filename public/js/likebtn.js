// import axios from "axios";

const allLikeButton = document.querySelectorAll('.like-btn'); 

async function likeButton(productId, btn){
    try {
        let response = await axios({
            method: 'post',
            url: `/product/${productId}/like`,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        })

        if(btn.children[0].classList.contains('fas')){
            btn.children[0].classList.remove('fas')
            btn.children[0].classList.add('far')
        }else{
            btn.children[0].classList.remove('far')
            btn.children[0].classList.add('fas')    
        }
    } catch (e) {
        console.log(e); 
        console.log(e.message);
        // window.location.replace('/products');   // redirect in frontend part 
    }
}

for(let btn of allLikeButton){
    btn.addEventListener('click', ()=>{
        let productId = btn.getAttribute('product-id'); 
        // console.log('productID: ',productId); 
        likeButton(productId, btn); 
    })
} 
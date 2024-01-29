const allLikeButton = document.querySelectorAll('.like-btn'); 

async function likeButton(productId, btn){
    try {
        let response = await axios({
            method: 'POST',
            url: `/product/${productId}/like`,
            // headers: {'X-Requested-With': 'XMLHttpRequest'},
        })

        if(btn.children[0].classList.contains('fas')){
            btn.children[0].classList.remove('fas')
            btn.children[0].classList.add('far')
        }else{
            btn.children[0].classList.remove('far')
            btn.children[0].classList.add('fas')    
        }
    } catch (e) {
        // console.log(e); 
        // console.log(e.message);  
        window.location.replace('/login');   // redirect in frontend part 
    }
}

for(let btn of allLikeButton){
    btn.addEventListener('click', ()=>{
        let productId = btn.getAttribute('product-id'); 
        likeButton(productId, btn); 
    })
} 